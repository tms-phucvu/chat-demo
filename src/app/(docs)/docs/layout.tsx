import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DocsBreadcrumb from "@/features/docs/components/header/docs-breadcrumb";
import { DocsSidebar } from "@/features/docs/components/sidebar/docs-sidebar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4">
          <DocsBreadcrumb />
        </header>
        <div className="h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
