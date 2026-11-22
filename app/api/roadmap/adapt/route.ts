import { NextResponse } from 'next/server';
import { getBlueprintById } from '@core/blueprints';
import { buildDeltaPatchPrompt } from '@core/prompts';
import { applyDeltaPatchAndSchedule, buildSeedDeltaPatch } from '@core/scheduler';
import { AdaptRoadmapInputSchema, GeminiDeltaPatchSchema, type GeminiDeltaPatch } from '@core/schemas';
import {
  DELTA_PATCH_RESPONSE_SCHEMA,
  FAST_STRUCTURED_MODEL,
  getGeminiClient,
} from '@/lib/gemini';
import { guard, readJson, serverError } from '@/lib/server/guard';

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

    // Blueprint-first: Gemini only personalises. If it is unavailable or returns an
    // invalid patch, the deterministic baseline still produces a complete plan.
    let deltaPatch: GeminiDeltaPatch;
    let adapted = true;
    try {
      const prompt = buildDeltaPatchPrompt(blueprint, input);
      const response = await getGeminiClient().models.generateContent({
        model: FAST_STRUCTURED_MODEL,
        contents: prompt.contents,
        config: {
          maxOutputTokens: 1200,
          systemInstruction: prompt.systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: DELTA_PATCH_RESPONSE_SCHEMA,
        },
      });
      const validated = GeminiDeltaPatchSchema.safeParse(JSON.parse((response.text ?? '').trim()));
      if (!validated.success) throw new Error('Delta patch failed schema validation');
      deltaPatch = validated.data;
    } catch (err) {
      console.warn('[api:adapt] falling back to deterministic plan:', err instanceof Error ? err.message : err);
      deltaPatch = buildSeedDeltaPatch(blueprint, input);
      adapted = false;
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
    });

    return NextResponse.json({ deltaPatch, roadmap, adapted });
  } catch (error) {
    return serverError('adapt', error);
  }
}
