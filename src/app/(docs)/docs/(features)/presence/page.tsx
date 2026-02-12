export default function PresencePage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Online Presence & In-Room Presence
          </h1>
          <p className="text-sm text-muted-foreground">
            The template tracks two types of presence: global online/offline
            status for all users, and per-room presence to know who is currently
            viewing a specific room. Both use Firebase Realtime Database for
            fast, real-time updates.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Global Online Presence
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">How It Works</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Each signed-in user has a presence node in Realtime Database that
              tracks their online/offline status:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`presence/{uid} {
  status: "online" | "offline";
  updatedAt: ServerTimestamp;
}`}
              </code>
            </pre>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                When a user signs in,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  setupPresence(uid)
                </code>{" "}
                is called (via{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  PresenceSyncProvider
                </code>
                )
              </li>
              <li>
                Uses Firebase&apos;s{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  .info/connected
                </code>{" "}
                to detect connection state
              </li>
              <li>
                When connected, sets status to{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  "online"
                </code>
              </li>
              <li>
                Uses{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  onDisconnect
                </code>{" "}
                hook to automatically set status to{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  "offline"
                </code>{" "}
                when connection drops
              </li>
              <li>
                When user signs out,{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  offlinePresence
                </code>{" "}
                is called explicitly
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Subscribing to User Presence</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              To track other users&apos; presence, use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                subscribeToUserPresence
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                presence.service.ts
              </code>
              :
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`subscribeToUserPresence(uid, (presence) => {
  console.log(presence.status); // "online" | "offline"
  console.log(presence.updatedAt);
});`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The template uses{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                usePresenceSync
              </code>{" "}
              hook to automatically subscribe to presence for users you&apos;re
              interested in (e.g., participants in your active rooms). It
              manages subscriptions efficiently, adding new ones and removing
              unused ones.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            In-Room Presence
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">How It Works</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Room presence tracks which users are currently viewing a specific
              room. This is used to:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>Exclude active viewers from unread count increments</li>
              <li>Show who is currently in the room (optional UI feature)</li>
              <li>Optimize message delivery (future: only notify users not in room)</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground mb-3">
              Stored in Realtime Database:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`room_presence/{roomId}/{uid}: true`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The value is simply{" "}
              <code className="rounded bg-muted px-1 py-0.5">true</code> when
              the user is in the room, and the node is removed when they leave.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Entering and Leaving Rooms</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useRoomPresence
              </code>{" "}
              hook automatically manages room presence:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <strong>On mount:</strong> Calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  enterRoom(uid, roomId)
                </code>{" "}
                to add the user to room presence
              </li>
              <li>
                <strong>On mount:</strong> Also calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  resetUnreadCount(uid, roomId)
                </code>{" "}
                to mark messages as read
              </li>
              <li>
                <strong>On unmount:</strong> Calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  leaveRoom(uid, roomId)
                </code>{" "}
                to remove the user from room presence
              </li>
              <li>
                <strong>Uses onDisconnect:</strong> If connection drops while in
                a room, the user is automatically removed from room presence
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Subscribing to Room Presence</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              To see who is currently in a room, use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                subscribeToRoomPresence
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                room-presence.service.ts
              </code>
              :
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`subscribeToRoomPresence(roomId, (participantIds) => {
  console.log("Users in room:", participantIds);
  // ["uid1", "uid2", "uid3"]
});`}
              </code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useRoomPresence
              </code>{" "}
              hook returns{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                {`{ usersInRoom }`}
              </code>{" "}
              which is an array of UIDs currently viewing the room.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Integration with Unread Counts
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Room presence is used when sending messages to determine which
              users should have their unread count incremented:
            </p>
            <ol className="space-y-1 text-xs text-muted-foreground list-decimal pl-5">
              <li>
                When a message is sent, the service checks room presence for
                that room
              </li>
              <li>
                Users currently in the room (via room presence) are excluded
                from unread count increments
              </li>
              <li>
                Only users not in the room and not the sender get their count
                incremented
              </li>
            </ol>
            <p className="mt-2 text-xs text-muted-foreground">
              This ensures users actively viewing a room don&apos;t get unread
              badges for messages they can already see.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Implementation Details
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Key files for presence:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  services/presence.service.ts
                </code>{" "}
                – setupPresence, subscribeToUserPresence, offlinePresence
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/services/room-presence.service.ts
                </code>{" "}
                – enterRoom, leaveRoom, subscribeToRoomPresence
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  hooks/use-presence-sync.ts
                </code>{" "}
                – Hook that manages subscriptions to user presence for
                interested users
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/hooks/use-room-presence.ts
                </code>{" "}
                – Hook that manages room presence for the active room
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  providers/presence-sync-provider.tsx
                </code>{" "}
                – Provider that sets up global presence on sign-in
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

