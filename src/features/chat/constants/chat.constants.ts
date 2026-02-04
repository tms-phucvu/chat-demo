import { UserStatusType } from "@/types/user.type";

export const AVATAR_STATUS_STYLES: Record<UserStatusType, string> = {
  online: "bg-emerald-500",
  offline: "bg-gray-400",
};

export const SEARCH_DEBOUNCE_MS = 500;

export const CHAT_TYPING_MIN_MS = 800;
export const CHAT_TYPING_MAX_MS = 2200;
