"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";

const notifications = [
  { id: 1, message: "Product successfully updated", time: "2 min ago" },
  { id: 2, message: "New customer registered", time: "15 min ago" },
  { id: 3, message: "Order #1024 received", time: "1 hour ago" },
];

export default function NotificationMenu() {
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
        aria-label="Open notifications"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative rounded-full border border-gray-200 bg-white p-2.5 text-[#1F1F1F] shadow-sm transition hover:shadow-md"
      >
        <Bell size={18} />
        <span className="absolute right-1 top-1 flex h-2.5 w-2.5 rounded-full bg-[#C89B3C]" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-[#1F1F1F]">Notifications</p>
            <span className="rounded-full bg-[#F5E8C7] px-2 py-0.5 text-xs font-medium text-[#C89B3C]">
              3 new
            </span>
          </div>

          <div className="space-y-2">
            {notifications.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-lg bg-[#FAF8F5] p-3">
                <CheckCircle2 size={16} className="mt-0.5 text-[#C89B3C]" />
                <div>
                  <p className="text-sm text-[#1F1F1F]">{item.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
