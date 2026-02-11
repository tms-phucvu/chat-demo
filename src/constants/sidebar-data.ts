import { NavMainProps } from "@/components/sidebar/nav-main";
import { BookOpen, LayoutDashboard, MessageCircle } from "lucide-react";

export const TEAM = {
  name: "TOMOSIA",
  logo: "/logo.webp",
  desc: "TOMOSIA logo",
};

export const NAV_MAIN_GROUPS: NavMainProps[] = [
  {
    groupKey: "projectSection.title",
    items: [
      {
        titleKey: "projectSection.dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        titleKey: "projectSection.chat",
        url: "/chat",
        icon: MessageCircle,
      },
    ],
  },
  {
    groupKey: "docSection.title",
    items: [
      {
        titleKey: "docSection.documentation",
        url: "/docs/introduction",
        icon: BookOpen,
      },
    ],
  },
];

export const BREADCRUMB_KEY_MAP: Record<string, string> = {
  //project
  chat: "chat",
  dashboard: "dashboard",
};

export const BREADCRUMB_MAP: Record<string, string> = {
  //docs
  docs: "Docs",
  introduction: "Introduction",
  firebase: "Firebase Setup",
  "system-design": "System Design",
  "data-models": "Data Models",
  "chat-rooms": "Chat Rooms",
  messaging: "Messaging",
  presence: "Presence",
  "typing-indicators": "Typing Indicators",
  "user-search": "User Search",
};
