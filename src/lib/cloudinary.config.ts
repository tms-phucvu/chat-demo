export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  baseUrl: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
  presets: {
    image: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PRESET!,
    video: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_PRESET!,
    raw: process.env.NEXT_PUBLIC_CLOUDINARY_FILE_PRESET!,
  },
  folders: {
    media: "chat_demo/chat_media",
    files: "chat_demo/chat_file",
  },
};
