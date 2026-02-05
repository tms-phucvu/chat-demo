import { create } from "zustand";

interface ChatStore {
  activeRoomId: string | null;
  setActiveRoomId: (id: string | null) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeRoomId: null,
  setActiveRoomId: (id) => set({ activeRoomId: id }),
  resetChat: () => set({ activeRoomId: null }),
}));
