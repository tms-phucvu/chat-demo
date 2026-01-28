import { PROTECTED_PATHS, PUBLIC_PATHS } from "@/constants/auth-paths";

const matchPath = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

export const isPublicPath = (pathname: string) =>
  PUBLIC_PATHS.some((p) => matchPath(pathname, p));

export const isProtectedPath = (pathname: string) =>
  PROTECTED_PATHS.some((p) => matchPath(pathname, p));
