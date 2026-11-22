import { NextResponse } from 'next/server';
import { buildNodeTutorPrompt } from '@core/prompts';
import { computeNodeCacheHash } from '@core/scheduler';
import { TutorNodeChatInputSchema } from '@core/schemas';
import { generateTextWithFallback } from '@/lib/gemini';
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

    // Mentor model first, fast model if it is slow, busy or returns nothing.
    const { text: reply } = await generateTextWithFallback({
      contents,
      systemInstruction: prompt.systemInstruction,
      maxOutputTokens: 1600,
    });

    return NextResponse.json({ reply, nodeHash });
  } catch (error) {
    return serverError('tutor', error);
  }
}
