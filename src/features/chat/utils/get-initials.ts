export const getInitials = (value: string, maxLength = 2) => {
  if (!value) return "";
  return value
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, maxLength)
    .toUpperCase();
};
