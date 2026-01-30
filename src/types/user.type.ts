import { FieldValue, Timestamp } from "firebase/firestore";

export type UserStatusType = "online" | "offline";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  avatarURL: string | null;
  createdAt: Timestamp | FieldValue;
}
