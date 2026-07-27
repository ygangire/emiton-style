"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import MediaGrid from "./MediaGrid";
import type { MediaItem } from "./MediaCard";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
}

export default function MediaModal({ isOpen, onClose, onSelect }: MediaModalProps) {
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/media?search=${encodeURIComponent(searchRef.current)}`);
        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [isOpen]);

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
              className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15"
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#C89B3C]" />
            </div>
          ) : (
            <MediaGrid media={media} onSelect={onSelect} />
          )}
        </div>
      </div>
    </div>
  );
}