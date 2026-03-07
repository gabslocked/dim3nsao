'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Users, LineChart, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function AdminSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex h-full flex-col">
      <SidebarMenu className="flex-1">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/admin')}
            onClick={() => setOpenMobile(false)}
            tooltip={{ children: 'Dashboard' }}
          >
            <Link href="/admin">
              <Home />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/admin/orders')}
              onClick={() => setOpenMobile(false)}
              tooltip={{ children: 'Pedidos' }}
            >
              <Link href="/admin/orders">
                <Package />
                <span>Pedidos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/admin/products')}
              onClick={() => setOpenMobile(false)}
              tooltip={{ children: 'Produtos' }}
            >
              <Link href="/admin/products">
                <Package />
                <span>Produtos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/admin/customers')}
              onClick={() => setOpenMobile(false)}
              tooltip={{ children: 'Clientes' }}
            >
              <Link href="/admin/customers">
                <Users />
                <span>Clientes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/admin/analytics')}
              onClick={() => setOpenMobile(false)}
              tooltip={{ children: 'Analytics' }}
            >
              <Link href="/admin/analytics">
                <LineChart />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarMenu>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/admin/settings')}
            onClick={() => setOpenMobile(false)}
            tooltip={{ children: 'Configurações' }}
          >
            <Link href="/admin/settings">
              <Settings />
              <span>Configurações</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
