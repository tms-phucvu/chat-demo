export default function FirebaseDeploymentPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Firebase setup
          </h1>
          <p className="text-sm text-muted-foreground">
            This guide shows how to connect the chat demo template to your own
            Firebase project (Authentication, Firestore and Realtime Database).
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            1. Create a Firebase project
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Go to the Firebase console and create a new project.
            </li>
            <li>
              Add a new <span className="font-medium">Web app</span> to the
              project (you will get a Firebase config object).
            </li>
            <li>
              In the <span className="font-medium">Build → Authentication</span>{" "}
              section, enable at least one sign-in provider (e.g. Google).
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            2. Enable Firestore and Realtime Database
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              In <span className="font-medium">Build → Firestore Database</span>
              , create a database (start in test mode for development, or
              configure proper security rules).
            </li>
            <li>
              In <span className="font-medium">Build → Realtime Database</span>,
              create a database in the same region as Firestore.
            </li>
            <li>
              Note the Realtime Database URL (something like{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                https://your-project-id-default-rtdb.region.firebasedatabase.app
              </code>
              ).
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            3. Configure environment variables
          </h2>
          <p className="text-sm text-muted-foreground">
            The template reads Firebase configuration from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
              process.env
            </code>{" "}
            in <code>src/lib/firebase.ts</code>. Create a{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
              .env.local
            </code>{" "}
            file in the project root:
          </p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            <code>
              {`NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.region.firebasedatabase.app`}
            </code>
          </pre>
          <p className="text-xs text-muted-foreground">
            These names must match exactly, because they are used in the{" "}
            <code>firebaseConfig</code> object.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            4. Seed minimal data
          </h2>
          <p className="text-sm text-muted-foreground">
            The app will create user documents automatically after
            authentication, but you may want to understand the minimal schema
            required for chat to work.
          </p>

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <h3 className="text-sm font-semibold">Firestore</h3>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`// users/{uid}
{
  displayName: "TMS",
  avatarURL: "https://...",
  email: "tms@example.com",
  createdAt: Timestamp,
}

// rooms/{roomId}
{
  type: "private" | "group",
  groupName?: string,
  groupAvatarURL?: string,
  participants: ["uid1", "uid2"],
  participantsCount: 2,
  unreadCounts: { "uid1": 0, "uid2": 0 },
  createdBy: "uid1",
  createdAt: Timestamp,
  lastMessage?: {
    text: "Hello everyone",
    senderId: "uid1",
    createdAt: Timestamp,
    type: "text" | "system",
  },
}

// rooms/{roomId}/messages/{messageId}
{
  senderId: "uid1",
  text: "Hello everyone!",
  type: "text" | "system",
  createdAt: Timestamp,
}`}
              </code>
            </pre>
          </div>

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <h3 className="text-sm font-semibold">Realtime Database</h3>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`{
  "presence": {
    "uid_1": {
      "status": "online",
      "updatedAt": ServerTimestamp
    }
  },
  "typing": {
    "room_a": {
      "uid_1": true,
      "uid_4": true
    }
  },
  "room_presence": {
    "room_a": {
      "uid_1": true,
      "uid_4": true
    }
  }
}`}
              </code>
            </pre>
            <p className="text-xs text-muted-foreground">
              These nodes are usually managed automatically by the template via
              the presence, typing, and room presence services. You normally do
              not need to create them manually.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            5. Run locally or deploy
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Install dependencies and start the dev server:
              <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs">
                <code>{`npm install
npm run dev`}</code>
              </pre>
            </li>
            <li>
              For deployment (e.g. on Vercel), add the same{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                NEXT_PUBLIC_FIREBASE_*
              </code>{" "}
              variables to your hosting provider&apos;s environment settings.
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}


