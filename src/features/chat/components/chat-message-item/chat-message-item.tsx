import { cn } from "@/lib/utils";
import { formatDuration, formatTime } from "@/features/chat/utils/date.utils";
import { Message } from "@/features/chat/types/message.types";
import { useAuth } from "@/hooks/use-auth";
import { useUserInfo } from "@/features/chat/hooks/use-user-info";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";
import Image from "next/image";
import { Play } from "lucide-react";
import type { UploadMedia } from "@/types/cloudinary.types";
import { MediaView } from "@/features/chat/components/chat-message-item/media-view";
import { useState } from "react";

interface ChatMessageItemProps {
  message: Message;
  isInsideGroup: boolean;
}

export function ChatMessageItem({
  message,
  isInsideGroup,
}: ChatMessageItemProps) {
  const [activeMedia, setActiveMedia] = useState<UploadMedia | null>(null);

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
          "max-w-1/2 space-y-1",
          message.type === "media" && "w-1/2",
          message.type === "audio" && "max-w-4/5",
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
          {message.type === "audio" ? (
            <audio controls src={message.text} className=" rounded-lg"></audio>
          ) : (
            <p className="whitespace-pre-line wrap-anywhere">{message.text}</p>
          )}
          {message.type === "media" && message.attachments && (
            <div
              className={cn(
                "my-2",
                message.attachments.length > 1 &&
                  "grid grid-cols-1 sm:grid-cols-2 gap-3",
              )}
            >
              {message.attachments.map((media) => (
                <div
                  key={media.url}
                  onClick={() => setActiveMedia(media)}
                  className="relative aspect-8/5 overflow-hidden rounded-md hover:opacity-50 cursor-pointer"
                >
                  <Image
                    src={media.thumbnail}
                    fill
                    alt={media.thumbnail}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  {media.type === "video" && (
                    <>
                      <div className="absolute top-2 right-4 text-white drop-shadow-md">
                        {formatDuration(media.duration)}
                      </div>
                      <Play className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md" />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <p
          className={cn(
            "text-[10px] text-muted-foreground px-1",
            isMe ? "text-right" : "text-left",
          )}
        >
          {formatTime(message.createdAt)}
        </p>

        <MediaView media={activeMedia} onClose={() => setActiveMedia(null)} />
      </div>
    </div>
  );
}
