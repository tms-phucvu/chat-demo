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
    title: "New Chat",
    desc: "Search for a user to start a private conversation.",
    buttonText: "Start Chat",
    minUsers: 1,
    maxUsers: 1,
  },
  CREATE_GROUP: {
    title: "Create New Group",
    desc: "Search and select at least 2 people to create a group chat.",
    buttonText: "Create Group",
    minUsers: 2,
    maxUsers: 50,
  },
  ADD_MEMBERS: {
    title: "Add Members",
    desc: "Select new people to add to this group.",
    buttonText: "Add to Group",
    minUsers: 1,
    maxUsers: 20,
  },
} as const;
