"use client";

import { Copy, Check, X, ExternalLink } from "lucide-react";
import type { MediaItem } from "./MediaCard";
import { useState } from "react";

interface MediaPreviewProps {
  media: MediaItem;
  onClose: () => void;
}

export default function MediaPreview({ media, onClose }: MediaPreviewProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(media.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(media.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] w-full rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close preview"
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
                className="max-h-[60vh] max-w-full object-contain"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center">
                <span className="text-6xl text-gray-300">📄</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">File size</span>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {formatFileSize(media.size)}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Dimensions</span>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {media.width && media.height
                    ? `${media.width} × ${media.height}`
                    : "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Format</span>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {media.extension.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">MIME type</span>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {media.mimeType}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Uploaded</span>
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {formatDate(media.createdAt)}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">ID</span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-mono font-medium text-[#1F1F1F] truncate">
                    {media.id}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="rounded p-1 text-gray-400 hover:text-gray-600"
                    title="Copy ID"
                    aria-label="Copy media ID"
                  >
                    {copiedId ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t pt-4">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {copiedUrl ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} />
              )}
              Copy URL
            </button>
            <a
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[#1F1F1F] px-4 py-2 text-sm font-medium text-white hover:bg-[#C89B3C]"
            >
              <ExternalLink size={16} />
              View file
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}