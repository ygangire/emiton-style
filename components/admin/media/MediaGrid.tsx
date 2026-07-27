"use client";

import MediaCard from "./MediaCard";
import type { MediaItem } from "./MediaCard";

interface MediaGridProps {
  media: MediaItem[];
  onSelect?: (media: MediaItem) => void;
  selectedId?: string | null;
}

export default function MediaGrid({ media, onSelect, selectedId }: MediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-gray-100 p-6">
          <span className="text-4xl text-gray-300">🖼️</span>
        </div>
        <h3 className="mt-4 text-lg font-medium text-[#1F1F1F]">No media files found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Upload your first image to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {media.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          onSelect={onSelect}
          isSelected={selectedId === item.id}
        />
      ))}
    </div>
  );
}