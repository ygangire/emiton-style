import Link from "next/link";
import { Edit } from "lucide-react";
import type { Product } from "@prisma/client";
import StatusBadge from "./StatusBadge";
import DeleteProductButton from "./DeleteProductButton";

interface ProductRowProps {
  product: Product & {
    collection: { id: number; name: string };
    category: { id: number; name: string } | null;
  };
}

export default function ProductRow({ product }: ProductRowProps) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 font-medium">{product.name}</td>
      <td className="px-6 py-4">{product.collection.name}</td>
      <td className="px-6 py-4">
        {product.category ? product.category.name : "-"}
      </td>
      <td className="px-6 py-4">${Number(product.price).toFixed(2)}</td>
      <td className="px-6 py-4">
        <StatusBadge isActive={product.isActive} />
      </td>
      <td className="px-6 py-4">
        {new Date(product.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${product.id}/edit`}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-[#1F1F1F]"
            title="Edit product"
          >
            <Edit size={16} />
          </Link>
          <DeleteProductButton productId={product.id} />
        </div>
      </td>
    </tr>
  );
}