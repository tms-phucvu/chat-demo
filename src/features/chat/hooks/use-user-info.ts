import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "@/types/user.type";
import { getUserById } from "@/features/chat/services/user-info.service";

type UseUserInfoOptions = {
  enabled?: boolean;
};

export function useUserInfo(uid?: string, option?: UseUserInfoOptions) {
  return useQuery<UserInfo | null>({
    queryKey: ["user-info", uid],
    queryFn: () => getUserById(uid!),
    enabled: !!uid && option?.enabled,
    staleTime: 1000 * 60 * 5,
  });
}
