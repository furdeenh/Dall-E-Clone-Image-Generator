import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set
});

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",  // You can also use "dall-e-2" if necessary
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json', // Keeps the response as a base64 image
    });

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: error?.message || "Something went wrong" });
  }
});

export default router;
