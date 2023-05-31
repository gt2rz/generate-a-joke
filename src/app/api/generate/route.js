import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req, res) {
  const { prompt } = await req.json();
  // const { prompt } = body;

  if (!prompt || prompt.length === 0)
    return NextResponse.error("Prompt is required", { status: 400 });

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Dame un chiste para el tema ${prompt}`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices);
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
