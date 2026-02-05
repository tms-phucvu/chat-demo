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
  size?: "lg" | "default" | "sm" | undefined;
}

export const UserAvatar = ({
  name,
  avatarUrl,
  status,
  size = "lg",
}: UserAvatarProps) => {
  return (
    <Avatar size={size}>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-xs">{getInitials(name)}</AvatarFallback>
      {status && <AvatarBadge className={AVATAR_STATUS_STYLES[status]} />}
    </Avatar>
  );
};
