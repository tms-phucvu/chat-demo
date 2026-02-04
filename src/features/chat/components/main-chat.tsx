"use client";

import { useIsTablet } from "@/hooks/use-device";
import { useTypingIndicator } from "@/features/chat/hooks/use-typing-indicator";
import { ChatRoomPane } from "@/features/chat/components/layout/chat-room-pane";
import { ChatSidebar } from "@/features/chat/components/layout/chat-sidebar";
import { SearchUserDialog } from "@/features/chat/components/dialog/search-user-dialog";
import { useState } from "react";

export default function MainChat() {
  const isTablet = useIsTablet();
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const { isTyping } = useTypingIndicator(activeRoomId);

  return (
    <>
      <div className="bg-muted/30 border-border grid h-full min-h-0 gap-4 rounded-xl border p-3 lg:grid-cols-[360px_minmax(0,1fr)] grid-cols-1">
        {isTablet ? (
          activeRoomId ? (
            <ChatRoomPane
              activeRoomId={activeRoomId}
              isTyping={isTyping}
              onBack={() => setActiveRoomId(null)}
            />
          ) : (
            <ChatSidebar
              activeRoomId={activeRoomId}
              onSelectRoom={setActiveRoomId}
            />
          )
        ) : (
          <>
            <ChatSidebar
              activeRoomId={activeRoomId}
              onSelectRoom={setActiveRoomId}
            />
            <ChatRoomPane activeRoomId={activeRoomId} isTyping={isTyping} />
          </>
        )}
      </div>
      <SearchUserDialog />
    </>
  );
}
