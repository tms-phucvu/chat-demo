export default function SystemDesignPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Architecture
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">System Design</h1>
          <p className="text-sm text-muted-foreground">
            This section explains the overall architecture of the chat template,
            how data flows between Firebase and the frontend, and the design
            decisions that make it scalable and cost-effective.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Architecture Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            The chat template follows a layered architecture that separates
            concerns between data persistence, business logic, and UI
            presentation. This design makes it easy to understand, maintain, and
            extend.
          </p>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Layer Structure</h3>
            <div className="mt-3 space-y-3">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-2">1. Firebase Layer</div>
                <p className="text-xs text-muted-foreground">
                  <strong>Realtime Database:</strong> Fast, ephemeral state
                  (presence, typing, room presence)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Firestore:</strong> Persistent data (users, rooms,
                  messages)
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-2">2. Service Layer</div>
                <p className="text-xs text-muted-foreground">
                  Thin wrappers around Firebase SDK that handle subscriptions,
                  writes, and data transformations. Located in{" "}
                  <code className="rounded bg-background px-1 py-0.5">
                    features/chat/services
                  </code>
                  .
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-2">3. Hook Layer</div>
                <p className="text-xs text-muted-foreground">
                  React hooks that connect services to components, manage
                  subscriptions lifecycle, and provide loading/error states.
                  Located in{" "}
                  <code className="rounded bg-background px-1 py-0.5">
                    features/chat/hooks
                  </code>
                  .
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-2">4. Component Layer</div>
                <p className="text-xs text-muted-foreground">
                  Presentational and container components that render the UI.
                  Located in{" "}
                  <code className="rounded bg-background px-1 py-0.5">
                    features/chat/components
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Data Flow Patterns
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Reading Data (Subscriptions)</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The template uses Firebase real-time listeners to keep the UI
              synchronized with the database:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">1.</span>
                <div>
                  <strong>Component mounts</strong> → calls a hook (e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    useRoomList
                  </code>
                  )
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">2.</span>
                <div>
                  <strong>Hook</strong> → calls a service function (e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    subscribeRoomsByUser
                  </code>
                  )
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">3.</span>
                <div>
                  <strong>Service</strong> → sets up Firebase listener (e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    onSnapshot
                  </code>
                  ) and returns unsubscribe function
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">4.</span>
                <div>
                  <strong>Data updates</strong> → Firebase calls callback →
                  hook updates state → component re-renders
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">5.</span>
                <div>
                  <strong>Component unmounts</strong> → hook cleanup calls
                  unsubscribe → listener removed
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Writing Data</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Writes are typically triggered by user actions and use Firebase
              batch operations when multiple documents need to be updated
              atomically:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">1.</span>
                <div>
                  <strong>User action</strong> → component calls hook (e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    useSendMessage
                  </code>
                  )
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">2.</span>
                <div>
                  <strong>Hook</strong> → calls service function (e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5">
                    sendMessage
                  </code>
                  )
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">3.</span>
                <div>
                  <strong>Service</strong> → creates Firestore batch → writes
                  message + updates room.lastMessage + increments unreadCounts →
                  commits batch
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-muted-foreground">4.</span>
                <div>
                  <strong>Firebase listeners</strong> → detect changes →
                  subscribers receive updates → UI updates automatically
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Design Decisions
          </h2>

          <div className="space-y-3">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">
                Why Realtime Database for Presence & Typing?
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Presence and typing indicators change very frequently (multiple
                times per second) and are ephemeral (they don&apos;t need to be
                stored long-term). Realtime Database is optimized for this use
                case:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>
                  Lower cost for high-frequency writes compared to Firestore
                </li>
                <li>
                  Built-in <code className="rounded bg-muted px-1 py-0.5">
                    onDisconnect
                  </code>{" "}
                  hooks for automatic cleanup
                </li>
                <li>Faster updates with lower latency</li>
                <li>No need for complex indexing or querying</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">
                Why Firestore for Messages & Rooms?
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Messages and rooms need to be persisted, queried, and indexed:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>
                  Complex queries (e.g. &quot;all rooms where I&apos;m a
                  participant, sorted by last message&quot;)
                </li>
                <li>Pagination support for large message histories</li>
                <li>Offline persistence and sync</li>
                <li>Better security rules for fine-grained access control</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">
                Denormalization Strategy
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                The template denormalizes some data to optimize read
                performance:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>
                  <code className="rounded bg-muted px-1 py-0.5">
                    rooms.lastMessage
                  </code>{" "}
                  – avoids querying messages collection just to show preview
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5">
                    rooms.participantsCount
                  </code>{" "}
                  – enables sorting without reading all participants
                </li>
                <li>
                  <code className="rounded bg-muted px-1 py-0.5">
                    rooms.unreadCounts
                  </code>{" "}
                  – per-user counters updated atomically with messages
                </li>
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Trade-off: These fields must be kept in sync when the source
                data changes (e.g. when sending a message, both the message and
                lastMessage are updated in a batch).
              </p>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">
                Subscription Management
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                All Firebase listeners are properly cleaned up to prevent memory
                leaks and unnecessary costs:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>
                  Hooks return cleanup functions that unsubscribe when components
                  unmount
                </li>
                <li>
                  Services return unsubscribe functions that can be called
                  explicitly
                </li>
                <li>
                  Presence sync tracks active subscriptions and removes unused
                  ones automatically
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Scalability Considerations
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">
              The template is designed to scale efficiently:
            </p>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong>Efficient queries:</strong> Room list uses{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  array-contains
                </code>{" "}
                on participants array, which is indexed by default in Firestore
              </li>
              <li>
                <strong>Sub-collections:</strong> Messages are stored as
                sub-collections under rooms, enabling efficient pagination and
                isolation
              </li>
              <li>
                <strong>Selective subscriptions:</strong> Only active rooms and
                visible users have active listeners
              </li>
              <li>
                <strong>Batch operations:</strong> Multiple writes are combined
                into single transactions to reduce costs
              </li>
              <li>
                <strong>Client-side filtering:</strong> User search and presence
                tracking happen on the client to reduce Firestore reads
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

