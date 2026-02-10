export default function DataModelsPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Architecture
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Data models</h1>
          <p className="text-sm text-muted-foreground">
            This section documents how the chat template stores data in Firebase
            Realtime Database and Cloud Firestore, and how the frontend consumes
            these models.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Realtime Database
          </h2>
          <p className="text-sm text-muted-foreground">
            Realtime Database is used for fast, ephemeral state that changes
            very frequently: user presence, typing status, and in-room presence.
            This keeps Firestore writes minimal and reduces cost.
          </p>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Presence tree</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Each signed-in user has a single presence node, updated based on
              their connection state.
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`presence/{uid} {
  status: "online" | "offline";
  updatedAt: ServerTimestamp;
}`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              Implemented in{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                src/services/presence.service.ts
              </code>{" "}
              using{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                onDisconnect
              </code>{" "}
              to automatically set users offline when their connection drops.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Typing indicators</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Every room has a node with the list of users currently typing in
                that room.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
                <code>{`typing/{roomId}/{uid}: true | null`}</code>
              </pre>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>
                  <strong>Write:</strong>{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    handleTyping(roomId, uid)
                  </code>{" "}
                  in{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    typing.service.ts
                  </code>
                </li>
                <li>
                  <strong>Read:</strong>{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    subscribeToTyping(roomId)
                  </code>{" "}
                  +{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    useTypingIndicator
                  </code>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Room presence</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Tracks which users are currently viewing a specific room.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
                <code>{`room_presence/{roomId}/{uid}: true`}</code>
              </pre>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>
                  <strong>Enter room:</strong>{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    enterRoom(uid, roomId)
                  </code>
                </li>
                <li>
                  <strong>Leave room:</strong>{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    leaveRoom(uid, roomId)
                  </code>
                </li>
                <li>
                  <strong>Subscribe:</strong>{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    subscribeToRoomPresence(roomId)
                  </code>{" "}
                  +{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                    useRoomPresence
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Firestore</h2>
          <p className="text-sm text-muted-foreground">
            Firestore holds all persistent data: users, rooms and messages.
            Reads are optimized for the main UI queries: &quot;my rooms&quot;
            and &quot;messages in a room&quot;.
          </p>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Users collection</h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`users/{uid} {
  displayName: string;
  avatarURL: string | null;
  email: string;
  createdAt: Timestamp;
}`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              Used by user search, avatars and the chat header. Managed via{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                user-info.service.ts
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                useUserInfo
              </code>
              .
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Rooms collection</h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`rooms/{roomId} {
  type: "private" | "group";
  groupName?: string;
  groupAvatarURL?: string;

  // Participants
  participants: string[];        // uids in this room
  participantsCount: number;     // denormalized for fast ordering

  // Per-user unread counts
  unreadCounts: {
    [uid: string]: number;
  };

  // Metadata
  createdBy: string;             // uid of creator
  createdAt: Timestamp;

  // Denormalized last message for room list preview
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: Timestamp;
    type: "text" | "image" | "file" | "system";
  };
}`}
              </code>
            </pre>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>
                <strong>My rooms:</strong> query by{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  where(&quot;participants&quot;, &quot;array-contains&quot;,
                  uid)
                </code>{" "}
                and{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  orderBy(&quot;lastMessage.createdAt&quot;, &quot;desc&quot;)
                </code>{" "}
                (see{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  rooms.service.ts
                </code>
                ).
              </li>
              <li>
                <strong>Unread counts:</strong> incremented per user in a
                Firestore batch whenever a message is sent.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Messages sub-collection</h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`rooms/{roomId}/messages/{messageId} {
  senderId: string;
  text: string;
  type: "text" | "image" | "file" | "system" | "reply";
  createdAt: Timestamp; // used for ordering
}`}
              </code>
            </pre>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>
                Messages are always queried with{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  orderBy(&quot;createdAt&quot;, &quot;asc&quot;)
                </code>{" "}
                to render the timeline.
              </li>
              <li>
                Sending a message uses a Firestore batch to save the message and
                update{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  rooms/{`{roomId}`}.lastMessage
                </code>{" "}
                plus{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  unreadCounts
                </code>{" "}
                in one atomic operation (see{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-[0.7rem]">
                  messages.service.ts
                </code>
                ).
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            How the frontend uses these models
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Room list:</strong> uses{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                subscribeRoomsByUser
              </code>{" "}
              to listen to all rooms where the current user is a participant.
            </li>
            <li>
              <strong>Message list:</strong> uses{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                subscribeMessagesByRoomId
              </code>{" "}
              to stream messages in the active room.
            </li>
            <li>
              <strong>Typing indicator:</strong> combines Realtime Database
              subscriptions with{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                useTypingIndicator
              </code>{" "}
              to show who is currently typing.
            </li>
            <li>
              <strong>Presence:</strong> the{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[0.75rem]">
                PresenceSyncProvider
              </code>{" "}
              sets up the current user&apos;s presence and exposes helpers to
              the rest of the app.
            </li>
          </ul>
          <p className="text-xs text-muted-foreground">
            You can adjust these models (for example, add message reactions or
            per-room settings) as long as you keep the queries used in the
            services compatible with your new schema.
          </p>
        </section>
      </main>
    </div>
  );
}
