"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import MediaCard, { type MediaItem } from "./MediaCard";
import MediaPreview from "./MediaPreview";

interface MediaGridProps {
  media: MediaItem[];
  onSelect?: (media: MediaItem) => void;
  selectedId?: string | null;
  onDelete?: () => void;
}

export default function MediaGrid({
  media,
  onSelect,
  selectedId,
  onDelete,
}: MediaGridProps) {
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-gray-100 p-6">
          <ImageIcon size={48} className="text-gray-300" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-[#1F1F1F]">
          No media files found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Upload your first image to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {media.map((item) => (
          <div key={item.id} className="group relative">
            <MediaCard
              media={item}
              onSelect={onSelect}
              isSelected={selectedId === item.id}
              onDelete={onDelete}
            />
            <button
              type="button"
              onClick={() => setPreviewMedia(item)}
              className="absolute inset-0 cursor-zoom-in rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
              aria-label={`Preview ${item.originalName}`}
            />
          </div>
        ))}
      </div>

      {previewMedia && (
        <MediaPreview
          media={previewMedia}
          onClose={() => setPreviewMedia(null)}
        />
      )}
    </>
  );
}