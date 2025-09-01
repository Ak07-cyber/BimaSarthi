import { Request, Response } from 'express';
import { getOpenAIResponse } from '../services/openaiService';
import fs from 'fs';

export const explainDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path: filePath } = req.file;
    const { targetLang } = req.body;

    // For now, we'll just read the file name and simulate a response.
    // In a real application, you would process the file content.
    const fileContent = `File name: ${originalname}. This is a placeholder for the actual file content.`;

    const prompt = `Summarize the following document and explain its key points, pros, cons, and potential pitfalls. The document is about an insurance policy. Translate the explanation to ${targetLang}. Document content: ${fileContent}`;

    const explanation = await getOpenAIResponse(prompt);

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.json({ explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to explain document' });
  }
};
