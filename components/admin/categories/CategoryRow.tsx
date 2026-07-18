import Link from "next/link";
import { Edit } from "lucide-react";
import StatusBadge from "@/components/admin/common/StatusBadge";
import DeleteCategoryButton from "./DeleteCategoryButton";
import type { CategoryListItem } from "@/lib/actions/category.actions";

interface CategoryRowProps {
  category: CategoryListItem;
}

export default function CategoryRow({ category }: CategoryRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">{category.name}</td>
      <td className="px-6 py-4">{category.collection.name}</td>
      <td className="px-6 py-4">{category._count.products}</td>
      <td className="px-6 py-4">
        <StatusBadge isActive={category.isActive} />
      </td>
      <td className="px-6 py-4">
        {new Date(category.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/categories/${category.id}/edit`}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-[#1F1F1F]"
            title="Edit category"
          >
            <Edit size={16} />
          </Link>
          <DeleteCategoryButton categoryId={category.id} />
        </div>
      </td>
    </tr>
  );
}
