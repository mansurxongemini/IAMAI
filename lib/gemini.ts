import 'server-only';
import net from 'node:net';
import { GoogleGenAI, Type, type Content } from '@google/genai';

// Node tries each resolved address for only 250 ms before giving up ("fetch failed"). On a slow
// link the connection to Google takes seconds, so a working key looked broken. Give it time.
net.setDefaultAutoSelectFamilyAttemptTimeout(3000);

export const FAST_STRUCTURED_MODEL = process.env.GEMINI_FAST_MODEL || 'gemini-3.1-flash-lite';
export const GENERAL_MENTOR_MODEL = process.env.GEMINI_MENTOR_MODEL || 'gemini-4-hydrogen';

let cachedClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  if (!cachedClient) {
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedClient;
}

export const DELTA_PATCH_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    strategySummary: {
      type: Type.STRING,
      description: 'Concise 1-2 sentence strategy explaining hour allocation and focus.',
    },
    moduleAdjustments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          moduleId: {
            type: Type.STRING,
            description: 'Exact moduleId from the provided blueprint outline.',
          },
          priority: {
            type: Type.STRING,
            format: 'enum',
            enum: ['skip', 'low', 'normal', 'high'],
            description: 'Exactly one of: skip, low, normal, high (English, lowercase).',
          },
          allocatedHours: {
            type: Type.NUMBER,
            description: 'Recommended hours for this module (0 if skip).',
          },
          customFocus: {
            type: Type.STRING,
            description: 'Tailored drill or focus adjustment for the user.',
          },
        },
        required: ['moduleId', 'priority', 'allocatedHours', 'customFocus'],
      },
    },
    dailySlotRecommendation: {
      type: Type.STRING,
      description: 'Recommended daily time window and session breakdown.',
    },
  },
  required: ['strategySummary', 'moduleAdjustments', 'dailySlotRecommendation'],
};

export const DECOMPOSE_TASKS_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    dayBrief: {
      type: Type.STRING,
      description: 'Crisp 1-2 sentence executive pacing brief for the day.',
    },
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          startTime: { type: Type.STRING, description: '24-hour HH:MM start time' },
          endTime: { type: Type.STRING, description: '24-hour HH:MM end time' },
          durationMinutes: { type: Type.INTEGER },
          priority: {
            type: Type.STRING,
            format: 'enum',
            enum: ['critical', 'high', 'standard'],
            description: 'Exactly one of: critical, high, standard (English, lowercase).',
          },
          category: { type: Type.STRING },
          executionSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          simplificationNote: {
            type: Type.STRING,
            description: 'One practical simplification lever to reduce friction.',
          },
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
};

const BUSY = new Set([429, 500, 503]);
const statusOf = (err: unknown) => (err && typeof err === 'object' && 'status' in err ? Number((err as { status: unknown }).status) : 0);

/**
 * Runs a Gemini call again after a short pause when the service says it is busy (429/500/503 —
 * "high demand" spikes were seen live on both models). Other errors are thrown at once.
 */
export async function retryOnBusy<T>(call: () => Promise<T>, attempts = 2, pauseMs = 1500): Promise<T> {
  for (let i = 1; ; i++) {
    try {
      return await call();
    } catch (err) {
      if (i >= attempts || !BUSY.has(statusOf(err))) throw err;
      await new Promise((r) => setTimeout(r, pauseMs * i));
    }
  }
}

/** Abortable call: a model that hangs (seen: 40–110 s on the mentor model) must not hold the request. */
export const AI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS ?? 25_000);

/**
 * Free-text answer from the first model that replies in time with non-empty text. The mentor model
 * is tried first; on timeout, 429/503 or an empty reply (thinking can use up the output budget) the
 * fast model answers instead. Throws only when every model failed.
 */
export async function generateTextWithFallback(params: {
  contents: Content[];
  systemInstruction: string;
  maxOutputTokens: number;
  models?: string[];
}): Promise<{ text: string; model: string }> {
  const models = params.models ?? [...new Set([GENERAL_MENTOR_MODEL, FAST_STRUCTURED_MODEL])];
  let lastError: unknown = new Error('No model answered.');
  for (const [i, model] of models.entries()) {
    const ctl = new AbortController();
    // Earlier models get a shorter leash so the fallback still answers inside one request.
    const timer = setTimeout(() => ctl.abort(), i < models.length - 1 ? Math.min(15_000, AI_TIMEOUT_MS) : AI_TIMEOUT_MS);
    try {
      const res = await retryOnBusy(() =>
        getGeminiClient().models.generateContent({
          model,
          contents: params.contents,
          config: { systemInstruction: params.systemInstruction, maxOutputTokens: params.maxOutputTokens, abortSignal: ctl.signal },
        })
      );
      const text = (res.text ?? '').trim();
      if (text) return { text, model };
      lastError = new Error(`${model} returned an empty reply`);
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timer);
    }
    console.warn(`[gemini] ${model} failed, trying next:`, lastError instanceof Error ? lastError.message.slice(0, 160) : lastError);
  }
  throw lastError;
}
