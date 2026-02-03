import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarStatusType } from "@/features/chat/types/avatar-status.types";
import { getInitials } from "@/features/chat/utils/string.utils";
import { AVATAR_STATUS_STYLES } from "@/features/chat/constants/avatar-status.constants";

interface UserAvatarProps {
  name: string;
  avatarUrl?: string;
  status?: AvatarStatusType;
}

export const UserAvatar = ({
  name,
  avatarUrl,
  status,
}: UserAvatarProps) => {
  return (
    <Avatar size="lg">
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-xs">
        {getInitials(name)}
      </AvatarFallback>
      {status && <AvatarBadge className={AVATAR_STATUS_STYLES[status]} />}
    </Avatar>
  );
};
