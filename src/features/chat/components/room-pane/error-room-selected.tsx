import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ErrorRoomSelectedProps {
  error?: Error | null;
  onRetry?: () => void;
}

export default function ErrorRoomSelected({
  error,
  onRetry,
}: ErrorRoomSelectedProps) {
  const t = useTranslations("chat.roomPane.errorRoom");
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="mb-2 h-10 w-10 text-destructive" />
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="text-sm text-muted-foreground">
        {error?.message || t("desc")}
      </p>
      {onRetry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="mt-4 text-sm underline hover:text-primary"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          {t("retryButton")}
        </Button>
      )}
    </div>
  );
}
