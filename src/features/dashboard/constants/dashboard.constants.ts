import { Zap, Users, Clock, MessageSquare } from "lucide-react";
import { FeatureCardProps, TechCardProps } from "@/features/dashboard/types/dashboard.types";

export const FEATURES: (FeatureCardProps & { id: string })[] = [
  {
    id: "messaging",
    icon: Zap,
    titleKey: "messaging.title",
    descKey: "messaging.desc",
  },
  {
    id: "chats",
    icon: Users,
    titleKey: "chats.title",
    descKey: "chats.desc",
  },
  {
    id: "presence",
    icon: Clock,
    titleKey: "presence.title",
    descKey: "presence.desc",
  },
  {
    id: "search",
    icon: MessageSquare,
    titleKey: "search.title",
    descKey: "search.desc",
  },
];

export const TECH_STACK: TechCardProps[] = [
  {
    titleKey: "nextjs.title",
    descKey: "nextjs.desc",
  },
  {
    titleKey: "firebase.title",
    descKey: "firebase.desc",
  },
  {
    titleKey: "typescript.title",
    descKey: "typescript.desc",
  },
  {
    titleKey: "tailwind.title",
    descKey: "tailwind.desc",
  },
];
