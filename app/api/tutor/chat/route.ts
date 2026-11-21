import { NextResponse } from 'next/server';
import { buildNodeTutorPrompt } from '@core/prompts';
import { computeNodeCacheHash } from '@core/scheduler';
import { TutorNodeChatInputSchema } from '@core/schemas';
import { GENERAL_MENTOR_MODEL, getGeminiClient } from '@/lib/gemini';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(`tutor:${clientId}`, 30, 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait briefly before sending another question.' },
        { status: 429 }
      );
    }

    const body = await request.json();
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
    const message = error instanceof Error ? error.message : 'Node tutor request failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
