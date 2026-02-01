import { create } from "zustand";

type SearchUserMode = "NEW_CHAT" | "CREATE_GROUP" | "ADD_TO_GROUP" | null;

type ChatDialogState = {
  isSearchUserOpen: boolean;
  searchUserMode: SearchUserMode;
  openSearchUser: (mode: SearchUserMode) => void;
  closeSearchUser: () => void;
};

export const useChatDialogStore = create<ChatDialogState>((set) => ({
  isSearchUserOpen: false,
  searchUserMode: null,

  openSearchUser: (mode) =>
    set({
      isSearchUserOpen: true,
      searchUserMode: mode,
    }),

  closeSearchUser: () =>
    set({
      isSearchUserOpen: false,
      searchUserMode: null,
    }),
}));
