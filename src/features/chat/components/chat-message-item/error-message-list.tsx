import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageListProps {
  error?: Error | null;
  onRetry?: () => void;
}

export default function ErrorMessageList({
  error,
  onRetry,
}: ErrorMessageListProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="bg-destructive/10 p-3 rounded-full mb-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">
        Failed to load messages
      </h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-62.5">
        {error?.message ||
          "Something went wrong while connecting to the chat server."}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4 h-8 text-xs gap-2 transition-all active:scale-95"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
