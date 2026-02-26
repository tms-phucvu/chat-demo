import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Missing prompt", { status: 400 });
    }

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      system:
        "You are a Admin AI of TOMOSIA Company. Please respond briefly, concisely, and get straight to the point.",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Lỗi API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
