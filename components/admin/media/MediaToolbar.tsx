"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MediaSearch from "./MediaSearch";

interface MediaToolbarProps {
  search: string;
  sort: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name", label: "Name" },
];

export default function MediaToolbar({ search, sort }: MediaToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <MediaSearch value={search} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Sort by:</span>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-[#1F1F1F] outline-none focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15"
            aria-label="Sort media"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}