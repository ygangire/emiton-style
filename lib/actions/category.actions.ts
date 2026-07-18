"use server";

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCategories() {
  return await prisma.category.findMany({
    include: {
      collection: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export type CategoryListItem = Awaited<ReturnType<typeof getCategories>>[number];

export async function getCollections() {
  return await prisma.collection.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export interface CategoryErrors {
  name?: string;
  slug?: string;
  collectionId?: string;
}

export interface CategoryFormState {
  errors?: CategoryErrors;
  message?: string;
}

export async function createCategory(
  prevState: CategoryFormState | undefined,
  formData: FormData
): Promise<CategoryFormState> {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const collectionId = formData.get("collectionId") as string;
  const isActive = formData.has("isActive");

  const errors: CategoryErrors = {};

  if (!name.trim()) {
    errors.name = "Category name is required.";
  }

  if (!slug.trim()) {
    errors.slug = "Slug is required.";
  }

  if (!collectionId) {
    errors.collectionId = "Collection is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingCategory = await prisma.category.findUnique({
    where: { slug: slug.trim() },
  });

  if (existingCategory) {
    return {
      errors: { slug: "A category with this slug already exists." },
    };
  }

  await prisma.category.create({
    data: {
      name: name.trim(),
      slug: slug.trim(),
      collectionId: Number(collectionId),
      isActive,
    },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
