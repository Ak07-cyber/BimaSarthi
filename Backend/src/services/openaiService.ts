import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  // Fail fast but don't crash import in test environments
  console.warn('[openaiService] Missing OPENAI_API_KEY environment variable.');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prefer a more capable model; placeholder for web-access capable variant if available.
const MODEL = process.env.OPENAI_RECOMMEND_MODEL || 'gpt-4o-mini';

export const getOpenAIResponse = async (prompt: string, modelOverride?: string) => {
  const system = modelOverride
    ? `You are a document simplification and summarization assistant specialized in insurance documents.
Your responsibilities are:

De-complexify: Break down technical and legal jargon into simple, everyday language.

Summarize: Extract and present the most important points clearly.

Guide: Explain what the document means for the policyholder in practical terms (benefits, risks, obligations).

Caution: Highlight red flags such as hidden clauses, exclusions, mis-selling risks, and claim rejection possibilities.

Educate: Provide actionable insights to build financial awareness, especially for rural and low-income groups, where insurance penetration is critically low. `
    : `You are a life insurance recommendation assistant.
Return:
1. A concise recommendation title.
2. A bullet list: rationale, key features, coverage suggestions, cautions.
3. Be transparent that this is not financial advice.
4. Focus only on life insurance policies relevant to the user's profile.
Keep under 200 words.`;

  const completion = await openai.chat.completions.create({
    model: modelOverride || MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ],
    temperature: 0.4,
  });

  return completion.choices?.[0]?.message?.content?.trim() || 'No response generated.';
};
