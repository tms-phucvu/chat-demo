import { FieldValue, Timestamp } from "firebase/firestore";

export type MessageType = "text" | "image" | "file" | "system";

export interface LastMessage {
  text: string;
  senderId: string;
  //senderName: string;
  createdAt: Timestamp | FieldValue;
  type: MessageType;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  type: MessageType;
  createdAt: Timestamp | FieldValue;
}
