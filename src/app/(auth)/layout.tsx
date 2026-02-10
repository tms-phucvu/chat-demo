import { AppSidebar } from "@/components/sidebar/app-sidebar";
import HeaderBreadcrumb from "@/components/sidebar/header-breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import PresenceSyncProvider from "@/providers/presence-sync-provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between items-center h-16 shrink-0 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <HeaderBreadcrumb />
          <Button>Button</Button>
        </header>
        <div className="h-full">
          <PresenceSyncProvider>{children}</PresenceSyncProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
