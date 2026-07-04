"use client";

import { Search } from "lucide-react";

interface AdminSearchProps {
  placeholder?: string;
  className?: string;
}

export default function AdminSearch({ placeholder = "Search", className = "" }: AdminSearchProps) {
  return (
    <label className={`flex items-center gap-2 rounded-full border border-gray-200 bg-[#FAF8F5] px-4 py-2.5 text-sm text-gray-500 shadow-sm ${className}`.trim()}>
      <Search size={16} className="text-[#C89B3C]" />
      <input
        type="search"
        aria-label="Admin search"
        placeholder={placeholder}
        className="w-full border-none bg-transparent outline-none placeholder:text-gray-400"
      />
    </label>
  );
}
