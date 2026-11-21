import { NextResponse } from 'next/server';
import { buildExecutiveMentorSystemInstruction } from '@core/prompts';
import { MentorChatInputSchema } from '@core/schemas';
import { GENERAL_MENTOR_MODEL, getGeminiClient } from '@/lib/gemini';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(`mentor:${clientId}`, 30, 60_000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please pause briefly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = MentorChatInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid mentor message.', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { role, locale, message, history } = parsed.data;
    const systemInstruction = buildExecutiveMentorSystemInstruction(role, locale);
    const ai = getGeminiClient();

    const chat = ai.chats.create({
      model: GENERAL_MENTOR_MODEL,
      history: history.map((turn) => ({
        role: turn.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: turn.content }],
      })),
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({ message });
    const reply = (response.text ?? '').trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'Mentor returned an empty reply.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Executive mentor chat failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
