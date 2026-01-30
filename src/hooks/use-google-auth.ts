"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

interface UseGoogleAuthReturn {
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useGoogleAuth(): UseGoogleAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/popup-blocked") {
          // Fallback to redirect flow
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        setError(err.message);
        console.error("Google sign in error:", err);
      } else {
        setError("An unknown error occurred");
        console.error("Unknown error", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
      // Navigation will be handled by auth-provider listening to auth state
      router.push("/login");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
        console.error("Logout error:", err);
      } else {
        setError("Logout failed");
        console.error("Unknown error", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithGoogle,
    logout,
    isLoading,
    error,
  };
}
