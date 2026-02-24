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

export const getThumbnailUrl = (url: string) => {
  return url.replace("/upload/", "/upload/w_250,c_fill,g_auto,q_auto,f_auto/");
};
