import { getUserById } from "@/features/chat/services/user-info.service";
import { useQueries } from "@tanstack/react-query";

export function useParticipants(participantIds: string[]) {
  const queries = useQueries({
    queries: participantIds.map((uid) => ({
      queryKey: ["user-info", uid],
      queryFn: () => getUserById(uid),
      enabled: !!uid,
      staleTime: 1000 * 60 * 5,
    })),
  });

  return {
    participants: queries.map((q) => q.data).filter(Boolean),
    isLoading: queries.some((q) => q.isLoading),
  };
}
