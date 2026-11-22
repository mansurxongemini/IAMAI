import { NextResponse } from 'next/server';
import { buildNodeTutorPrompt } from '@core/prompts';
import { computeNodeCacheHash } from '@core/scheduler';
import { TutorNodeChatInputSchema } from '@core/schemas';
import { GENERAL_MENTOR_MODEL, getGeminiClient } from '@/lib/gemini';
import { guard, readJson, serverError } from '@/lib/server/guard';

export async function POST(request: Request) {
  try {
    const gate = await guard(request, 'tutor');
    if (!gate.ok) return gate.response;

    const body = (await readJson(request)) as Record<string, unknown>;
    const parsed = TutorNodeChatInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid tutor question payload.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const nodeHash = computeNodeCacheHash(
      input.blueprintId,
      input.nodeId,
      input.locale,
      input.question
    );

    const prompt = buildNodeTutorPrompt(input);
    const ai = getGeminiClient();

    // Scoped prompt: strictly node metadata + last 4 turns max
    const scopedHistory = input.recentHistory.slice(-4).map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    }));

    const contents = [
      ...scopedHistory,
      {
        role: 'user',
        parts: [{ text: `[Context] ${prompt.contextHeader}\n\nQuestion: ${input.question}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: GENERAL_MENTOR_MODEL,
      contents,
      config: {
        maxOutputTokens: 600,
        systemInstruction: prompt.systemInstruction,
      },
    });

    const reply = (response.text ?? '').trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'AI Tutor returned an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply, nodeHash });
  } catch (error) {
    return serverError('tutor', error);
  }
}
