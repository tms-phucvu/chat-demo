import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { user, profile, loading } = useAuthStore();
  return { user, profile, loading };
};
