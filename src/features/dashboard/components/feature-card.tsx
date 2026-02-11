import { useTranslations } from "next-intl";
import { FeatureCardProps } from "@/features/dashboard/types/dashboard.types";

export default function FeatureCard({
  icon: Icon,
  titleKey,
  descKey,
}: FeatureCardProps) {
  const t = useTranslations("dashboard.keyFeatures");

  return (
    <div className="border rounded-lg p-6 hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-4">
        <Icon className="w-8 h-8 text-primary shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold mb-1">{t(titleKey)}</h3>
          <p className="text-sm text-muted-foreground">{t(descKey)}</p>
        </div>
      </div>
    </div>
  );
}
