import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { ParticipantPreview } from "@/features/chat/types/room.types";
import { getInitials } from "@/features/chat/utils/string.utils";

interface GroupAvatarProps {
  participants: ParticipantPreview[];
  count: number;
}

export function GroupAvatar({ participants, count }: GroupAvatarProps) {
  return (
    <AvatarGroup className="grid grid-cols-2 -space-y-1">
      <Avatar className="col-span-2 mx-auto" size="sm">
        <AvatarImage
          src={participants[0]?.avatar ?? undefined}
          alt={participants[0]?.avatar ?? undefined}
        />
        <AvatarFallback>
          {getInitials(participants[0]?.avatar ?? "")}
        </AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarImage
          src={participants[1]?.avatar ?? undefined}
          alt={participants[1]?.avatar ?? undefined}
        />
        <AvatarFallback>
          {getInitials(participants[1]?.avatar ?? "")}
        </AvatarFallback>
      </Avatar>
      <AvatarGroupCount className="-ml-1">+{count}</AvatarGroupCount>
    </AvatarGroup>
  );
}
