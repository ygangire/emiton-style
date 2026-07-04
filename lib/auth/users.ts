import { prisma } from "@/lib/prisma/client";

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
}

export function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });
}
