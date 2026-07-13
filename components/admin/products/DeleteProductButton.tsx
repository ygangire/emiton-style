"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct, type DeleteProductState } from "@/lib/actions/product.actions";

interface DeleteProductButtonProps {
  productId: number;
}

export default function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this product?")) {
      return;
    }

    setIsPending(true);
    const result: DeleteProductState = await deleteProduct(productId);
    setIsPending(false);

    if (result.error) {
      // Product already deleted or other error - page will refresh via revalidatePath
      // The error is handled gracefully by the server action
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      title="Delete product"
    >
      <Trash2 size={16} />
    </button>
  );
}