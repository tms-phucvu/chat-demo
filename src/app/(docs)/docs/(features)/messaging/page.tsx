export default function MessagingPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Real-time Messaging
          </h1>
          <p className="text-sm text-muted-foreground">
            Messages are stored in Firestore sub-collections and synchronized
            in real-time. This section explains how messages are sent, received,
            and how unread counts are managed.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Message Structure
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Messages are stored as sub-collections under each room:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`rooms/{roomId}/messages/{messageId} {
  senderId: string;              // UID of sender
  text: string;                  // message content
  type: "text" | "system";       // message type
  createdAt: Timestamp;          // server timestamp for ordering
}`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              Messages are always queried with{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                orderBy("createdAt", "asc")
              </code>{" "}
              to maintain chronological order in the UI.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Sending Messages
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Atomic Batch Operation</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              When a user sends a message, the template uses a Firestore batch
              to update multiple documents atomically via{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                sendMessage
              </code>{" "}
              in{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                messages.service.ts
              </code>
              :
            </p>
            <ol className="space-y-2 text-xs text-muted-foreground list-decimal pl-5">
              <li>
                <strong>Create message:</strong> Add new document to{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  rooms/{`{roomId}`}/messages
                </code>{" "}
                with senderId, text, type, and serverTimestamp()
              </li>
              <li>
                <strong>Update room.lastMessage:</strong> Set the denormalized
                lastMessage field on the room document for fast preview in room
                list
              </li>
              <li>
                <strong>Increment unread counts:</strong> For each participant
                who is not the sender and not currently viewing the room, use{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  FieldValue.increment(1)
                </code>{" "}
                on{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  unreadCounts.{`{uid}`}
                </code>
              </li>
              <li>
                <strong>Commit batch:</strong> All operations succeed or fail
                together (atomicity)
              </li>
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">
              This ensures the room list, message list, and unread badges all
              update consistently.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Using the Hook</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Components use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useSendMessage
              </code>{" "}
              hook to send messages:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`const { sendMessage, isLoading } = useSendMessage();

sendMessage({
  roomId: "room_123",
  text: "Hello!",
  senderId: currentUid,
  unreadParticipants: ["uid2", "uid3"] // exclude sender & users in room
});`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The hook handles determining which participants should have their
              unread count incremented (excludes sender and users currently
              viewing the room via room presence).
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Receiving Messages
          </h2>

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
        </section>

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
            <h3 className="text-sm font-semibold">Integration with Room Presence</h3>
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
                  <code className="rounded bg-muted px-1 py-0.5">"text"</code>
                </strong>{" "}
                – Regular user messages with text content
              </li>
              <li>
                <strong>
                  <code className="rounded bg-muted px-1 py-0.5">
                    "system"
                  </code>
                </strong>{" "}
                – System-generated messages (e.g. &quot;created the group&quot;)
                that are styled differently in the UI
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              You can extend this to support{" "}
              <code className="rounded bg-muted px-1 py-0.5">"image"</code>,{" "}
              <code className="rounded bg-muted px-1 py-0.5">"file"</code>, or{" "}
              <code className="rounded bg-muted px-1 py-0.5">"reply"</code>{" "}
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

