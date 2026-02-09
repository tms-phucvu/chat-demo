"use client";

import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import { GroupAvatar } from "@/features/chat/components/ui/group-avatar";
import { ParticipantPreview } from "@/features/chat/types/room.types";

type TypingIndicatorProps = {
  typingUserPreviews: ParticipantPreview[];
};

export default function TypingIndicator({
  typingUserPreviews,
}: TypingIndicatorProps) {
  return (
    <div className="flex items-end justify-start gap-2 mb-4">
      {typingUserPreviews.length > 1 ? (
        <GroupAvatar
          participants={typingUserPreviews}
          count={typingUserPreviews.length - 2}
          variant="row"
        />
      ) : (
        <UserAvatar
          name={typingUserPreviews[0].name ?? "Unknown"}
          avatarUrl={typingUserPreviews[0].avatar ?? undefined}
          size="default"
        />
      )}

      <div className="bg-muted text-muted-foreground flex items-center rounded-2xl rounded-bl-none px-3 py-2 shadow-sm">
        <span className="flex gap-1 items-center h-4">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60" />
        </span>
      </div>
    </div>
  );
}
