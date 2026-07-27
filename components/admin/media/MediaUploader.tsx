"use client";

import { useActionState, useRef } from "react";
import { Upload } from "lucide-react";
import { uploadMedia, type MediaFormState } from "@/lib/actions/media.actions";

interface MediaUploaderProps {
  onUploadComplete?: () => void;
}

export default function MediaUploader({ onUploadComplete }: MediaUploaderProps) {
  const [state, formAction, isPending] = useActionState<MediaFormState | undefined, FormData>(
    uploadMedia,
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-all duration-200 hover:border-gray-400">
      <form action={formAction} className="space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Upload size={32} className="text-gray-400" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-[#1F1F1F]">
            Drop your images here
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            JPG, JPEG, PNG, WebP up to 10MB
          </p>
        </div>

        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#1F1F1F] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4 cursor-pointer"
          >
            Choose Files
          </label>
        </div>

        {state?.errors?.file && (
          <p className="text-sm text-red-600">{state.errors.file}</p>
        )}
        
        {state?.message && (
          <p className="text-sm text-green-600">{state.message}</p>
        )}
      </form>
    </div>
  );
}