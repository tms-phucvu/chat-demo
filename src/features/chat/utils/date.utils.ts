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
