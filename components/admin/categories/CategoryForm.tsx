"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import type { Collection } from "@prisma/client";
import { createCategory, type CategoryFormState } from "@/lib/actions/category.actions";

interface CategoryFormProps {
  collections: Collection[];
}

export default function CategoryForm({ collections }: CategoryFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<CategoryFormState | undefined, FormData>(
    createCategory,
    undefined
  );

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setSlugManuallyEdited(true);
  };

  const errors = state?.errors;

  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F1F1F]">Create Category</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new category for your store.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1F1F1F]">
              Category Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Men's Shirts"
              required
              disabled={isPending}
              aria-invalid={Boolean(errors?.name)}
              aria-describedby={errors?.name ? "name-error" : undefined}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => handleNameChange(e.target.value)}
            />
            {errors?.name ? (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-[#1F1F1F]">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={slug}
              placeholder="mens-shirts"
              required
              disabled={isPending}
              aria-invalid={Boolean(errors?.slug)}
              aria-describedby={errors?.slug ? "slug-error" : undefined}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => handleSlugChange(e.target.value)}
            />
            {errors?.slug ? (
              <p id="slug-error" className="mt-2 text-sm text-red-600">
                {errors.slug}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="collectionId" className="block text-sm font-medium text-[#1F1F1F]">
              Collection
            </label>
            <select
              id="collectionId"
              name="collectionId"
              value={collectionId}
              required
              disabled={isPending}
              aria-invalid={Boolean(errors?.collectionId)}
              aria-describedby={errors?.collectionId ? "collectionId-error" : undefined}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => setCollectionId(e.target.value)}
            >
              <option value="">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            {errors?.collectionId ? (
              <p id="collectionId-error" className="mt-2 text-sm text-red-600">
                {errors.collectionId}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F1F1F]">Status</h2>
        <p className="mt-1 text-sm text-gray-500">Set the category visibility status.</p>

        <div className="mt-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              checked={isActive}
              disabled={isPending}
              className="h-5 w-5 rounded border-gray-300 text-[#C89B3C] focus:ring-[#C89B3C] disabled:cursor-not-allowed"
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm font-medium text-[#1F1F1F]">
              {isActive ? "Active" : "Draft"}
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#1F1F1F] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4 disabled:cursor-not-allowed disabled:bg-[#1F1F1F]/60"
        >
          {isPending ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : null}
          {isPending ? "Saving..." : "Save Category"}
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => router.push("/admin/categories")}
          className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 text-sm font-medium text-[#1F1F1F] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
