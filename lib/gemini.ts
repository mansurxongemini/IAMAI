import { GoogleGenAI, Type } from '@google/genai';

export const FAST_STRUCTURED_MODEL = 'gemini-3.1-flash-lite';
export const GENERAL_MENTOR_MODEL = 'gemini-4-hydrogen';

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
            description: 'One of: skip, low, normal, high',
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
            description: 'One of: critical, high, standard',
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
