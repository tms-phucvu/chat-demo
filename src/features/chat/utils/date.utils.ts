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

export const isSameDay = (
  date1: Date | number | undefined,
  date2: Date | number | undefined,
) => {
  if (!date1 || !date2) return false;

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
