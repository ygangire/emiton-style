import { prisma } from "@/lib/prisma/client";

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