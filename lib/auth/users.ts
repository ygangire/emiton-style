import { prisma } from "@/lib/prisma/client";

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      image: true,
      password: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });
}

export function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      email: true,
      image: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });
}
