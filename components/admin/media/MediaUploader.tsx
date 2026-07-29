"use client";

import { useActionState, useRef, useState } from "react";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { uploadMedia, type MediaFormState } from "@/lib/actions/media.actions";

interface MediaUploaderProps {
  onUploadComplete?: () => void;
}

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export default function MediaUploader({ onUploadComplete }: MediaUploaderProps) {
  const [state, formAction, isPending] = useActionState<MediaFormState | undefined, FormData>(
    uploadMedia,
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndUploadFile(file);
    }
  };

  const validateAndUploadFile = (file: File) => {
    // Validate file type
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      alert("Unsupported file format. Supported formats: JPG, JPEG, PNG, WebP.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 10MB limit.");
      return;
    }

    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formAction(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndUploadFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formAction(formData);
    }
  };

  // Reset after upload
  if (state?.message && !isPending) {
    setTimeout(() => {
      setSelectedFile(null);
      onUploadComplete?.();
    }, 2000);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
            dragActive
              ? "border-[#C89B3C] bg-[#FAF8F5]"
              : "border-gray-300 bg-white hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Upload size={32} className="text-gray-400" />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-[#1F1F1F]">
                Drop your images here
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                JPG, JPEG, PNG, WebP up to 10MB
              </p>
            </div>

            <div className="mt-6">
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                id="media-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="media-upload"
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl bg-[#1F1F1F] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4"
              >
                Choose Files
              </label>
            </div>
          </div>
        </div>

        {selectedFile && isPending && (
          <div className="rounded-lg bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {selectedFile.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1F1F1F]">
                  {selectedFile.name}
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#C89B3C] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {state?.errors?.file && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={16} />
            {state.errors.file}
          </div>
        )}

        {state?.message && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            <CheckCircle size={16} />
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}