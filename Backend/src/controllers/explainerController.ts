import { Request, Response } from 'express';
import { getOpenAIResponse } from '../services/openaiService';
import fs from 'fs';
import pdfParse from 'pdf-parse';

export const explainDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path: filePath } = req.file;
    const { targetLang } = req.body;


    // Read file content, handle PDF specially
    let fileContent = '';
    if (originalname.toLowerCase().endsWith('.pdf')) {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        fileContent = pdfData.text;
      } catch (err) {
        fileContent = '';
      }
    } else {
      try {
        fileContent = fs.readFileSync(filePath, 'utf8');
      } catch (err) {
        fileContent = '';
      }
    }

  // Clean up the uploaded file
  fs.unlinkSync(filePath);

  // Summarize any document using OpenAI (uplift restriction)
  const prompt = `You are an assistant that simplifies insurance documents for ordinary people in India.

Given a policy document or insurance-related text:

Summarize the key benefits and coverage in plain, simple language.

Explain tricky or hidden terms (like exclusions, waiting periods, surrender charges, or claim rules).

Highlight pros, cons, and potential risks in an unbiased way.

Provide practical guidance on how a person should interpret and use the document.

Keep your explanation clear, transparent, and free of jargon.
Assume the reader may have low financial literacy and could be from a rural or low-income background.

. Translate the explanation to ${targetLang}. Document content: ${fileContent.slice(0, 8000)}`;

  const explanation = await getOpenAIResponse(prompt, 'gpt-4o');
  res.json({ explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to explain document' });
  }
};
