import { useTranslations } from "next-intl";

export default function EmptyMessageList() {
  const t = useTranslations("chat.roomPane.emptyMessage");
  return (
    <div className="flex justify-center py-10">
      <div className="max-w-xs text-center text-sm text-muted-foreground">
        <p className="text-6xl mb-6">👋</p>
        <p className="mb-1 font-medium">{t("title")}</p>
        <p>{t("desc")}</p>
      </div>
    </div>
  );
}
