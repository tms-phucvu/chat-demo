import { FieldValue, Timestamp } from "firebase/firestore";

export type MessageType = "text" | "system";

export interface LastMessage {
  text: string;
  senderId: string;
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

export interface SendMessagePayload {
  text: string;
  senderId: string;
  type?: MessageType;
}

export type SendMessageBase = {
  roomId: string;
  unreadParticipants: string[];
};

export type SendMessageInput = SendMessagePayload & SendMessageBase;

export type SendMessageParams = SendMessageBase & {
  payload: SendMessagePayload;
};
