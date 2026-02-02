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
