import { useState } from "react";
import {
  uploadImage,
  uploadVideo,
  uploadFile,
} from "@/features/chat/services/cloudinary.service";

type UploadResult =
  | Awaited<ReturnType<typeof uploadImage>>
  | Awaited<ReturnType<typeof uploadVideo>>
  | Awaited<ReturnType<typeof uploadFile>>;

export const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, roomId: string): Promise<UploadResult> => {
    if (!roomId) {
      throw new Error("Room ID is required to upload file");
    }
    try {
      setIsUploading(true);
      setError(null);

      if (file.type.startsWith("image/")) {
        return await uploadImage(file, roomId);
      }

      if (file.type.startsWith("video/")) {
        return await uploadVideo(file, roomId);
      }

      return await uploadFile(file, roomId);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    error,
  };
};
