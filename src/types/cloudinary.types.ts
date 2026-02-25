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

export interface UploadImage {
  type: "image";
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  size: number;
}

export interface UploadVideo {
  type: "video";
  url: string;
  thumbnail: string;
  duration: number;
  format: string;
  size: number;
}

export interface UploadFile {
  type: "file";
  url: string;
  name: string;
  format: string;
  size: number;
}

export type UploadMedia = UploadImage | UploadVideo;

export type UploadResult = UploadImage | UploadVideo | UploadFile;
