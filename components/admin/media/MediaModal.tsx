"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useTransition } from "react";
import MediaGrid from "./MediaGrid";
import type { MediaItem } from "./MediaCard";
import { getMedia } from "@/lib/actions/media.actions";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
}

export default function MediaModal({
  isOpen,
  onClose,
  onSelect,
}: MediaModalProps) {
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isOpen) return;

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMedia(search);
        setMedia(data);
      } catch (err) {
        setError("Failed to load media. Please try again.");
        console.error("Failed to fetch media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [isOpen, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-5xl rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#1F1F1F]">Media Library</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close media library"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              disabled={isPending}
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#C89B3C]" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  getMedia(search)
                    .then(setMedia)
                    .catch(() => setError("Failed to load media. Please try again."))
                    .finally(() => setLoading(false));
                }}
                className="mt-4 rounded-lg bg-[#1F1F1F] px-4 py-2 text-sm text-white hover:bg-[#C89B3C]"
              >
                Retry
              </button>
            </div>
          ) : (
            <MediaGrid media={media} onSelect={onSelect} />
          )}
        </div>
      </div>
    </div>
  );
}