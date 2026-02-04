import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { getInitials } from "@/features/chat/utils/string.utils";
import { UserStatusType } from "@/types/user.type";
import { AVATAR_STATUS_STYLES } from "@/features/chat/constants/chat.constants";

interface UserAvatarProps {
  name: string;
  avatarUrl?: string;
  status?: UserStatusType;
}

export const UserAvatar = ({ name, avatarUrl, status }: UserAvatarProps) => {
  return (
    <Avatar size="lg">
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
      {status && <AvatarBadge className={AVATAR_STATUS_STYLES[status]} />}
    </Avatar>
  );
};
