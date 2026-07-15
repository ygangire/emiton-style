import CategoryRow from "./CategoryRow";
import type { CategoryListItem } from "@/lib/actions/category.actions";

interface CategoryTableProps {
  categories: CategoryListItem[];
}

export default function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Collection</th>
            <th className="px-6 py-4 font-semibold">Products</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
}