"use client";

import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-xl font-bold text-[#1F1F1F]">Dashboard</h2>
          <p className="text-sm text-gray-500">{greeting}, System Admin</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <span className="hidden text-sm text-gray-500 lg:block">{today}</span>

        <button type="button" className="rounded-lg p-2 transition hover:bg-gray-100">
          <Search size={20} />
        </button>

        <button
          type="button"
          className="relative rounded-lg p-2 transition hover:bg-gray-100"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C89B3C] font-semibold text-white">
          SA
        </div>
      </div>
    </header>
  );
}