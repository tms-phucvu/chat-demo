import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarStatus } from '@/features/chat/components/avatar/avatar-status'
import { AvatarStatusType } from '@/features/chat/types/avatar-status.types'
import { getInitials } from '@/features/chat/utils/get-initials'

interface ChatUserAvatarProps {
  name: string
  avatarUrl?: string
  status?: AvatarStatusType
  fallback?: string
}

export const ChatUserAvatar = ({
  name,
  avatarUrl,
  status,
  fallback,
}: ChatUserAvatarProps) => {
  return (
    <div className='relative w-fit'>
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className='text-xs'>
          {fallback ?? getInitials(name)}
        </AvatarFallback>
      </Avatar>

      {status && <AvatarStatus status={status} />}
    </div>
  )
}
