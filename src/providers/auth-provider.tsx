"use client";

import { useEffect, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setupPresence } from "@/services/presence.service";
import { useAuthStore } from "@/stores/auth.store";
import { syncUserProfile } from "@/services/user-profile.service";
import { usePathname, useRouter } from "next/navigation";
import { isPublicPath } from "@/lib/auth-path-utils";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, setAuth, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearAuth();
      } else {
        const profile = await syncUserProfile(firebaseUser);
        setAuth(firebaseUser, profile);
        setupPresence(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, [setAuth, clearAuth]);

  useEffect(() => {
    if (loading) return;
    if (!user && !isPublicPath(pathname)) {
      router.replace("/login");
    } else if (user && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
