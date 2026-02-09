import { Loader2 } from "lucide-react";

export default function LoadingRoomSelected() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Loading conversation...</p>
    </div>
  );
}
