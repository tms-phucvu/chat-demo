import { UploadMedia } from "@/types/cloudinary.types";
import { FieldValue, Timestamp } from "firebase/firestore";

export type MessageType = "text" | "system" | "media";

export interface LastMessage {
  text: string;
  senderId: string;
  createdAt: Timestamp | FieldValue;
  type: MessageType;
  attachments?: UploadMedia[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  type: MessageType;
  createdAt: Timestamp | FieldValue;
  attachments?: UploadMedia[];
}

export interface SendMessagePayload {
  text: string;
  senderId: string;
  type: MessageType;
  attachments?: UploadMedia[];
}

export type SendMessageBase = {
  roomId: string;
  unreadParticipants: string[];
};

export type SendMessageInput = SendMessagePayload & SendMessageBase;

export type SendMessageParams = SendMessageBase & {
  payload: SendMessagePayload;
};
