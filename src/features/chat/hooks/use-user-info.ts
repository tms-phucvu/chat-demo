import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "@/types/user.type";
import { getUserById } from "@/features/chat/services/user-info.service";

export function useUserInfo(uid?: string) {
  return useQuery<UserInfo | null>({
    queryKey: ["user-info", uid],
    queryFn: () => getUserById(uid!),
    enabled: !!uid,
    staleTime: 1000 * 60 * 5,
  });
}
