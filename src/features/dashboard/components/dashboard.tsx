"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  FEATURES,
  TECH_STACK,
} from "@/features/dashboard/constants/dashboard.constants";
import FeatureCard from "@/features/dashboard/components/feature-card";
import TechCard from "@/features/dashboard/components/tech-card";

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
        <h2 className="text-xl font-semibold mb-4">{t("keyFeatures.title")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("techStack.title")}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {TECH_STACK.map((tech) => (
            <TechCard
              key={tech.titleKey}
              titleKey={tech.titleKey}
              descKey={tech.descKey}
            />
          ))}
        </div>
      </div>

      {/* Documentation Preview */}
      <div className="border-l-4 border-primary bg-primary/5 rounded-lg p-6">
        <h3 className="font-semibold mb-2">📚 {t("cta.title")}</h3>
        <p className="text-sm text-muted-foreground mb-4">{t("cta.desc")}</p>
        <Link href="/docs/introduction">
          <Button variant="outline" size="sm" className="cursor-pointer">
            {t("cta.button")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
