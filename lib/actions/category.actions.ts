"use server";

import { prisma } from "@/lib/prisma/client";

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