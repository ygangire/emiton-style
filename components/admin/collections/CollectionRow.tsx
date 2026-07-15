import Link from "next/link";
import { Edit } from "lucide-react";
import StatusBadge from "@/components/admin/common/StatusBadge";
import type { CollectionListItem } from "@/lib/actions/collection.actions";

interface CollectionRowProps {
  collection: CollectionListItem;
}

export default function CollectionRow({ collection }: CollectionRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">{collection.name}</td>
      <td className="px-6 py-4">{collection.slug}</td>
      <td className="px-6 py-4">{collection._count.categories}</td>
      <td className="px-6 py-4">{collection._count.products}</td>
      <td className="px-6 py-4">
        <StatusBadge isActive={collection.isActive} />
      </td>
      <td className="px-6 py-4">
        {new Date(collection.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/collections/${collection.id}/edit`}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-[#1F1F1F]"
            title="Edit collection"
          >
            <Edit size={16} />
          </Link>
        </div>
      </td>
    </tr>
  );
}