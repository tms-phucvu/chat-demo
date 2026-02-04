"use client";
import { usePresenceSync } from "@/hooks/use-presence-sync";

export default function PresenceSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  usePresenceSync();
  return <>{children}</>;
}
