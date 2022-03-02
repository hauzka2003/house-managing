import { Configuration, OpenAIApi } from "openai";
export default async function handler(req, res) {
  const { prompt } = req.body;
  const newPrompt =
    "Marv is a chatbot that reluctantly answers questions with sarcastic responses:";
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.7,
  });
  // console.log(completion.data.choices);
  res.json({ data: completion.data.choices[0].text });
}
