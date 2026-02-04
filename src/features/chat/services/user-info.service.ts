import { getUserProfile } from "@/services/user-profile.service";
import { UserInfo } from "@/types/user.type";
import { toUserInfo } from "@/features/chat/utils/user.utils";

/**
 * =========================
 * Get user info by id
 * =========================
 */
export const getUserById = async (uid: string): Promise<UserInfo | null> => {
  const profile = await getUserProfile(uid);

  return profile ? toUserInfo(profile) : null;
};
