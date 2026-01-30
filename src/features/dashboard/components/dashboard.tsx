"use client";

import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
      </>
    );
  if (!user) return null;
  console.log(user);

  return (
    <>
      <div>Welcome {user.displayName}!</div>
      <div>{user.email}</div>
    </>
  );
}
