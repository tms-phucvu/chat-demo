import { UserStatusType } from "@/types/user.type";

export const AVATAR_STATUS_STYLES: Record<UserStatusType, string> = {
  online: "bg-emerald-500",
  offline: "bg-gray-400",
};

export const TYPING_TIMEOUT_MS = 3000;
export const MESSAGE_TIME_GAP_LIMIT = 3 * 60 * 1000;

export const SEARCH_DEBOUNCE_MS = 500;
export const DIALOG_MODE_CONFIG = {
  NEW_CHAT: {
    i18nKey: "chat.dialog.newChat",
    minUsers: 1,
    maxUsers: 1,
  },
  CREATE_GROUP: {
    i18nKey: "chat.dialog.createGroup",
    minUsers: 2,
    maxUsers: 50,
  },
} as const;
