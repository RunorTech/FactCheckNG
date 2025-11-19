"use client"
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  CheckCircle2,
  Home,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {  usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname()         // e.g. /claims/details
  const searchParams = useSearchParams() // e.g. ?id=123&state=lagos
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();
  const hasPrompted = useRef(false);

  useEffect(() => {
    if (hasPrompted.current) return;
    hasPrompted.current = true;

    const inputPassword = prompt("input admin password");
    const adminPassword = "@kayode_1234";

    if (inputPassword === adminPassword) {
      Promise.resolve().then(() => setIsAdmin(true));
    } else {
      router.push("/");
    }
  }, []);

  const location = `${pathname}?${searchParams.toString()}`

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Claims', path: '/admin/claims' },
    { icon: CheckSquare, label: 'Verdicts', path: '/admin/verdicts' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  if (isAdmin) return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <CheckCircle2 className="h-6 w-6 text-verdict-true" />
              <span className="text-lg font-bold">Admin Panel</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location === link.path;

                    return (
                      <SidebarMenuItem key={link.path}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={link.path}>
                            <Icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Back to Website</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
