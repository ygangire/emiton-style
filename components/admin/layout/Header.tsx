"use client";

import { Menu } from "lucide-react";
import AdminSearch from "@/components/admin/ui/AdminSearch";
import NotificationMenu from "@/components/admin/navigation/NotificationMenu";
import UserMenu from "@/components/admin/navigation/UserMenu";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar menu"
            className="rounded-lg p-2 text-[#1F1F1F] transition hover:bg-gray-100 lg:hidden"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm font-medium text-[#C89B3C]">Emiton Style CMS</p>
            <h2 className="text-xl font-semibold text-[#1F1F1F]">Welcome back</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearch placeholder="Search dashboard" className="w-full sm:w-72" />

          <div className="flex items-center gap-2">
            <NotificationMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
