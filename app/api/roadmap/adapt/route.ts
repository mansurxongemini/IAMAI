import { NextResponse } from 'next/server';
import { getBlueprintById } from '@core/blueprints';
import { buildDeltaPatchPrompt } from '@core/prompts';
import { applyDeltaPatchAndSchedule } from '@core/scheduler';
import { normalizeDeltaPatch } from '@core/normalize';
import { AdaptRoadmapInputSchema, type GeminiDeltaPatch } from '@core/schemas';
import {
  AI_TIMEOUT_MS,
  DELTA_PATCH_RESPONSE_SCHEMA,
  FAST_STRUCTURED_MODEL,
  getGeminiClient,
  retryOnBusy,
} from '@/lib/gemini';
import { aiUnavailable, guard, readJson, serverError } from '@/lib/server/guard';

export async function POST(request: Request) {
  try {
    const gate = await guard(request, 'adapt');
    if (!gate.ok) return gate.response;

    const body = (await readJson(request)) as Record<string, unknown>;
    const parsedInput = AdaptRoadmapInputSchema.safeParse(body);
    if (!parsedInput.success) {
      return NextResponse.json(
        { error: 'Invalid roadmap parameters.', details: parsedInput.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsedInput.data;
    const blueprint = getBlueprintById(input.blueprintId);
    if (!blueprint) {
      return NextResponse.json({ error: 'Selected blueprint not found.' }, { status: 404 });
    }

    // Blueprint-first: Gemini personalises the expert curriculum. If it cannot answer, the learner
    // is told the AI connection was lost; no plan is made without it.
    let deltaPatch: GeminiDeltaPatch;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), AI_TIMEOUT_MS);
    try {
      const prompt = buildDeltaPatchPrompt(blueprint, input);
      const response = await retryOnBusy(() =>
        getGeminiClient().models.generateContent({
          model: FAST_STRUCTURED_MODEL,
          contents: prompt.contents,
          config: {
            maxOutputTokens: 1600,
            systemInstruction: prompt.systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: DELTA_PATCH_RESPONSE_SCHEMA,
            abortSignal: ctl.signal,
          },
        })
      );
      // Map near-misses ("medium", translated enums, unknown ids) instead of rejecting the whole plan.
      const patch = normalizeDeltaPatch(JSON.parse((response.text ?? '').trim()), blueprint);
      if (!patch) throw new Error('Delta patch had no usable module adjustments');
      deltaPatch = patch;
    } catch (err) {
      console.warn('[api:adapt] AI model unavailable:', err instanceof Error ? err.message : err);
      return aiUnavailable();
    } finally {
      clearTimeout(timer);
    }

    // Identity comes only from the verified token, never from the request body.
    const ownerId = gate.user?.uid ?? 'local-executive';
    const roadmapId = `rm_${blueprint.id}_${Date.now().toString(36)}`;

    const roadmap = applyDeltaPatchAndSchedule({
      roadmapId,
      ownerId,
      blueprint,
      input,
      deltaPatch,
      startDate: input.startDate ? new Date(`${input.startDate}T00:00:00.000Z`) : undefined,
    });

    return NextResponse.json({ deltaPatch, roadmap });
  } catch (error) {
    return serverError('adapt', error);
  }
}
