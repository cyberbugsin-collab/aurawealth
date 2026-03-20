"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { getAllRequests } from "@/lib/data";

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Requests",
    href: "/admin/requests",
    icon: MessageSquare,
    badge: true,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pendingRequests = getAllRequests().filter(r => r.status === "pending").length;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-md border border-border"
      >
        {mobileOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">
              AuraWealth
            </span>
          </div>

          {/* Admin Badge */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Shield className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-600">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                  {item.badge && pendingRequests > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-[20px] text-xs">
                      {pendingRequests}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
