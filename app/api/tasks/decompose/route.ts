import { NextResponse } from 'next/server';
import { buildTaskDecomposePrompt } from '@core/prompts';
import {
  DecomposedTasksResponseSchema,
  DecomposeTasksInputSchema,
  type DailyTask,
} from '@core/schemas';
import {
  DECOMPOSE_TASKS_RESPONSE_SCHEMA,
  FAST_STRUCTURED_MODEL,
  getGeminiClient,
} from '@/lib/gemini';
import { guard, readJson, serverError } from '@/lib/server/guard';

export async function POST(request: Request) {
  try {
    const gate = await guard(request, 'decompose');
    if (!gate.ok) return gate.response;

    const body = (await readJson(request)) as Record<string, unknown>;
    const parsed = DecomposeTasksInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Please provide at least one clear task or obligation.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const prompt = buildTaskDecomposePrompt(input);
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: FAST_STRUCTURED_MODEL,
      contents: prompt.contents,
      config: {
        maxOutputTokens: 1600,
        systemInstruction: prompt.systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: DECOMPOSE_TASKS_RESPONSE_SCHEMA,
      },
    });

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      return NextResponse.json(
        { error: 'Empty schedule returned from Gemini.' },
        { status: 502 }
      );
    }

    const parsedJson = JSON.parse(rawText);
    const validated = DecomposedTasksResponseSchema.safeParse(parsedJson);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Task schedule failed schema validation.', details: validated.error.flatten() },
        { status: 502 }
      );
    }

    // Identity comes only from the verified token, never from the request body.
    const ownerId = gate.user?.uid ?? 'local-executive';
    const nowIso = new Date().toISOString();

    const tasks: DailyTask[] = validated.data.tasks.map((item, index) => ({
      id: `task_${Date.now().toString(36)}_${index}`,
      ownerId,
      title: item.title,
      startTime: item.startTime,
      endTime: item.endTime,
      durationMinutes: item.durationMinutes,
      priority: item.priority,
      category: item.category,
      executionSteps: item.executionSteps,
      simplificationNote: item.simplificationNote,
      completed: false,
      scheduledDate: input.date,
      createdAt: nowIso,
      updatedAt: nowIso,
    }));

    return NextResponse.json({
      dayBrief: validated.data.dayBrief,
      tasks,
    });
  } catch (error) {
    return serverError('decompose', error);
  }
}
