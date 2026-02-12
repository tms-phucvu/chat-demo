import { useTranslations } from "next-intl";
import { TechCardProps } from "@/features/dashboard/types/dashboard.types";


export default function TechCard({ titleKey, descKey }: TechCardProps) {
  const t = useTranslations("dashboard.techStack");

  return (
    <div className="border rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
      <h3 className="font-semibold">{t(titleKey)}</h3>
      <p className="text-xs text-muted-foreground">{t(descKey)}</p>
    </div>
  );
}
