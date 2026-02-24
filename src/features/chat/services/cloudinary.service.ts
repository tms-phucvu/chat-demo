import { CLOUDINARY_CONFIG } from "@/lib/cloudinary.config";
import {
  ResourceType,
  CloudinaryBaseResponse,
  CloudinaryImageResponse,
  CloudinaryVideoResponse,
} from "@/types/cloudinary.types";
import { getThumbnailUrl } from "@/features/chat/utils/string.utils";

/**
 * Core upload request
 */
const uploadRequest = async <T>(
  file: File,
  resourceType: ResourceType,
  preset: string,
  folderPath?: string,
): Promise<T> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);
  if (folderPath) {
    formData.append("folder", folderPath);
  }

  const response = await fetch(
    `${CLOUDINARY_CONFIG.baseUrl}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error?.message || "Upload failed");
  }

  return response.json();
};

/**
 * Image Upload
 */
export const uploadImage = async (file: File, roomId: string) => {
  const data = await uploadRequest<CloudinaryImageResponse>(
    file,
    "image",
    CLOUDINARY_CONFIG.presets.image,
    `${CLOUDINARY_CONFIG.folders.media}/${roomId}`,
  );

  return {
    type: "image" as const,
    url: data.secure_url,
    thumbnail: getThumbnailUrl(data.secure_url),
    width: data.width,
    height: data.height,
    size: data.bytes,
  };
};

/**
 * Video Upload
 */
export const uploadVideo = async (file: File, roomId: string) => {
  const data = await uploadRequest<CloudinaryVideoResponse>(
    file,
    "video",
    CLOUDINARY_CONFIG.presets.video,
    `${CLOUDINARY_CONFIG.folders.media}/${roomId}`,
  );

  const thumbnail = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/so_1/${data.public_id}.jpg`;

  return {
    type: "video" as const,
    url: data.secure_url,
    thumbnail: getThumbnailUrl(thumbnail),
    duration: data.duration,
    format: data.format,
    size: data.bytes,
  };
};

/**
 * Raw / File Upload (audio, pdf, docx...)
 */
export const uploadFile = async (file: File, roomId: string) => {
  const data = await uploadRequest<CloudinaryBaseResponse>(
    file,
    "raw",
    CLOUDINARY_CONFIG.presets.raw,
    `${CLOUDINARY_CONFIG.folders.files}/${roomId}`,
  );

  return {
    type: "file" as const,
    url: data.secure_url,
    name: data.original_filename,
    format: data.format,
    size: data.bytes,
  };
};
