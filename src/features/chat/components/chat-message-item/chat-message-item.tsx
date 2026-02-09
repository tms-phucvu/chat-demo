import { cn } from "@/lib/utils";
import { formatTime } from "@/features/chat/utils/date.utils";
import { Message } from "@/features/chat/types/message.types";
import { useAuth } from "@/hooks/use-auth";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";

interface ChatMessageItemProps {
  message: Message;
  isInsideGroup: boolean;
}

export function ChatMessageItem({
  message,
  isInsideGroup,
}: ChatMessageItemProps) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const isMe = message.senderId === uid;
  const { data: senderInfo, isLoading } = useUserInfo(message.senderId, {
    enabled: !isMe && !!message.senderId,
  });

  return (
    <div
      className={cn(
        "flex w-full mb-4 items-start gap-2",
        isMe ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isMe && (
        <div className="w-8 h-8 shrink-0">
          {isLoading || isInsideGroup ? (
            <div
              className={cn(
                "w-full h-full rounded-full bg-muted animate-pulse",
                isInsideGroup && "hidden",
              )}
            />
          ) : (
            <UserAvatar
              name={senderInfo?.displayName ?? "Unknown"}
              avatarUrl={senderInfo?.avatarURL ?? undefined}
              size="default"
            />
          )}
        </div>
      )}

      <div
        className={cn(
          "max-w-[60%] space-y-1",
          isMe ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm shadow-sm",
            isMe
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm",
          )}
        >
          <p className="whitespace-pre-line wrap-break-word">{message.text}</p>
        </div>
        <p
          className={cn(
            "text-[10px] text-muted-foreground px-1",
            isMe ? "text-right" : "text-left",
          )}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
