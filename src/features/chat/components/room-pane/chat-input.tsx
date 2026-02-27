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
import { CompletionRequestOptions } from "ai";
import { ID_AMIN_AI } from "@/constants/ai.constant";
import { useVoiceRecorder } from "@/features/chat/hooks/use-voice-recorder";
import { VoiceRecordingControls } from "@/features/chat/components/chat-input/voice-recording-controls";
import { useUploadFile } from "@/features/chat/hooks/use-upload-file";

type ChatInputProps = {
  room: ChatRoom | null;
  activeRoomId: string | null;
  usersInRoom: string[];
  disabled?: boolean;
  isAI: boolean;
  sendToAI: (
    prompt: string,
    options?: CompletionRequestOptions | undefined,
  ) => Promise<string | null | undefined>;
};

export function ChatInput({
  room,
  activeRoomId,
  usersInRoom,
  disabled,
  isAI,
  sendToAI,
}: ChatInputProps) {
  const t = useTranslations("chat.roomPane.chatInput");
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [value, setValue] = useState("");
  const { send, isSending } = useSendMessage();
  const { uploadMedia, isUploadingMedia } = useUploadMedia();
  const [uploadedMedia, setUploadedMedia] = useState<UploadMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isRecording,
    isPaused,
    seconds,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  } = useVoiceRecorder();
  const { uploadRawFile: uploadAudio, isUploading: isUploadingAudio } =
    useUploadFile();

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

  const handleEmojiSelect = (emoji: string) => {
    setValue((prev) => prev + emoji);
  };

  // ----- Handle Media -----
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

  // ----- Handle Send Message -----
  const handleSendAudio = async ({
    uid,
    activeRoomId,
  }: {
    uid: string;
    activeRoomId: string;
  }) => {
    if (isAI) {
      toast.info(t("ai.voiceNotSupported"));
      return;
    }
    const blob = await stopRecording();
    if (!blob) return;

    const file = new File([blob], "voice-message.webm", {
      type: "audio/webm",
    });

    try {
      const result = await uploadAudio(file, activeRoomId);
      await send({
        roomId: activeRoomId,
        type: "audio",
        text: result.url,
        senderId: uid,
        unreadParticipants: unreadParticipants,
      });
    } catch {
      toast.error("Upload audio failed");
    }
  };

  const handleSendMedia = async ({
    uid,
    activeRoomId,
  }: {
    uid: string;
    activeRoomId: string;
  }) => {
    if (isAI) {
      toast.info(t("ai.mediaNotSupported"));
      return;
    }
    await send({
      roomId: activeRoomId,
      type: "media",
      text: value.trim() || "",
      senderId: uid,
      unreadParticipants: unreadParticipants,
      attachments: uploadedMedia,
    });
    setUploadedMedia([]);
  };

  const handleSendText = async ({
    uid,
    activeRoomId,
  }: {
    uid: string;
    activeRoomId: string;
  }) => {
    if (!value.trim()) return;
    await send({
      roomId: activeRoomId,
      type: "text",
      text: value,
      senderId: uid,
      unreadParticipants: unreadParticipants,
    });
    setValue("");
    if (isAI) {
      const result = await sendToAI(value);
      if (!result) {
        toast.error(t("ai.responseFailed"));
        return;
      }
      await send({
        roomId: activeRoomId,
        type: "text",
        text: result,
        senderId: ID_AMIN_AI,
        unreadParticipants: unreadParticipants,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeRoomId || !uid) return;

    if (isRecording) {
      //Voice message
      await handleSendAudio({ uid, activeRoomId });
    } else if (uploadedMedia.length > 0) {
      //Media message
      await handleSendMedia({ uid, activeRoomId });
    } else {
      //Text message
      await handleSendText({ uid, activeRoomId });
    }
    clearTyping(activeRoomId, uid);
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
        isUploading={isUploadingMedia}
        maxItems={MAX_ALLOWED}
      />

      <VoiceRecordingControls
        isRecording={isRecording}
        isUploading={isUploadingAudio}
        seconds={seconds}
        isPaused={isPaused}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={async () => {
          const blob = await stopRecording();
          if (!blob) return;
        }}
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
            disabled={disabled || isSending || isRecording}
            className="p-5 pr-30"
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            <EmojiPickerPopover
              disabled={isRecording}
              onChange={handleEmojiSelect}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full hover:bg-gray-300"
              onClick={handleImagePlusClick}
              disabled={isUploadingMedia || isRecording}
            >
              <ImagePlus size={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-full hover:bg-gray-300"
              onClick={async () => {
                await startRecording();
              }}
              disabled={
                isRecording || isUploadingMedia || uploadedMedia.length > 0
              }
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
          disabled={
            disabled ||
            isSending ||
            (!value.trim() && uploadedMedia.length === 0 && !isRecording)
          }
          className="py-5 aspect-square"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
}
