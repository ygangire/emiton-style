"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/admin/layout/Header";
import Sidebar from "@/components/admin/layout/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: { name?: string | null } | string | null;
  } | null;
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [sidebarOpenPathname, setSidebarOpenPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const isSidebarOpen = sidebarOpenPathname === pathname;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpenPathname(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpenPathname(null)} />

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-[#1F1F1F]/60 lg:hidden"
          onClick={() => setSidebarOpenPathname(null)}
        />
      ) : null}

      <div className="min-h-screen lg:pl-64">
        <Header
          user={user}
          onMenuClick={() =>
            setSidebarOpenPathname((currentPathname) =>
              currentPathname === pathname ? null : pathname,
            )
          }
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
