import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { AvatarStatusType } from "@/features/chat/types/avatar-status.types";
import { getInitials } from "@/features/chat/utils/string.utils";
import { AVATAR_STATUS_STYLES } from "@/features/chat/constants/avatar-status.constants";

interface AvatarUserProps {
  name: string;
  avatarUrl?: string;
  status?: AvatarStatusType;
  fallback?: string;
}

export const AvatarUser = ({
  name,
  avatarUrl,
  status,
  fallback,
}: AvatarUserProps) => {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className="text-xs">
        {fallback ?? getInitials(name)}
      </AvatarFallback>
      {status && <AvatarBadge className={AVATAR_STATUS_STYLES[status]} />}
    </Avatar>
  );
};
