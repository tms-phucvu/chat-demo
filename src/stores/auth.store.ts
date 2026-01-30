import { create } from "zustand";
import { User } from "firebase/auth";
import { UserProfile } from "@/types/user.type";

type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setAuth: (user: User | null, profile: UserProfile | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,

  setAuth: (user, profile) =>
    set({
      user,
      profile,
      loading: false,
    }),

  clearAuth: () =>
    set({
      user: null,
      profile: null,
      loading: false,
    }),
}));
