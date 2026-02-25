import { useState } from "react";
import { uploadFile } from "@/features/chat/services/cloudinary.service";
import { UploadFile } from "@/types/cloudinary.types";

export const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadRawFile = async (
    file: File,
    roomId: string,
  ): Promise<UploadFile> => {
    if (!roomId) throw new Error("Room ID is required");

    try {
      setIsUploading(true);
      setError(null);

      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        throw new Error("Image or video are not allowed");
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

  return { uploadRawFile, isUploading, error };
};
