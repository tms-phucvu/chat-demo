import { useState } from "react";
import {
  uploadImage,
  uploadVideo,
} from "@/features/chat/services/cloudinary.service";
import { UploadMedia } from "@/types/cloudinary.types";

export const useUploadMedia = () => {
  const [uploadCount, setUploadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isUploadingMedia = uploadCount > 0;

  const uploadMedia = async (
    file: File,
    roomId: string,
  ): Promise<UploadMedia> => {
    if (!roomId) throw new Error("Room ID is required");

    setUploadCount((prev) => prev + 1);
    try {
      setError(null);
      if (file.type.startsWith("image/")) {
        return await uploadImage(file, roomId);
      }
      if (file.type.startsWith("video/")) {
        return await uploadVideo(file, roomId);
      }
      throw new Error("Unsupported media type...");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw err;
    } finally {
      setUploadCount((prev) => Math.max(0, prev - 1));
    }
  };

  return { uploadMedia, isUploadingMedia, error };
};
