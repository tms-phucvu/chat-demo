export default function DocsPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Chat Demo Template
          </h1>
          <p className="text-sm text-muted-foreground">
            A production-ready chat experience built with Next.js (App Router),
            Firebase Authentication, Firestore and Realtime Database. This page
            explains how the template works and how to plug it into your own
            project.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Tech stack</h2>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>Next.js App Router</li>
              <li>TypeScript & React</li>
              <li>Firebase Auth</li>
              <li>Cloud Firestore</li>
              <li>Realtime Database</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-4 md:col-span-2">
            <h2 className="text-sm font-semibold">Main features</h2>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>Private and group chat rooms</li>
              <li>Real-time messaging with unread counts</li>
              <li>Online presence & in-room presence</li>
              <li>Typing indicators per room</li>
              <li>User search and invite flow</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Quick start</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Create a Firebase project and enable:
              <ul className="mt-1 list-disc pl-5">
                <li>Authentication (e.g. Google provider)</li>
                <li>Cloud Firestore (in production or test mode)</li>
                <li>Realtime Database</li>
              </ul>
            </li>
            <li>
              Copy your Firebase config values and create a{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                .env.local
              </code>{" "}
              file:
              <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>
                  {`NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...`}
                </code>
              </pre>
            </li>
            <li>
              Install dependencies and run the dev server:
              <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`npm install
npm run dev`}</code>
              </pre>
            </li>
            <li>
              Sign in via the login page and navigate to{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                /chat
              </code>{" "}
              to start using the chat UI.
            </li>
          </ol>

          <p className="text-xs text-muted-foreground">
            For a detailed explanation of each step and how to setup Firebase,
            see{" "}
            <span className="font-medium">
              Getting Started → Firebase Setup
            </span>{" "}
            in the sidebar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Firebase data model overview
          </h2>
          <p className="text-sm text-muted-foreground">
            The template uses both Firestore and Realtime Database:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Realtime Database</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Optimized for fast, ephemeral updates such as presence and
                typing indicators.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
                <code>
                  {`presence/{uid} {
  status: "online" | "offline";
  updatedAt: ServerTimestamp;
}

typing/{roomId}/{uid}: true | null

room_presence/{roomId}/{uid}: true`}
                </code>
              </pre>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Firestore</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Stores durable user profiles, rooms and messages.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
                <code>
                  {`users/{uid} {
  displayName: string;
  avatarURL: string | null;
  email: string;
  createdAt: Timestamp;
}

rooms/{roomId} {
  type: "private" | "group";
  groupName?: string;
  groupAvatarURL?: string;
  participants: string[]; // uids
  participantsCount: number;
  unreadCounts: { [uid: string]: number };
  createdBy: string; // uid
  createdAt: Timestamp;
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: Timestamp;
    type: "text" | "system";
  };
}

rooms/{roomId}/messages/{messageId} {
  senderId: string;
  text: string;
  type: "text" | "system";
  createdAt: Timestamp;
}`}
                </code>
              </pre>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            For a detailed explanation of each field and how the UI consumes
            this data, see{" "}
            <span className="font-medium">Architecture → Data Models</span> and{" "}
            <span className="font-medium">
              Getting Started → Firebase Setup
            </span>{" "}
            in the sidebar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            How the template is organized
          </h2>
          <p className="text-sm text-muted-foreground">
            The chat feature is structured by domain to make it easy to reuse in
            other projects:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                src/features/chat/components
              </code>{" "}
              – presentational and layout components for the chat UI.
            </li>
            <li>
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                src/features/chat/services
              </code>{" "}
              – thin wrappers around Firebase SDK (rooms, messages, presence,
              typing, unread counts, user search).
            </li>
            <li>
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                src/features/chat/hooks
              </code>{" "}
              – React hooks that connect services to UI and handle
              subscriptions.
            </li>
            <li>
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                src/features/chat/stores
              </code>{" "}
              – client-side state (e.g. the active room, dialog state).
            </li>
          </ul>
          <p className="text-xs text-muted-foreground">
            You can copy the entire <code>features/chat</code> folder into
            another Next.js app (plus the shared providers and Firebase config)
            to reuse the chat experience with minimal wiring.
          </p>
        </section>
      </main>
    </div>
  );
}
