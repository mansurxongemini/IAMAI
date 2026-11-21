import { GoogleGenAI, Type } from '@google/genai';
import { defineSecret } from 'firebase-functions/params';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { getBlueprintById } from '../../../packages/core/blueprints';
import {
  buildDeltaPatchPrompt,
  buildNodeTutorPrompt,
  buildTaskDecomposePrompt,
} from '../../../packages/core/prompts';
import { applyDeltaPatchAndSchedule, computeNodeCacheHash } from '../../../packages/core/scheduler';
import {
  AdaptRoadmapInputSchema,
  DecomposedTasksResponseSchema,
  DecomposeTasksInputSchema,
  GeminiDeltaPatchSchema,
  TutorNodeChatInputSchema,
} from '../../../packages/core/schemas';

const geminiApiKey = defineSecret('GEMINI_API_KEY');
const FAST_MODEL = process.env.GEMINI_FAST_MODEL || 'gemini-3.1-flash-lite';
const MENTOR_MODEL = process.env.GEMINI_MENTOR_MODEL || 'gemini-4-hydrogen';

function createClient() {
  return new GoogleGenAI({
    apiKey: geminiApiKey.value(),
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });
}

export const adaptRoadmap = onCall({ secrets: [geminiApiKey], region: 'us-central1' }, async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in required.');
  const parsed = AdaptRoadmapInputSchema.safeParse(req.data);
  if (!parsed.success) throw new HttpsError('invalid-argument', 'Invalid roadmap parameters.');

  const blueprint = getBlueprintById(parsed.data.blueprintId);
  if (!blueprint) throw new HttpsError('not-found', 'Blueprint not found.');

  const prompt = buildDeltaPatchPrompt(blueprint, parsed.data);
  const ai = createClient();
  const res = await ai.models.generateContent({
    model: FAST_MODEL,
    contents: prompt.contents,
    config: {
      systemInstruction: prompt.systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategySummary: { type: Type.STRING },
          moduleAdjustments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                moduleId: { type: Type.STRING },
                priority: { type: Type.STRING },
                allocatedHours: { type: Type.NUMBER },
                customFocus: { type: Type.STRING },
              },
              required: ['moduleId', 'priority', 'allocatedHours', 'customFocus'],
            },
          },
          dailySlotRecommendation: { type: Type.STRING },
        },
        required: ['strategySummary', 'moduleAdjustments', 'dailySlotRecommendation'],
      },
    },
  });

  const deltaPatch = GeminiDeltaPatchSchema.parse(JSON.parse((res.text ?? '{}').trim()));
  const roadmap = applyDeltaPatchAndSchedule({
    roadmapId: `rm_${blueprint.id}_${Date.now().toString(36)}`,
    ownerId: req.auth.uid,
    blueprint,
    input: parsed.data,
    deltaPatch,
  });

  return { deltaPatch, roadmap };
});

export const tutorNodeChat = onCall({ secrets: [geminiApiKey], region: 'us-central1' }, async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in required.');
  const parsed = TutorNodeChatInputSchema.safeParse(req.data);
  if (!parsed.success) throw new HttpsError('invalid-argument', 'Invalid tutor request.');

  const prompt = buildNodeTutorPrompt(parsed.data);
  const ai = createClient();
  const res = await ai.models.generateContent({
    model: MENTOR_MODEL,
    contents: [
      ...parsed.data.recentHistory.slice(-4).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      {
        role: 'user',
        parts: [{ text: `[Context] ${prompt.contextHeader}\n\nQuestion: ${parsed.data.question}` }],
      },
    ],
    config: { systemInstruction: prompt.systemInstruction },
  });

  return {
    reply: (res.text ?? '').trim(),
    nodeHash: computeNodeCacheHash(
      parsed.data.blueprintId,
      parsed.data.nodeId,
      parsed.data.locale,
      parsed.data.question
    ),
  };
});

export const decomposeTasks = onCall({ secrets: [geminiApiKey], region: 'us-central1' }, async (req) => {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Sign in required.');
  const parsed = DecomposeTasksInputSchema.safeParse(req.data);
  if (!parsed.success) throw new HttpsError('invalid-argument', 'Invalid task input.');

  const prompt = buildTaskDecomposePrompt(parsed.data);
  const ai = createClient();
  const res = await ai.models.generateContent({
    model: FAST_MODEL,
    contents: prompt.contents,
    config: {
      systemInstruction: prompt.systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          dayBrief: { type: Type.STRING },
          tasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                startTime: { type: Type.STRING },
                endTime: { type: Type.STRING },
                durationMinutes: { type: Type.INTEGER },
                priority: { type: Type.STRING },
                category: { type: Type.STRING },
                executionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
                simplificationNote: { type: Type.STRING },
              },
              required: [
                'title',
                'startTime',
                'endTime',
                'durationMinutes',
                'priority',
                'category',
                'executionSteps',
                'simplificationNote',
              ],
            },
          },
        },
        required: ['dayBrief', 'tasks'],
      },
    },
  });

  return DecomposedTasksResponseSchema.parse(JSON.parse((res.text ?? '{}').trim()));
});
