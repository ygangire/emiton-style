"use client";

import MediaSearch from "./MediaSearch";

interface MediaToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function MediaToolbar({ search, onSearchChange }: MediaToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <MediaSearch value={search} onChange={onSearchChange} />
      </div>
    </div>
  );
}