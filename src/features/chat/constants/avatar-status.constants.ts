import { AvatarStatusType } from '@/features/chat/types/avatar-status.types'

export const AVATAR_STATUS_STYLES: Record<AvatarStatusType, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-destructive',
}
