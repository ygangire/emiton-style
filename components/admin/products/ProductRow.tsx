import type { Product } from "@prisma/client";
import StatusBadge from "./StatusBadge";

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
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}