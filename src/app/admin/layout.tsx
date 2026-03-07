import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ReactNode } from 'react';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard role="admin">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar>
            <AdminSidebar />
          </Sidebar>
          <SidebarInset>
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
