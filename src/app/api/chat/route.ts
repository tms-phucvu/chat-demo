import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    system:
      "You are a Admin of TOMOSIA Company. Please respond briefly, concisely, and get straight to the point.",
    messages,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
