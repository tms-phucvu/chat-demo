"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { TEAM } from "@/constants/sidebar-data";
import { DOCS_SIDEBAR } from "@/features/docs/constants/docs-sidebar-data";

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary flex aspect-square p-1.5 items-center justify-center rounded-sm">
                <Image
                  src={TEAM.logo}
                  alt={TEAM.desc}
                  width={26}
                  height={26}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{TEAM.name}</span>
                <span className="truncate text-xs">{TEAM.plan}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {DOCS_SIDEBAR.map((navMain) => (
          <NavMain
            key={navMain.groupName}
            groupName={navMain.groupName}
            items={navMain.items}
          />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
