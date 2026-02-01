
import { UserProfile } from "@/types/user.type";
import { ChatUserAvatar } from "./chat-user-avatar";

export default function UserPreview({user}: {user: UserProfile}) {
  return (
    <div className="flex justify-center items-center gap-2">
      <ChatUserAvatar
        name={user.displayName ?? "Unnamed"}
        avatarUrl={user.avatarURL ?? undefined}
      />

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">
          {user.displayName ?? "Unnamed"}
        </span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  );
}
