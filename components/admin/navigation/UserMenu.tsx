"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { ChevronDown, HelpCircle, LogOut, Settings, User } from "lucide-react";

import Avatar from "@/components/shared/Avatar";
import RoleBadge from "@/components/shared/RoleBadge";

interface UserMenuProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: { name?: string | null } | string | null;
  } | null;
}

const items = [
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
];

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName =
    (user?.name ?? [user?.firstName, user?.lastName].filter(Boolean).join(" ")) || "Admin";
  const roleName = typeof user?.role === "string" ? user.role : user?.role?.name;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
      >
        <Avatar name={displayName} image={user?.image} size={36} />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-[#1F1F1F]">{displayName}</p>
          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-xs text-gray-500">{user?.email ?? "Admin access"}</p>
            <RoleBadge role={roleName} />
          </div>
        </div>

        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
        >
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="text-sm font-semibold text-[#1F1F1F]">{displayName}</p>
            <p className="text-xs text-gray-500">{user?.email ?? "Admin access"}</p>
          </div>

          <div className="mt-2 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-600 transition hover:bg-[#FAF8F5] hover:text-[#1F1F1F]"
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
