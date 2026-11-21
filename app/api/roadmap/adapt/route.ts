import { NextResponse } from 'next/server';
import { getBlueprintById } from '@core/blueprints';
import { buildDeltaPatchPrompt } from '@core/prompts';
import { applyDeltaPatchAndSchedule } from '@core/scheduler';
import { AdaptRoadmapInputSchema, GeminiDeltaPatchSchema } from '@core/schemas';
import {
  DELTA_PATCH_RESPONSE_SCHEMA,
  FAST_STRUCTURED_MODEL,
  getGeminiClient,
} from '@/lib/gemini';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(`adapt:${clientId}`, 20, 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment before generating another plan.' },
        { status: 429 }
      );
    }

    const body = await request.json();
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

    const prompt = buildDeltaPatchPrompt(blueprint, input);
    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: FAST_STRUCTURED_MODEL,
      contents: prompt.contents,
      config: {
        systemInstruction: prompt.systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: DELTA_PATCH_RESPONSE_SCHEMA,
      },
    });

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      return NextResponse.json(
        { error: 'Empty adaptation response received from Gemini.' },
        { status: 502 }
      );
    }

    const parsedJson = JSON.parse(rawText);
    const validatedPatch = GeminiDeltaPatchSchema.safeParse(parsedJson);
    if (!validatedPatch.success) {
      return NextResponse.json(
        {
          error: 'Adaptation payload did not match required schema.',
          details: validatedPatch.error.flatten(),
        },
        { status: 502 }
      );
    }

    const ownerId =
      typeof body.ownerId === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(body.ownerId)
        ? body.ownerId
        : 'local-executive';
    const roadmapId = `rm_${blueprint.id}_${Date.now().toString(36)}`;

    const roadmap = applyDeltaPatchAndSchedule({
      roadmapId,
      ownerId,
      blueprint,
      input,
      deltaPatch: validatedPatch.data,
    });

    return NextResponse.json({
      deltaPatch: validatedPatch.data,
      roadmap,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to adapt roadmap.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
