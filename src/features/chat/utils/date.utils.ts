import { FieldValue, Timestamp } from "firebase/firestore";

export const formatTime = (value?: Timestamp | FieldValue) => {
  if (!value) return "";
  if (!(value instanceof Timestamp)) return "";
  const date = value.toDate();
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function formatLastActive(lastActive: number): string {
  if (!lastActive) return "";

  const diffMs = Date.now() - lastActive;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diffMs < minute) {
    return "Active 1 minute ago";
  }

  if (diffMs < hour) {
    const mins = Math.floor(diffMs / minute);
    return `Active ${mins} minute${mins > 1 ? "s" : ""} ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `Active ${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diffMs < week) {
    const days = Math.floor(diffMs / day);

    if (days === 1) {
      return "Active yesterday";
    }

    return `Active ${days} days ago`;
  }

  const date = new Date(lastActive);

  return `Active ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

export const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const formatDateSeparator = (dateInput: Timestamp | FieldValue) => {
  if (!dateInput) return "";

  const date = (dateInput as Timestamp).toDate();
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
