export default function MessagingPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
              Media, Emoji & AI (short)
            </h2>
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Media uploads</h3>
              <p className="mt-1 text-xs text-muted-foreground mb-3">
                Media (images, video, audio) are uploaded to Cloudinary and the
                returned secure URL is stored on the message document. See
                <span className="font-medium">
                  {" "}
                  Getting Started → Cloudinary
                </span>
                for detailed setup, presets and code examples.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Emoji support</h3>
              <p className="mt-1 text-xs text-muted-foreground mb-3">
                The chat input integrates{" "}
                <code className="rounded bg-muted px-1 py-0.5">emoji-mart</code>{" "}
                for picking emojis which are inserted as unicode characters. No
                schema change is required—emojis are stored as text.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">AI assistant</h3>
              <p className="mt-1 text-xs text-muted-foreground mb-3">
                The project can send prompts to Vercel&apos;s{" "}
                <code className="rounded bg-muted px-1 py-0.5">groq</code> model
                via
                <code className="rounded bg-muted px-1 py-0.5">@vercel/ai</code>
                . For full configuration and an example API route, see{" "}
                <span className="font-medium">
                  {" "}
                  Getting Started → AI (Groq)
                </span>
                .
              </p>
            </div>
          </section>
          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Real-time Subscription</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Messages are subscribed to in real-time using{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                subscribeMessagesByRoomId
              </code>{" "}
              which sets up a Firestore listener:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`const q = query(
  collection(db, "rooms", roomId, "messages"),
  orderBy("createdAt", "asc")
);

return onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  onChange(messages);
});`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The listener automatically fires whenever a new message is added
              or an existing message is modified, keeping the UI synchronized.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Using the Hook</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Components use{" "}
              <code className="rounded bg-muted px-1 py-0.5">useMessages</code>{" "}
              to get the current message list:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`const { messages, isLoading, error } = useMessages(roomId);

// messages is automatically updated when new messages arrive
// The hook handles subscription cleanup on unmount`}
              </code>
            </pre>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Unread Count Management
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">How Unread Counts Work</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Unread counts are stored per-user in the room document:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`rooms/{roomId} {
  unreadCounts: {
    "uid1": 3,
    "uid2": 0,
    "uid3": 5
  }
}`}
              </code>
            </pre>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong>Incremented:</strong> When a message is sent, counts are
                incremented for all participants except the sender and users
                currently viewing the room (tracked via room presence)
              </li>
              <li>
                <strong>Reset:</strong> When a user opens a room,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  resetUnreadCount
                </code>{" "}
                sets their count to 0
              </li>
              <li>
                <strong>Displayed:</strong> Room list items show a badge with
                the unread count if it&apos;s greater than 0
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">
              Integration with Room Presence
            </h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The template uses room presence (Realtime Database) to determine
              who is currently viewing a room:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                When a user opens a room,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  useRoomPresence
                </code>{" "}
                calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  enterRoom(uid, roomId)
                </code>
              </li>
              <li>
                When sending a message, the service checks room presence to
                exclude active viewers from unread count increments
              </li>
              <li>
                When leaving a room,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  leaveRoom(uid, roomId)
                </code>{" "}
                is called automatically
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              This ensures users don&apos;t get unread badges for messages
              they&apos;re actively viewing.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Attachments & media</h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Messages can include an <code className="rounded bg-muted px-1 py-0.5">attachments</code> array. Attachments use the project&apos;s
              Cloudinary helpers; images and videos are returned as objects that match the <code className="rounded bg-muted px-1 py-0.5">UploadMedia</code>
              shape and are stored on the message as <code className="rounded bg-muted px-1 py-0.5">attachments: UploadMedia[]</code>.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>{`rooms/{roomId}/messages/{messageId} {
  senderId: string;
  text?: string;
  type: 'text' | 'system' | 'media' | 'audio';
  attachments?: UploadMedia[]; // UploadMedia is UploadImage | UploadVideo
  createdAt: Timestamp;
}`}</code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              Client helpers: <code className="rounded bg-muted px-1 py-0.5">src/features/chat/services/cloudinary.service.ts</code>
              and the hook <code className="rounded bg-muted px-1 py-0.5">src/features/chat/hooks/use-upload-media.ts</code>.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Emoji</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The input uses <code className="rounded bg-muted px-1 py-0.5">emoji-mart</code> to insert unicode emoji into the
              message text. No schema change is necessary.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">AI assistant (short)</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The repo includes a server API at <code className="rounded bg-muted px-1 py-0.5">src/app/api/chat/route.ts</code> which calls the
              <code className="rounded bg-muted px-1 py-0.5">@ai-sdk/groq</code> model via <code className="rounded bg-muted px-1 py-0.5">streamText</code>.
              See <span className="font-medium">Getting Started → AI (Groq)</span> for full details and examples.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Message Types
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              The template currently supports these message types:
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <strong>
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;text&quot;
                  </code>
                </strong>{" "}
                – Regular user messages with text content
              </li>
              <li>
                <strong>
                  <code className="rounded bg-muted px-1 py-0.5">
                    &quot;system&quot;
                  </code>
                </strong>{" "}
                – System-generated messages (e.g. &quot;created the group&quot;)
                that are styled differently in the UI
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              You can extend this to support{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                &quot;image&quot;
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                &quot;file&quot;
              </code>
              , or{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                &quot;reply&quot;
              </code>{" "}
              types by updating the message type definition and adding
              appropriate UI components.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Implementation Details
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Key files for messaging:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/services/messages.service.ts
                </code>{" "}
                – sendMessage, subscribeMessagesByRoomId
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/hooks/use-messages.ts
                </code>{" "}
                – React hook for subscribing to messages
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/hooks/use-send-message.ts
                </code>{" "}
                – React hook for sending messages
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/services/unread-count.service.ts
                </code>{" "}
                – resetUnreadCount function
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/room-pane/chat-message-list.tsx
                </code>{" "}
                – Component that renders the message list
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
