"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import {
  LayoutDashboard,
  DollarSign,
  FolderKanban,
  Gavel,
  Users,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Investments", href: "/dashboard/investments", icon: DollarSign },
  { name: "Project", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Auctions", href: "/dashboard/auctions", icon: Gavel },
  { name: "User", href: "/dashboard/user", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex h-screen w-[200px] flex-col bg-[#1a1a1a] border-r border-[#2a2a2a]">
      <div className="flex h-16 items-center justify-center border-b border-[#2a2a2a] px-4">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#FF6B00] text-white"
                  : "text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#2a2a2a] p-3">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
