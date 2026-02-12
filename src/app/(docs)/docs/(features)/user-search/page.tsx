export default function UserSearchPage() {
  return (
    <div className="h-[calc(100svh-4rem)] px-4 pb-4 overflow-y-auto">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 py-6">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Features
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            User Search & Invite Flow
          </h1>
          <p className="text-sm text-muted-foreground">
            The template includes a user search feature that allows users to
            find and invite others to chat rooms. This section explains how
            search works and how the invite flow is implemented.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Search Functionality
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">How It Works</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              User search is implemented via{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                searchUserByEmailSmart
              </code>{" "}
              from{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                user-search.service.ts
              </code>
              :
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Searches the{" "}
                <code className="rounded bg-muted px-1 py-0.5">users</code>{" "}
                collection in Firestore
              </li>
              <li>
                Uses Firestore query with{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  where(&quot;email&quot;, &quot;&gt;=&quot;, query)
                </code>{" "}
                and{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  where(&quot;email&quot;, &quot;&gt;=&quot;, query +
                  &quot;\uf8ff&quot;)
                </code>{" "}
                for prefix matching
              </li>
              <li>
                Limits results to a reasonable number (e.g., 10) to avoid
                excessive reads
              </li>
              <li>
                Returns user info including{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  displayName
                </code>
                ,{" "}
                <code className="rounded bg-muted px-1 py-0.5">avatarURL</code>,
                and <code className="rounded bg-muted px-1 py-0.5">email</code>
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Note: This is a simple prefix search. For more advanced search
              (full-text, fuzzy matching), you would need to integrate a search
              service like Algolia or Elasticsearch.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Debounced Search</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The search is debounced to avoid excessive Firestore queries while
              the user is typing:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Uses{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  SEARCH_DEBOUNCE_MS
                </code>{" "}
                constant (default: 300ms) from{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  chat.constants.ts
                </code>
              </li>
              <li>
                Search query is executed only after the user stops typing for
                the debounce duration
              </li>
              <li>
                Each keystroke resets the timer, so search only runs when the
                user pauses
              </li>
              <li>Empty queries return no results immediately (no API call)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Using the Search Hook
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">useUserSearch Hook</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              Components use{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                useUserSearch
              </code>{" "}
              hook to manage search state:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-[0.7rem] leading-relaxed">
              <code>
                {`const {
  query,
  loading,
  matchedUsers,
  handleSearchChange,
  clearQuery
} = useUserSearch(currentUid, selectedUsers);

// matchedUsers automatically excludes:
// - Current user
// - Already selected users`}
              </code>
            </pre>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">query</code> –
                Current search query string
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">loading</code> –
                Whether search is in progress
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  matchedUsers
                </code>{" "}
                – Filtered search results (excludes current user and already
                selected users)
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  handleSearchChange
                </code>{" "}
                – Callback to update search query (debounced internally)
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">clearQuery</code>{" "}
                – Clears search query and results
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Search User Dialog
          </h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">
              SearchUserDialog Component
            </h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The template includes a{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                SearchUserDialog
              </code>{" "}
              component that provides the full search and invite UI:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                Opens when user clicks &quot;Create Group&quot; or starts a new
                private chat
              </li>
              <li>
                Contains a search input that uses{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  useUserSearch
                </code>{" "}
                hook
              </li>
              <li>
                Displays search results as a list of user cards with avatar,
                name, and email
              </li>
              <li>
                Allows selecting multiple users (for group chats) or a single
                user (for private chats)
              </li>
              <li>
                Shows selected users in a preview section with ability to remove
                them
              </li>
              <li>
                Has &quot;Create&quot; button that triggers room creation with
                selected users
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">User Selector Component</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              The{" "}
              <code className="rounded bg-muted px-1 py-0.5">UserSelector</code>{" "}
              component handles the search input and results display:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>Renders a search input with loading indicator</li>
              <li>
                Shows &quot;No results&quot; message when search returns empty
              </li>
              <li>
                Displays user cards that can be clicked to select/deselect
              </li>
              <li>Highlights selected users visually</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Invite Flow</h2>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Creating Private Chat</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              When creating a private chat:
            </p>
            <ol className="space-y-1 text-xs text-muted-foreground list-decimal pl-5">
              <li>User searches for and selects a single user</li>
              <li>Clicks &quot;Create&quot; button</li>
              <li>
                System calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  ensureCreatePrivateChat(currentUid, recipientUid)
                </code>
              </li>
              <li>
                If a private room already exists between these users, it opens
                that room
              </li>
              <li>
                If no room exists, creates a new private room and opens it
              </li>
            </ol>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-semibold">Creating Group Chat</h3>
            <p className="mt-1 text-xs text-muted-foreground mb-3">
              When creating a group chat:
            </p>
            <ol className="space-y-1 text-xs text-muted-foreground list-decimal pl-5">
              <li>User searches for and selects multiple users (minimum 1)</li>
              <li>Optionally enters a group name</li>
              <li>Clicks &quot;Create&quot; button</li>
              <li>
                System calls{" "}
                <code className="rounded bg-muted px-1 py-0.5">
                  createGroupChat(creatorUid, participantUids, groupName,
                  groupAvatarURL)
                </code>
              </li>
              <li>Creates a new group room with all selected participants</li>
              <li>Creates a system message: &quot;created the group&quot;</li>
              <li>Opens the newly created group room</li>
            </ol>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            State Management
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              The search dialog state is managed via{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                dialog.store.ts
              </code>
              :
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-5">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">isOpen</code> –
                Whether the dialog is visible
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  selectedUsers
                </code>{" "}
                – Array of selected user objects
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">roomType</code> –
                &quot;private&quot; or &quot;group&quot; (determines if single
                or multiple selection)
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              The store provides actions to open/close the dialog, add/remove
              selected users, and reset state.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Implementation Details
          </h2>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-3">
              Key files for user search:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/services/user-search.service.ts
                </code>{" "}
                – searchUserByEmailSmart function
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/hooks/use-user-search.ts
                </code>{" "}
                – React hook for managing search state
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/dialog/search-user-dialog.tsx
                </code>{" "}
                – Main dialog component
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/dialog/user-selector.tsx
                </code>{" "}
                – Search input and results display
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/components/dialog/selected-user-preview.tsx
                </code>{" "}
                – Preview of selected users
              </li>
              <li>
                <code className="rounded bg-muted px-1 py-0.5">
                  features/chat/stores/dialog.store.ts
                </code>{" "}
                – Zustand store for dialog state
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
