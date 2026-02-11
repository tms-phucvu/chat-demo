import { UserStatusType } from "@/types/user.type";
import { FieldValue, Timestamp } from "firebase/firestore";
import { useTranslations, useFormatter } from "next-intl";

export function useChatTimeFormatter() {
  const t = useTranslations("chat.common");
  const format = useFormatter();

  const formatLastActive = (
    status: UserStatusType,
    updatedAt: number | null,
  ) => {
    if (!updatedAt) return t("lastActive.offline");

    const diffMs = Date.now() - updatedAt;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    if (status === "online") return t("lastActive.now");

    if (diffMs < 2 * minute) return t("lastActive.min");

    if (diffMs < hour) {
      const mins = Math.floor(diffMs / minute);
      return t("lastActive.mins", { count: mins });
    }

    if (diffMs < day) {
      const hours = Math.floor(diffMs / hour);
      return t("lastActive.hour", { count: hours });
    }

    if (diffMs < 2 * day) return t("lastActive.yesterday");

    if (diffMs < week) {
      const days = Math.floor(diffMs / day);
      return t("lastActive.days", { count: days });
    }

    return t("lastActive.date", {
      date: format.dateTime(new Date(updatedAt), {
        month: "short",
        day: "numeric",
      }),
    });
  };

  const formatDateSeparator = (dateInput: Timestamp | FieldValue) => {
    if (!dateInput || !(dateInput instanceof Timestamp)) return "";

    const date = dateInput.toDate();
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return t("dateSeparator.today");
    if (isYesterday) return t("dateSeparator.yesterday");

    return format.dateTime(date, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return { formatLastActive, formatDateSeparator };
}
