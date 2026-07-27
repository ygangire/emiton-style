"use client";

import { X } from "lucide-react";
import type { MediaItem } from "./MediaCard";

interface MediaPreviewProps {
  media: MediaItem;
  onClose: () => void;
}

export default function MediaPreview({ media, onClose }: MediaPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] rounded-xl bg-white p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1F1F1F]">
              {media.originalName}
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-50">
            {media.mimeType.startsWith("image/") ? (
              <img
                src={media.url}
                alt={media.altText || media.originalName}
                className="max-h-[70vh] max-w-full object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center">
                <span className="text-6xl text-gray-300">📄</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">File size:</span>
              <span className="ml-2 text-[#1F1F1F]">
                {media.size ? `${(media.size / 1024).toFixed(2)} KB` : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Dimensions:</span>
              <span className="ml-2 text-[#1F1F1F]">
                {media.width && media.height
                  ? `${media.width} × ${media.height}`
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Format:</span>
              <span className="ml-2 text-[#1F1F1F]">{media.extension.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-gray-500">URL:</span>
              <a
                href={media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-[#C89B3C] hover:underline"
              >
                View file
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}