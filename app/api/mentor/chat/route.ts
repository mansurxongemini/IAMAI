import { NextResponse } from 'next/server';
import { buildExecutiveMentorSystemInstruction } from '@core/prompts';
import { MentorChatInputSchema } from '@core/schemas';
import { GENERAL_MENTOR_MODEL, getGeminiClient } from '@/lib/gemini';
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
    const ai = getGeminiClient();

    const chat = ai.chats.create({
      model: GENERAL_MENTOR_MODEL,
      history: history.map((turn) => ({
        role: turn.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: turn.content }],
      })),
      config: {
        maxOutputTokens: 900,
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
    return serverError('mentor', error);
  }
}
