import { Request, Response } from 'express';
import { getOpenAIResponse } from '../services/openaiService';

export const recommendPolicy = async (req: Request, res: Response) => {
  try {
    const { userInput } = req.body;
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' });
    }

    const prompt = `You are a life insurance assistant. Given the user profile JSON below, produce EXACTLY valid JSON (no markdown fences, no commentary) matching this TypeScript interface:
interface RecommendationResponse {
  title: string;
  summary: string;
  rationale: string[];
  suggestedCoverage: string[];
  cautions: string[];
  disclaimer: string;
  policies: Array<{
    name: string; // product name
    type: string; // always a type of Life Insurance (e.g. Term Life, Whole Life, Endowment)
    coverage: string; // e.g. "₹1 Cr" or "₹50L"
    annualPremium: string; // e.g. "₹9,500" (approx, INR)
    why: string; // one-line reason
    pros: string[];
    cons: string[];
  }>; // minimum 5 life insurance policies ranked best first
}

User profile JSON: ${userInput}

Rules:
- Output ONLY valid JSON parsable by JSON.parse.
- Recommend ONLY life insurance products (no health/critical illness).
- Provide at least 5 distinct life insurance policies with realistic annualPremium values (currency INR).
- Arrays should have 3–5 items each where appropriate.
- disclaimer must explicitly state this is not financial advice.`;

    const raw = await getOpenAIResponse(prompt);
    let recommendation: any = null;
    try {
      // attempt direct parse
      recommendation = JSON.parse(raw);
    } catch (e) {
      try {
        // salvage JSON inside text if model added extra text
        const start = raw.indexOf('{');
        const end = raw.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          const candidate = raw.slice(start, end + 1);
            recommendation = JSON.parse(candidate);
        }
      } catch (e2) {
        return res.status(502).json({ error: 'Failed to parse model output', raw });
      }
    }
    if (!recommendation?.policies || recommendation.policies.length < 5) {
      return res.status(502).json({ error: 'Model returned insufficient policies', raw });
    }
    res.json({ recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get recommendation' });
  }
};
