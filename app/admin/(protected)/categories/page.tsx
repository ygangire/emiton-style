import Link from "next/link";
import { getCategories } from "@/lib/actions/category.actions";
import CategoryTable from "@/components/admin/categories/CategoryTable";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">
            Showing {categories.length} categor
            {categories.length !== 1 ? "ies" : "y"}
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24] transition"
        >
          + Add Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <h2 className="text-xl font-semibold">No categories found</h2>
          <p className="mt-2 text-gray-500">
            Create your first category.
          </p>

          <Link
            href="/admin/categories/new"
            className="mt-6 inline-block rounded-lg bg-[#C99A2E] px-4 py-2 text-white hover:bg-[#B88B24]"
          >
            Add Category
          </Link>
        </div>
      ) : (
        <CategoryTable categories={categories} />
      )}
    </div>
  );
}