import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorRoomListProps {
  error?: Error | null;
  onRetry?: () => void;
}

export default function ErrorRoomList({ error, onRetry }: ErrorRoomListProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
      <div className="mb-2 rounded-full bg-destructive/10 p-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <p className="text-sm font-medium text-foreground">Failed to load chats</p>
      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
        {error?.message || "Check your connection and try again."}
      </p>
      
      {onRetry && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRetry}
          className="mt-3 h-7 text-xs hover:bg-destructive/5 hover:text-destructive transition-colors"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Retry
        </Button>
      )}
    </div>
  );
}
