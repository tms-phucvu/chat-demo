import { BookOpen, LayoutDashboard, MessageCircle } from "lucide-react";

export const TEAM = {
  name: "TOMOSIA",
  logo: "/logo.webp",
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
        title: "Getting Started",
        url: "/docs",
        icon: BookOpen,
        items: [
          {
            title: "Introduce",
            url: "/docs",
          },
          {
            title: "Installation",
            url: "/docs/getting-started",
          },
          {
            title: "Quick Start",
            url: "/docs/quick-start",
          },
          {
            title: "Project Structure",
            url: "/docs/project-structure",
          },
        ],
      },
      {
        title: "Features",
        url: "/docs/features",
        icon: BookOpen,
        items: [
          {
            title: "Authentication",
            url: "/docs/features/authentication",
          },
          {
            title: "Real-time Messaging",
            url: "/docs/features/messaging",
          },
          {
            title: "Presence & Typing",
            url: "/docs/features/presence",
          },
          {
            title: "Chat Rooms",
            url: "/docs/features/chat-rooms",
          },
          {
            title: "User Search",
            url: "/docs/features/user-search",
          },
        ],
      },
      {
        title: "API Reference",
        url: "/docs/api",
        icon: BookOpen,
        items: [
          {
            title: "Services",
            url: "/docs/api/services",
          },
          {
            title: "Hooks",
            url: "/docs/api/hooks",
          },
          {
            title: "Stores",
            url: "/docs/api/stores",
          },
          {
            title: "Components",
            url: "/docs/api/components",
          },
        ],
      },
      {
        title: "Architecture",
        url: "/docs/architecture",
        icon: BookOpen,
        items: [
          {
            title: "System Design",
            url: "/docs/architecture/system-design",
          },
          {
            title: "Data Models",
            url: "/docs/architecture/data-models",
          },
          {
            title: "Patterns",
            url: "/docs/architecture/patterns",
          },
        ],
      },
      {
        title: "Deployment",
        url: "/docs/deployment",
        icon: BookOpen,
        items: [
          {
            title: "Firebase Setup",
            url: "/docs/deployment/firebase",
          },
          {
            title: "Vercel Deploy",
            url: "/docs/deployment/vercel",
          },
        ],
      },
    ],
  },
];
