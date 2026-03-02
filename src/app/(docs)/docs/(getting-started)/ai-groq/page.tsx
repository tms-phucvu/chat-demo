export default function AIGroqPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">AI assistant (Groq) setup</h1>
          <p className="text-sm text-muted-foreground">
            Instructions to configure the Vercel <code className="rounded bg-muted px-1 py-0.5">@vercel/ai</code> SDK
            using the <code className="rounded bg-muted px-1 py-0.5">groq</code> model and integrate it with the chat flow.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">1. API key & env</h2>
          <p className="text-sm text-muted-foreground">
            This template uses the <code className="rounded bg-muted px-1 py-0.5">@ai-sdk/groq</code> package and the streaming helper from <code className="rounded bg-muted px-1 py-0.5">ai</code>.
            Add your API key (used by the runtime) to <code className="rounded bg-muted px-1 py-0.5">.env.local</code>. The repo includes <code className="rounded bg-muted px-1 py-0.5">.env.example</code> with <code className="rounded bg-muted px-1 py-0.5">GROQ_API_KEY</code>.
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            <code>{`// .env.local (example)
GROQ_API_KEY=your_groq_api_key
`}</code>
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">2. Server API route (already implemented)</h2>
          <p className="text-sm text-muted-foreground">
            The project exposes an API route at <code className="rounded bg-muted px-1 py-0.5">src/app/api/chat/route.ts</code> which accepts a JSON body with <code className="rounded bg-muted px-1 py-0.5">{ '{ prompt }' }</code> and streams the AI response back to the client using <code className="rounded bg-muted px-1 py-0.5">streamText</code>.
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
            <code>{`// src/app/api/chat/route.ts (excerpt)
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: 'You are a concise admin assistant. Answer briefly.',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
`}</code>
          </pre>
          <p className="text-xs text-muted-foreground">
            Call this route from the UI (POST /api/chat with JSON <code>{'{ prompt }'}</code>) to receive a streamed text response and render it as a <code className="rounded bg-muted px-1 py-0.5">system</code> message if you persist it in Firestore.
          </p>
        </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">3. Room & IDs</h2>
            <p className="text-sm text-muted-foreground">
              The template uses specific room IDs to route AI conversations in the UI. See <code className="rounded bg-muted px-1 py-0.5">src/constants/ai.constant.ts</code>
              for example IDs used by the demo. You can create a dedicated room and use that roomId when saving AI responses as <code className="rounded bg-muted px-1 py-0.5">type: &apos;system&apos;</code>.
            </p>
          </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">3. Conversation design</h2>
          <p className="text-sm text-muted-foreground">
            Keep requests concise and optionally include a trimmed conversation history when calling the API to maintain context while controlling token usage.
          </p>
        </section>
      </main>
    </div>
  );
}
