import { NextResponse } from 'next/server';
import { buildTaskDecomposePrompt } from '@core/prompts';
import { normalizeDecomposedTasks } from '@core/normalize';
import { DecomposeTasksInputSchema, type DailyTask } from '@core/schemas';
import {
  AI_TIMEOUT_MS,
  DECOMPOSE_TASKS_RESPONSE_SCHEMA,
  FAST_STRUCTURED_MODEL,
  getGeminiClient,
  retryOnBusy,
} from '@/lib/gemini';
import { aiUnavailable, guard, readJson, serverError } from '@/lib/server/guard';

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

    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), AI_TIMEOUT_MS);
    const response = await retryOnBusy(() =>
      ai.models.generateContent({
        model: FAST_STRUCTURED_MODEL,
        contents: prompt.contents,
        config: {
          maxOutputTokens: 1600,
          systemInstruction: prompt.systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: DECOMPOSE_TASKS_RESPONSE_SCHEMA,
          abortSignal: ctl.signal,
        },
      })
    ).finally(() => clearTimeout(timer));

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      return aiUnavailable();
    }

    // Map translated priorities ("Yuqori", "O'rta") and trim long fields instead of failing the whole day.
    const validated = normalizeDecomposedTasks(JSON.parse(rawText));
    if (!validated) {
      return aiUnavailable();
    }

    // Identity comes only from the verified token, never from the request body.
    const ownerId = gate.user?.uid ?? 'local-executive';
    const nowIso = new Date().toISOString();

    const tasks: DailyTask[] = validated.tasks.map((item, index) => ({
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
      dayBrief: validated.dayBrief,
      tasks,
    });
  } catch (error) {
    return serverError('decompose', error);
  }
}
