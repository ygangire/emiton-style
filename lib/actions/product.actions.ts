"use server";

import prisma from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      collection: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCollections() {
  return await prisma.collection.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    include: {
      collection: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export interface ProductErrors {
  name?: string;
  slug?: string;
  price?: string;
  collectionId?: string;
}

export interface ProductFormState {
  errors?: ProductErrors;
  message?: string;
}

export async function createProduct(
  prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const collectionId = formData.get("collectionId") as string;
  const categoryId = formData.get("categoryId") as string;
  const isActive = formData.has("isActive");

  const errors: ProductErrors = {};

  if (!name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!slug.trim()) {
    errors.slug = "Slug is required.";
  }

  const priceNumber = Number(price);
  if (!price.trim()) {
    errors.price = "Price is required.";
  } else if (isNaN(priceNumber) || priceNumber <= 0) {
    errors.price = "Price must be greater than zero.";
  }

  if (!collectionId) {
    errors.collectionId = "Collection is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingProduct = await prisma.product.findUnique({
    where: { slug: slug.trim() },
  });

  if (existingProduct) {
    return {
      errors: { slug: "A product with this slug already exists." },
    };
  }

  await prisma.product.create({
    data: {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      price: priceNumber,
      collectionId: Number(collectionId),
      categoryId: categoryId ? Number(categoryId) : undefined,
      isActive,
    },
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      collection: true,
      category: true,
    },
  });
}

export async function updateProduct(
  prevState: ProductFormState | undefined,
  formData: FormData
): Promise<ProductFormState> {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const collectionId = formData.get("collectionId") as string;
  const categoryId = formData.get("categoryId") as string;
  const isActive = formData.has("isActive");

  const errors: ProductErrors = {};

  if (!id || isNaN(id)) {
    errors.name = "Invalid product ID.";
  }

  if (!name.trim()) {
    errors.name = "Product name is required.";
  }

  if (!slug.trim()) {
    errors.slug = "Slug is required.";
  }

  const priceNumber = Number(price);
  if (!price.trim()) {
    errors.price = "Price is required.";
  } else if (isNaN(priceNumber) || priceNumber <= 0) {
    errors.price = "Price must be greater than zero.";
  }

  if (!collectionId) {
    errors.collectionId = "Collection is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingProduct = await prisma.product.findUnique({
    where: { slug: slug.trim() },
  });

  if (existingProduct && existingProduct.id !== id) {
    return {
      errors: { slug: "A product with this slug already exists." },
    };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
        price: priceNumber,
        collectionId: Number(collectionId),
        categoryId: categoryId ? Number(categoryId) : undefined,
        isActive,
      },
    });
  } catch {
    return {
      errors: { name: "Failed to update product. Please try again." },
    };
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}
