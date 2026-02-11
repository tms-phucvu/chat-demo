"use client";

import { useAuth } from "@/hooks/use-auth";
import { MessageSquare, Users, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Dashboard() {
  const t = useTranslations("dashboard");
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="space-y-6">
        <div className="h-32 bg-linear-to-r from-muted to-muted/50 rounded-lg" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-muted/50 rounded-lg" />
          ))}
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/10 to-primary/5 rounded-lg border p-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            {t("welcome", { name: user.displayName ?? "Unknown" })} 👋
          </h1>
          <p className="text-muted-foreground mb-4">{user.email}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Real-time Messaging</h3>
                <p className="text-sm text-muted-foreground">
                  Send and receive messages instantly with Firebase Firestore
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Private & Group Chats</h3>
                <p className="text-sm text-muted-foreground">
                  Create one-on-one conversations or group chats with multiple
                  people
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Presence & Typing</h3>
                <p className="text-sm text-muted-foreground">
                  See who&apos;s online and who&apos;s typing in real-time
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Smart Search</h3>
                <p className="text-sm text-muted-foreground">
                  Find and connect with other users instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { name: "Next.js", description: "React Framework" },
            { name: "Firebase", description: "Backend & Database" },
            { name: "TypeScript", description: "Type Safety" },
            { name: "Tailwind CSS", description: "Styling" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="border rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold">{tech.name}</h3>
              <p className="text-xs text-muted-foreground">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation Preview */}
      <div className="border-l-4 border-primary bg-primary/5 rounded-lg p-6">
        <h3 className="font-semibold mb-2">📚 New to this template?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Check out the comprehensive documentation to understand the
          architecture, features, and how to use this application.
        </p>
        <Link href="/docs/introduction">
          <Button variant="outline" size="sm" className="cursor-pointer">
            Read Documentation
          </Button>
        </Link>
      </div>
    </div>
  );
}
