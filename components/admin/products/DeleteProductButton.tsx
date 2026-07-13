"use client";

import { useState } from "react";
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
      className="rounded-md border border-gray-300 px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}