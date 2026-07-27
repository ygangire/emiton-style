"use client";

import { useState } from "react";
import { Copy, Trash2, Check } from "lucide-react";

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  altText: string | null;
  mimeType: string;
  extension: string;
  size: number;
  width: number | null;
  height: number | null;
  folder: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MediaCardProps {
  media: MediaItem;
  onSelect?: (media: MediaItem) => void;
  isSelected?: boolean;
  showActions?: boolean;
}

export default function MediaCard({
  media,
  onSelect,
  isSelected = false,
  showActions = true,
}: MediaCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(media.url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this media?")) {
      setIsDeleting(true);
      await deleteMedia(media.id);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div
      className={`group relative rounded-xl border border-gray-200 bg-white transition-all duration-200 ${
        isSelected ? "ring-2 ring-[#C89B3C]" : "hover:shadow-lg"
      }`}
    >
      <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-50">
        {media.mimeType.startsWith("image/") ? (
          <img
            src={media.url}
            alt={media.altText || media.originalName}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl text-gray-300">📄</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium text-[#1F1F1F]" title={media.originalName}>
          {media.originalName}
        </p>
        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
          <span>{formatFileSize(media.size)}</span>
          {media.width && media.height && (
            <span>
              {media.width} × {media.height}
            </span>
          )}
        </div>
      </div>

      {showActions && (
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="rounded-lg bg-white/90 p-1.5 text-gray-600 shadow-sm backdrop-blur-sm hover:bg-white"
            title="Copy URL"
          >
            {showCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg bg-white/90 p-1.5 text-red-600 shadow-sm backdrop-blur-sm hover:bg-white disabled:opacity-50"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {onSelect && (
        <button
          type="button"
          onClick={() => onSelect(media)}
          className="absolute inset-0 cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
          aria-label={`Select ${media.originalName}`}
        />
      )}

      {isSelected && (
        <div className="absolute top-2 left-2 rounded-lg bg-[#C89B3C] p-1">
          <Check size={14} className="text-white" />
        </div>
      )}
    </div>
  );
}