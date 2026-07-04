"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderKanban,
  Tags,
  Package,
  Users,
  UserCog,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: ShoppingBag },
  { title: "Collections", href: "/admin/collections", icon: FolderKanban },
  { title: "Categories", href: "/admin/categories", icon: Tags },
  { title: "Orders", href: "/admin/orders", icon: Package },
  { title: "Customers", href: "/admin/customers", icon: Users },
  { title: "Users", href: "/admin/users", icon: UserCog },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-800 bg-[#1F1F1F] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-700 p-6">
        <div>
          <h1 className="text-xl font-bold">Emiton Style</h1>
          <p className="mt-1 text-xs text-gray-400">Content Management System</p>
        </div>

        <button
          type="button"
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white lg:hidden"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active ? "bg-[#C89B3C] text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
