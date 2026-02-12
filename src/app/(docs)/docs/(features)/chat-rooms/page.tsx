export default function ChatRoomsPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Chat Rooms</h1>
          <p className="text-sm text-muted-foreground">
            The template supports both private (1-on-1) and group chat rooms.
            This section explains how rooms are created, managed, and displayed
            in the UI.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Room Types
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Private Rooms</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                One-on-one conversations between two users. The template
                automatically finds existing private rooms or creates new ones
                when needed.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>Always has exactly 2 participants</li>
                <li>No group name or avatar</li>
                <li>Created automatically when starting a chat</li>
                <li>Display shows the other user&apos;s name and avatar</li>
              </ul>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Group Rooms</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Multi-user conversations that can have a custom name and avatar.
                Created explicitly by users.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
                <li>Can have 2+ participants</li>
                <li>Optional group name and avatar</li>
                <li>Created via the &quot;Create Group&quot; button</li>
                <li>Shows group avatar or initials of participants</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Creating Rooms
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Private Room Creation</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              When a user wants to start a private chat, the template uses{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                ensureCreatePrivateChat
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                room.service.ts
              </code>
              :
            </p>
            <ol className="space-y-2 text-xs text-muted-foreground list-decimal pl-5">
              <li>
                Searches for an existing private room between the two users using{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  getPrivateChatByUserIds
                </code>
              </li>
              <li>
                If found, returns the existing room ID (prevents duplicate
                rooms)
              </li>
              <li>
                If not found, creates a new room with{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  createPrivateChat
                </code>
                , initializing:
                <ul className="mt-1 list-disc pl-5">
                  <li>
                    <code className="rounded bg-muted px-1 py-0.5">
                      type: &quot;private&quot;
                    </code>
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 py-0.5">
                      participants: [uid1, uid2]
                    </code>
                  </li>
                  <li>
                    <code className="rounded bg-muted px-1 py-0.5">
                      unreadCounts: {`{ [uid1]: 0, [uid2]: 0 }`}
                    </code>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Group Room Creation</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Group rooms are created via{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                createGroupChat
              </code>{" "}
              which:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Accepts creator UID, participant UIDs, optional group name and
                avatar URL
              </li>
              <li>
                Ensures the creator is included in participants (deduplicates
                array)
              </li>
              <li>
                Initializes unread counts: 0 for creator, 1 for others (they
                haven&apos;t seen the creation message)
              </li>
              <li>
                Creates a system message: &quot;created the group&quot; as the
                initial lastMessage
              </li>
              <li>
                Sets{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  type: &quot;group&quot;
                </code>{" "}
                and optional group metadata
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Room List Display
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Querying User&apos;s Rooms</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The room list sidebar uses{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                subscribeRoomsByUser
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                rooms.service.ts
              </code>{" "}
              to show all rooms where the current user is a participant:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`query(
  collection(db, "rooms"),
  where("participants", "array-contains", currentUid),
  orderBy("lastMessage.createdAt", "desc")
)`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              This query requires a Firestore composite index on{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                participants
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                lastMessage.createdAt
              </code>
              . Firebase will prompt you to create it on first use.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Room List Item Rendering</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Each room in the list is rendered by{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                ChatRoomItem
              </code>{" "}
              which conditionally renders:
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <strong>Private rooms:</strong>{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  PrivateRoomItem
                </code>{" "}
                – shows the other user&apos;s avatar and name
              </li>
              <li>
                <strong>Group rooms:</strong>{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  GroupRoomItem
                </code>{" "}
                – shows group avatar (or initials) and group name
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Both show the last message preview, unread count badge, and
              timestamp. The active room is highlighted based on state from{" "}
              <code className="rounded bg-muted px-1 py-0.5">chat.store.ts</code>
              .
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Room Data Structure
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Every room document in Firestore has this structure:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`rooms/{roomId} {
  type: "private" | "group";
  groupName?: string | null;        // only for groups
  groupAvatarURL?: string | null;   // only for groups
  
  participants: string[];           // array of UIDs
  participantsCount: number;        // denormalized count
  
  unreadCounts: {                   // per-user counters
    [uid: string]: number;
  };
  
  createdBy: string;                // UID of creator
  createdAt: Timestamp;
  
  lastMessage: {                    // denormalized preview
    text: string;
    senderId: string;
    createdAt: Timestamp;
    type: "text" | "system";
  } | null;
}`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              See{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                features/chat/types/room.types.ts
              </code>{" "}
              for the TypeScript definitions.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Implementation Hooks
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              The template provides these hooks for working with rooms:
            </p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  useRoomList()
                </code>{" "}
                – subscribes to all rooms for the current user, returns{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  {`{ rooms, isLoading, error }`}
                </code>
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  useRoom(roomId)
                </code>{" "}
                – subscribes to a specific room document, returns{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  {`{ room, isLoading, error }`}
                </code>
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  useParticipants(roomId)
                </code>{" "}
                – fetches user info for all participants in a room
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

