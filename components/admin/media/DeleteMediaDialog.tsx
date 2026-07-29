"use client";

import { useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { deleteMedia } from "@/lib/actions/media.actions";

interface DeleteMediaDialogProps {
  mediaId: string;
  mediaName: string;
  onDeleteComplete?: () => void;
}

export default function DeleteMediaDialog({
  mediaId,
  mediaName,
  onDeleteComplete,
}: DeleteMediaDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMedia(mediaId);
      onDeleteComplete?.();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setShowDialog(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDialog(true)}
        className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        title="Delete media"
      >
        <Trash2 size={16} />
      </button>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">
                  Delete Media
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Are you sure you want to permanently delete "{mediaName}"? This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                disabled={isDeleting}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}