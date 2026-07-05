"use client";

import { Menu } from "lucide-react";
import AdminSearch from "@/components/admin/ui/AdminSearch";
import NotificationMenu from "@/components/admin/navigation/NotificationMenu";
import UserMenu from "@/components/admin/navigation/UserMenu";

interface HeaderProps {
  onMenuClick: () => void;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: { name?: string | null } | string | null;
  } | null;
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const roleName = typeof user?.role === "string" ? user.role : user?.role?.name;

  return (
    <header className="border-b border-gray-200 bg-white/95 px-4 py-4 shadow-[0_1px_0_rgba(31,31,31,0.04)] backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar menu"
            className="rounded-lg p-2 text-[#1F1F1F] transition hover:bg-[#F5F1EA] lg:hidden"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm font-medium text-[#C89B3C]">Emiton Style CMS</p>
            <h2 className="text-xl font-semibold tracking-tight text-[#1F1F1F]">
              {roleName ? `Welcome back, ${roleName.toLowerCase()}` : "Welcome back"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearch placeholder="Search dashboard" className="w-full sm:w-72" />

          <div className="flex items-center gap-2">
            <NotificationMenu />
            <UserMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
