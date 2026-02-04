import { UserInfo } from "@/types/user.type";
import { UserAvatar } from "@/features/chat/components/ui/user-avatar";

export default function UserPreview({ user }: { user: UserInfo }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <UserAvatar
        name={user.displayName ?? "Unknown"}
        avatarUrl={user.avatarURL ?? undefined}
      />

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">
          {user.displayName ?? "Unknown"}
        </span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  );
}
