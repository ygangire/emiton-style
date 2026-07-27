"use server";

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCollections() {
  return await prisma.collection.findMany({
    include: {
      _count: {
        select: {
          categories: true,
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export type CollectionListItem = Awaited<ReturnType<typeof getCollections>>[number];

export interface CollectionErrors {
  name?: string;
  slug?: string;
}

export interface CollectionFormState {
  errors?: CollectionErrors;
  message?: string;
}

export async function createCollection(
  prevState: CollectionFormState | undefined,
  formData: FormData
): Promise<CollectionFormState> {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const isActive = formData.has("isActive");

  const errors: CollectionErrors = {};

  if (!name.trim()) {
    errors.name = "Collection name is required.";
  }

  if (!slug.trim()) {
    errors.slug = "Slug is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingCollection = await prisma.collection.findUnique({
    where: { slug: slug.trim() },
  });

  if (existingCollection) {
    return {
      errors: { slug: "A collection with this slug already exists." },
    };
  }

  await prisma.collection.create({
    data: {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      isActive,
    },
  });

  revalidatePath("/admin/collections");
  redirect("/admin/collections");
}

export async function getCollectionById(id: number) {
  return await prisma.collection.findUnique({
    where: { id },
  });
}

export async function updateCollection(
  prevState: CollectionFormState | undefined,
  formData: FormData
): Promise<CollectionFormState> {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const isActive = formData.has("isActive");

  const errors: CollectionErrors = {};

  if (!id || isNaN(id)) {
    errors.name = "Invalid collection ID.";
  }

  if (!name.trim()) {
    errors.name = "Collection name is required.";
  }

  if (!slug.trim()) {
    errors.slug = "Slug is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingCollection = await prisma.collection.findUnique({
    where: { slug: slug.trim() },
  });

  if (existingCollection && existingCollection.id !== id) {
    return {
      errors: { slug: "A collection with this slug already exists." },
    };
  }

  try {
    await prisma.collection.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        isActive,
      },
    });
  } catch {
    return {
      errors: { name: "Failed to update collection. Please try again." },
    };
  }

  revalidatePath("/admin/collections");
  redirect("/admin/collections");
}