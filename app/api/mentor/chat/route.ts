import { NextResponse } from 'next/server';
import { buildExecutiveMentorSystemInstruction } from '@core/prompts';
import { MentorChatInputSchema } from '@core/schemas';
import { generateTextWithFallback } from '@/lib/gemini';
import { guard, readJson, serverError } from '@/lib/server/guard';

export async function POST(request: Request) {
  try {
    const gate = await guard(request, 'mentor');
    if (!gate.ok) return gate.response;

    const body = (await readJson(request)) as Record<string, unknown>;
    const parsed = MentorChatInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid mentor message.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { role, locale, message, history } = parsed.data;
    const systemInstruction = buildExecutiveMentorSystemInstruction(role, locale);
    // Mentor model first, fast model if it is slow, busy or returns nothing.
    const { text: reply } = await generateTextWithFallback({
      contents: [
        ...history.map((turn) => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.content }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ],
      systemInstruction,
      maxOutputTokens: 2000,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    return serverError('mentor', error);
  }
}
