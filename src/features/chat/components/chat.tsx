"use client";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Chat() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        <div className="bg-muted/50 min-h-screen flex-2 rounded-xl md:min-h-min" />
      </>
    );
  if (!user) return null;
  console.log(user);

  return (
    <>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" >Chat sidebar</div>
      <div className="bg-muted/50 min-h-screen flex-2 rounded-xl md:min-h-min" >{user.email}</div>
    </>
  );
}
