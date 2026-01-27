export type ChatUser = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type ChatRoom = {
  id: string;
  title: string;
  participantIds: string[];
  unreadCount: number;
  lastMessagePreview?: string;
  lastMessageAt?: string;
};

export type ChatMessageBase = {
  id: string;
  roomId: string;
  createdAt: string;
};

export type ChatUserMessage = ChatMessageBase & {
  kind: "user";
  senderId: string;
  text: string;
};

export type ChatSystemMessage = ChatMessageBase & {
  kind: "system";
  text: string;
};

export type ChatMessage = ChatUserMessage | ChatSystemMessage;


