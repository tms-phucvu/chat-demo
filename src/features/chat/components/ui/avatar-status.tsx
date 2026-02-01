import { cn } from '@/lib/utils'
import { AVATAR_STATUS_STYLES } from '@/features/chat/constants/avatar-status.constants'
import { AvatarStatusType } from '@/features/chat/types/avatar-status.types'

interface AvatarStatusProps {
  status: AvatarStatusType
  className?: string
}

export const AvatarStatus = ({ status, className }: AvatarStatusProps) => {
  return (
    <span
      className={cn(
        'border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2',
        AVATAR_STATUS_STYLES[status],
        className
      )}
    >
      <span className='sr-only'>{status}</span>
    </span>
  )
}
