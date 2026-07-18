"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCategory, type DeleteCategoryState } from "@/lib/actions/category.actions";

interface DeleteCategoryButtonProps {
  categoryId: number;
}

export default function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this category?")) {
      return;
    }

    setIsPending(true);
    const result: DeleteCategoryState = await deleteCategory(categoryId);
    setIsPending(false);

    if (result.error) {
      // Category has products or other error - page will refresh via revalidatePath
      // The error is handled gracefully by the server action
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      title="Delete category"
    >
      <Trash2 size={16} />
    </button>
  );
}