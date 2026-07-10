"use client";

import { useActionState, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Collection, Category } from "@prisma/client";
import { createProduct, updateProduct, type ProductFormState } from "@/lib/actions/product.actions";
import type { Product } from "@prisma/client";

interface ProductFormProps {
  collections: Collection[];
  categories: Array<Category & { collection: { id: number; name: string } }>;
  mode?: "create" | "edit";
  product?: Product & {
    collection: { id: number; name: string };
    category: { id: number; name: string } | null;
  };
}

export default function ProductForm({
  collections,
  categories,
  mode = "create",
  product,
}: ProductFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ProductFormState | undefined, FormData>(
    mode === "edit" ? updateProduct : createProduct,
    undefined
  );

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ? String(product.price) : "");
  const [collectionId, setCollectionId] = useState(
    product?.collectionId ? String(product.collectionId) : ""
  );
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ? String(product.categoryId) : ""
  );
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
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

  const filteredCategories = useMemo(() => {
    if (!collectionId) return [];
    return categories.filter((cat) => cat.collectionId === Number(collectionId));
  }, [categories, collectionId]);

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && product && (
        <input type="hidden" name="id" value={product.id} />
      )}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F1F1F]">
          {mode === "edit" ? "Edit Product Details" : "Create Product"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {mode === "edit" ? "Edit product details." : "Create a new product for your store."}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1F1F1F]">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Premium Cotton Shirt"
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
              placeholder="premium-cotton-shirt"
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
            <label htmlFor="description" className="block text-sm font-medium text-[#1F1F1F]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="Product description..."
              rows={4}
              disabled={isPending}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-[#1F1F1F]">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              placeholder="0.00"
              required
              disabled={isPending}
              aria-invalid={Boolean(errors?.price)}
              aria-describedby={errors?.price ? "price-error" : undefined}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors?.price ? (
              <p id="price-error" className="mt-2 text-sm text-red-600">
                {errors.price}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F1F1F]">Organization</h2>
        <p className="mt-1 text-sm text-gray-500">Assign product to collection and category.</p>

        <div className="mt-6 space-y-4">
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
              onChange={(e) => {
                setCollectionId(e.target.value);
                setCategoryId("");
              }}
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

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-[#1F1F1F]">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={categoryId}
              disabled={isPending || !collectionId}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a category (optional)</option>
              {filteredCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F1F1F]">Status</h2>
        <p className="mt-1 text-sm text-gray-500">Set the product visibility status.</p>

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
          {isPending ? "Saving..." : mode === "edit" ? "Update Product" : "Save Product"}
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => router.push("/admin/products")}
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