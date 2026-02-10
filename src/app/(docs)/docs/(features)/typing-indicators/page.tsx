export default function TypingIndicatorsPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Typing Indicators
          </h1>
          <p className="text-sm text-muted-foreground">
            Typing indicators show when other users are currently typing in a
            room. This feature uses Firebase Realtime Database for fast,
            real-time updates with automatic cleanup.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            How It Works
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Data Structure</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Typing status is stored in Realtime Database:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`typing/{roomId}/{uid}: true | null`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              When a user is typing, their node is set to{" "}
              <code className="rounded bg-muted px-1 py-0.5">true</code>. When
              they stop typing, the node is removed (set to{" "}
              <code className="rounded bg-muted px-1 py-0.5">null</code>).
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Sending Typing Status</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              When a user types in the chat input,{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                handleTyping(roomId, uid)
              </code>{" "}
              is called from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                typing.service.ts
              </code>
              :
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Sets the typing node to{" "}
                <code className="rounded bg-muted px-1 py-0.5">true</code>{" "}
                (only once per typing session to minimize writes)
              </li>
              <li>
                Sets up{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  onDisconnect
                </code>{" "}
                to automatically remove the node if connection drops
              </li>
              <li>
                Starts a timeout (default 3 seconds) that will clear typing
                status if no further typing occurs
              </li>
              <li>
                Each keystroke resets the timeout, so typing status stays active
                while the user is actively typing
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              This debouncing approach reduces database writes while still
              providing responsive typing indicators.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Clearing Typing Status</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Typing status is cleared in two scenarios:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong>Timeout:</strong> After{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  TYPING_TIMEOUT_MS
                </code>{" "}
                (default 3000ms) of no typing activity,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  clearTyping(roomId, uid)
                </code>{" "}
                is called automatically
              </li>
              <li>
                <strong>Message sent:</strong> When the user sends a message,
                typing status is cleared immediately
              </li>
              <li>
                <strong>Connection drop:</strong> If the user&apos;s connection
                drops,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  onDisconnect
                </code>{" "}
                automatically removes the typing node
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Receiving Typing Status
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Subscribing to Typing</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              To see who is typing in a room, use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                subscribeToTyping
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                typing.service.ts
              </code>
              :
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`subscribeToTyping(roomId, (typingIds) => {
  // typingIds is an array of UIDs currently typing
  // e.g. ["uid1", "uid2"]
});`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The callback receives an array of user IDs who are currently
              typing. The subscription automatically updates whenever someone
              starts or stops typing.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Using the Hook</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Components use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useTypingIndicator
              </code>{" "}
              hook to get typing status:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`const typingIds = useTypingIndicator(roomId);

// typingIds is an array of UIDs currently typing
// Excludes the current user automatically
// Returns empty array if roomId is null`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The hook automatically filters out the current user (you don&apos;t
              want to see your own typing indicator) and handles subscription
              cleanup when the component unmounts or roomId changes.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            UI Display
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">TypingIndicator Component</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The template includes a{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                TypingIndicator
              </code>{" "}
              component that displays typing status:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Shows animated dots when users are typing
              </li>
              <li>
                Displays user names (e.g., &quot;John, Jane are typing...&quot;)
              </li>
              <li>
                Automatically hides when no one is typing
              </li>
              <li>
                Positioned at the bottom of the message list, above the input
                field
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              The component uses{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useTypingIndicator
              </code>{" "}
              to get typing IDs and{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useUserInfo
              </code>{" "}
              to fetch user names for display.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Performance Optimizations
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              The typing indicator system is optimized for performance:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong>Debounced writes:</strong> Typing status is only written
                once per typing session, not on every keystroke
              </li>
              <li>
                <strong>Automatic cleanup:</strong> Timeout and onDisconnect
                ensure typing nodes don&apos;t persist unnecessarily
              </li>
              <li>
                <strong>Realtime Database:</strong> Fast updates with lower
                latency than Firestore for this ephemeral data
              </li>
              <li>
                <strong>Selective subscriptions:</strong> Only active rooms have
                typing subscriptions, reducing unnecessary listeners
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Implementation Details
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Key files for typing indicators:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/services/typing.service.ts
                </code>{" "}
                – handleTyping, clearTyping, subscribeToTyping
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/hooks/use-typing-indicator.ts
                </code>{" "}
                – React hook for subscribing to typing status
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/ui/typing-indicator.tsx
                </code>{" "}
                – UI component that displays typing status
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/room-pane/chat-input.tsx
                </code>{" "}
                – Input component that calls handleTyping on user input
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/constants/chat.constants.ts
                </code>{" "}
                – TYPING_TIMEOUT_MS constant (default: 3000ms)
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

