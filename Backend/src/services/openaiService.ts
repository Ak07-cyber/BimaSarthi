import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  // Fail fast but don't crash import in test environments
  console.warn('[openaiService] Missing OPENAI_API_KEY environment variable.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prefer a more capable model; placeholder for web-access capable variant if available.
const MODEL = process.env.OPENAI_RECOMMEND_MODEL || 'gpt-4o-mini';

export const getOpenAIResponse = async (prompt: string) => {
const system = `You are a life insurance recommendation assistant.
Return:
1. A concise recommendation title.
2. A bullet list: rationale, key features, coverage suggestions, cautions.
3. Be transparent that this is not financial advice.
4. Focus only on life insurance policies relevant to the user's profile.
Keep under 200 words.`;


  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ],
    temperature: 0.4,
  });

  return completion.choices?.[0]?.message?.content?.trim() || 'No response generated.';
};
