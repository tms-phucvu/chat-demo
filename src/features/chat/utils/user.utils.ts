import { UserInfo, UserProfile } from "@/types/user.type";

/**
 * =========================
 * Convert UserProfile to UserInfo
 * =========================
 */
export function toUserInfo(user: UserProfile): UserInfo {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailLowercase: user.emailLowercase,
    avatarURL: user.avatarURL,
  };
}
