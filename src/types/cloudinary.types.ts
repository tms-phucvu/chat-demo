export type ResourceType = "image" | "video" | "raw";

export interface CloudinaryBaseResponse {
  secure_url: string;
  public_id: string;
  bytes: number;
  format: string;
  original_filename: string;
}

export interface CloudinaryImageResponse extends CloudinaryBaseResponse {
  width: number;
  height: number;
  eager?: {
    secure_url: string;
  }[];
}

export interface CloudinaryVideoResponse extends CloudinaryBaseResponse {
  duration: number;
}

export type UploadedMedia = {
  type: "image" | "video" | "file";
  url: string;
  thumbnail?: string;
};
