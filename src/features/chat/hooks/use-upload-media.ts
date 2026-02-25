import { useState } from "react";
import {
  uploadImage,
  uploadVideo,
} from "@/features/chat/services/cloudinary.service";
import { UploadMedia } from "@/types/cloudinary.types";

export const useUploadMedia = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadMedia = async (
    file: File,
    roomId: string,
  ): Promise<UploadMedia> => {
    if (!roomId) throw new Error("Room ID is required");

    try {
      setIsUploading(true);
      setError(null);
      if (file.type.startsWith("image/")) {
        return await uploadImage(file, roomId);
      }
      if (file.type.startsWith("video/")) {
        return await uploadVideo(file, roomId);
      }
      throw new Error(
        "Unsupported media type. Please upload an image or video.",
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Media upload failed";
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadMedia, isUploading, error };
};
