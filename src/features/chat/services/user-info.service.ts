import { toUserInfo } from "@/lib/user.utils";
import { getUserProfile } from "@/services/user-profile.service";
import { UserInfo } from "@/types/user.type";

/**
 * =========================
 * Get user info by id
 * =========================
 */
export const getUserById = async (uid: string): Promise<UserInfo | null> => {
  const profile = await getUserProfile(uid);

  return profile ? toUserInfo(profile) : null;
};
