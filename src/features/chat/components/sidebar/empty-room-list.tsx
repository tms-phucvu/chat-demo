import { MessageSquarePlus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyRoomList() {
  const t = useTranslations("chat.sidebar.emptyRoom");
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 text-gray-500 dark:text-gray-400">
      <MessageSquarePlus className="w-16 h-16 mb-4 opacity-70" />
      <p className="text-lg font-medium mb-2">{t("title")}</p>
      <p className="text-sm">
        {t.rich("desc", {
          icon: () => (
            <span className="inline-flex items-center gap-1 border-2 rounded-full">
              <Plus size={14} />
            </span>
          ),
        })}
      </p>
    </div>
  );
}
