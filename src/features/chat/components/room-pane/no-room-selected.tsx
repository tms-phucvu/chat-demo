import { useTranslations } from "next-intl";

export const NoRoomSelected = () => {
  const t = useTranslations("chat.roomPane.noRoom");
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-sm text-muted-foreground">
      <p className="font-medium">{t("title")}</p>
      <p className="max-w-xs text-xs">{t("desc")}</p>
    </div>
  );
};
