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
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(`decompose:${clientId}`, 20, 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }

    const body = await request.json();
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

    const ownerId =
      typeof body.ownerId === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(body.ownerId)
        ? body.ownerId
        : 'local-executive';
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
    const message = error instanceof Error ? error.message : 'Failed to sequence tasks.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
