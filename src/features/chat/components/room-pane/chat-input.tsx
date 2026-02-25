"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "@/features/chat/hooks/use-send-message";
import { useAuth } from "@/hooks/use-auth";
import {
  clearTyping,
  handleTyping,
} from "@/features/chat/services/typing.service";
import { ChatRoom } from "@/features/chat/types/room.types";
import { useTranslations } from "next-intl";
import { ImagePlus, Mic, Send } from "lucide-react";
import EmojiPickerPopover from "@/features/chat/components/chat-input/emoji-picker-popover";
import { MediaPreview } from "@/features/chat/components/chat-input/media-preview";
import { UploadMedia } from "@/types/cloudinary.types";
import { toast } from "sonner";
import {
  MAX_ALLOWED,
  MAX_IMG,
  MAX_VID,
} from "@/features/chat/constants/chat.constants";
import { useUploadMedia } from "@/features/chat/hooks/use-upload-media";

type ChatInputProps = {
  room: ChatRoom | null;
  activeRoomId: string | null;
  usersInRoom: string[];
  disabled?: boolean;
};

export function ChatInput({
  room,
  activeRoomId,
  usersInRoom,
  disabled,
}: ChatInputProps) {
  const t = useTranslations("chat.roomPane.chatInput");
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [value, setValue] = useState("");
  const { send, isSending } = useSendMessage();
  const { uploadMedia, isUploading } = useUploadMedia();
  const [uploadedMedia, setUploadedMedia] = useState<UploadMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const unreadParticipants = (room?.participants ?? []).filter(
    (participantId) =>
      participantId !== uid && !usersInRoom.includes(participantId),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);

    if (activeRoomId && uid && val.trim()) {
      handleTyping(activeRoomId, uid);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim() || !activeRoomId || !uid) return;

    if (uploadedMedia.length > 0) {
      await send({
        roomId: activeRoomId,
        type: "media",
        text: value,
        senderId: uid,
        unreadParticipants: unreadParticipants,
        attachments: uploadedMedia,
      });
    } else {
      await send({
        roomId: activeRoomId,
        type: "text",
        text: value,
        senderId: uid,
        unreadParticipants: unreadParticipants,
      });
    }
    setValue("");
    setUploadedMedia([]);
    clearTyping(activeRoomId, uid);
  };

  const handleEmojiSelect = (emoji: string) => {
    setValue((prev) => prev + emoji);
  };

  const handleImagePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !activeRoomId) return;

    const currentCount = uploadedMedia.length;
    const newFiles = Array.from(e.target.files);

    if (currentCount + newFiles.length > MAX_ALLOWED) {
      toast.error(t("maxMediaReached", { max: MAX_ALLOWED }));
      return;
    }

    newFiles.forEach(async (file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        toast.error(t("invalidFileType", { fileName: file.name }));
        return;
      }

      const maxSize = isImage ? MAX_IMG : MAX_VID;
      const limitText = isImage ? "300KB" : "5MB";
      if (file.size > maxSize) {
        toast.error(
          t("fileTooLarge", {
            fileName: file.name,
            limit: limitText,
          }),
        );
        return;
      }

      try {
        const result = await uploadMedia(file, activeRoomId);
        setUploadedMedia((prev) => [...prev, result]);
      } catch {
        toast.error(t("uploadFailed", { fileName: file.name }));
      }
    });

    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    setUploadedMedia((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      if (activeRoomId && uid) {
        clearTyping(activeRoomId, uid);
      }
    };
  }, [activeRoomId, uid]);

  return (
    <div>
      <MediaPreview
        mediaItems={uploadedMedia}
        onRemove={removeMedia}
        onAddMore={handleImagePlusClick}
        isUploading={isUploading}
        maxItems={MAX_ALLOWED}
      />

      <form
        onSubmit={handleSubmit}
        className="border-border bg-background/80 flex items-center gap-2 border-t px-4 py-3"
      >
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={handleChange}
            placeholder={t("placeholder")}
            disabled={disabled || isSending}
            className="p-5 pr-30"
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            <EmojiPickerPopover onChange={handleEmojiSelect} />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full hover:bg-gray-300"
              onClick={handleImagePlusClick}
              disabled={isUploading}
            >
              <ImagePlus size={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full hover:bg-gray-300"
            >
              <Mic size={18} />
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          type="submit"
          size="sm"
          disabled={disabled || isSending || !value.trim()}
          className="py-5 aspect-square"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
