import { BookOpen, LayoutDashboard, MessageCircle } from "lucide-react";

export const TEAM = {
  name: "TOMOSIA",
  logo: "/logo.webp",
  desc: "TOMOSIA logo",
  plan: "Company",
};

export const NAV_MAIN_GROUPS = [
  {
    groupName: "Project",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: MessageCircle,
      },
    ],
  },
  {
    groupName: "Docs",
    items: [
      {
        title: "Documentation",
        url: "/docs/introduction",
        icon: BookOpen,
      },
    ],
  },
];

export const BREADCRUMB_MAP: Record<string, string> = {
  //project
  chat: "Chats",
  dashboard: "Dashboard",
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
