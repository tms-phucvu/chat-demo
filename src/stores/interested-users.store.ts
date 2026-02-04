import { create } from "zustand";
import { UserPresence } from "@/types/user.type";

interface InterestedUsersState {
  interestedIds: Set<string>;
  presences: Record<string, UserPresence>;
}
interface InterestedUsersActions {
  addIds: (uids: string[]) => void;
  updatePresence: (uid: string, data: UserPresence) => void;
  removeIds: (uids: string[]) => void;
  removePresence: (uids: string[]) => void;
  clearAll: () => void;
}
type InterestedUsersStore = InterestedUsersState & InterestedUsersActions;

export const useInterestedUsersStore = create<InterestedUsersStore>((set) => ({
  // --- Initial State ---
  interestedIds: new Set<string>(),
  presences: {},

  // --- Actions ---
  addIds: (uids) =>
    set((state) => {
      const newSet = new Set(state.interestedIds);
      let hasChanged = false;
      uids.forEach((id) => {
        if (id && !newSet.has(id)) {
          newSet.add(id);
          hasChanged = true;
        }
      });
      return hasChanged ? { interestedIds: newSet } : state;
    }),

  updatePresence: (uid, data) =>
    set((state) => ({
      presences: {
        ...state.presences,
        [uid]: data,
      },
    })),

  removeIds: (uids) =>
    set((state) => {
      const newSet = new Set(state.interestedIds);
      uids.forEach((id) => newSet.delete(id));
      return { interestedIds: newSet };
    }),

  removePresence: (uids) =>
    set((state) => {
      const nextPresences = { ...state.presences };
      let hasChanged = false;

      uids.forEach((id) => {
        if (nextPresences[id]) {
          delete nextPresences[id];
          hasChanged = true;
        }
      });

      return hasChanged ? { presences: nextPresences } : state;
    }),

  clearAll: () => set({ interestedIds: new Set(), presences: {} }),
}));
