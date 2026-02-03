import { FieldValue, Timestamp } from "firebase/firestore";

export type UserStatusType = "online" | "offline";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailLowercase: string | null;
  avatarURL: string | null;
  createdAt: Timestamp | FieldValue;
}

export interface UserPresence {
  status: UserStatusType;
  updatedAt: number;
}
