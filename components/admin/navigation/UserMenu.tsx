"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";

const items = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
  { label: "Logout", icon: LogOut },
];

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Open user menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C89B3C] font-semibold text-white">
          SA
        </div>
        <span className="hidden text-sm font-medium text-[#1F1F1F] sm:block">System Admin</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl transition-all duration-200">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-[#FAF8F5] hover:text-[#1F1F1F]"
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
