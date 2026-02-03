import { UserStatusType } from "@/types/user.type";

export const AVATAR_STATUS_STYLES: Record<UserStatusType, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
}
