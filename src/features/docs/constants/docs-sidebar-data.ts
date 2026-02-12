import { Blocks, BookOpen, PackageCheck, Waypoints } from "lucide-react";

export const DOCS_SIDEBAR = [
  {
    groupName: "Docs",
    items: [
      {
        title: "Getting Started",
        url: "",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "Introduction",
            url: "/docs/introduction",
          },
          {
            title: "Firebase Setup",
            url: "/docs/firebase",
          },
        ],
      },
      {
        title: "Architecture",
        url: "",
        icon: Blocks,
        isActive: true,
        items: [
          {
            title: "System Design",
            url: "/docs/system-design",
          },
          {
            title: "Data Models",
            url: "/docs/data-models",
          },
        ],
      },
      {
        title: "Features",
        url: "",
        icon: Waypoints,
        isActive: true,
        items: [
          {
            title: "Chat Rooms",
            url: "/docs/chat-rooms",
          },
          {
            title: "Real-time Messaging",
            url: "/docs/messaging",
          },
          {
            title: "Presence",
            url: "/docs/presence",
          },
          {
            title: "Typing Indicators",
            url: "/docs/typing-indicators",
          },
          {
            title: "User Search",
            url: "/docs/user-search",
          },
        ],
      },
    ],
  },
  {
    groupName: "Demo",
    items: [
      {
        title: "Project demo",
        url: "/dashboard",
        icon: PackageCheck,
      },
    ],
  },
];
