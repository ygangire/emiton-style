import { auth } from "@/auth";
import { getUserById } from "@/lib/auth/users";

export async function getSession() {
  return auth();
}

export async function getCurrentUser() {
  const session = await getSession();
  const userId = Number(session?.user?.id);

  if (!Number.isInteger(userId)) {
    return null;
  }

  return getUserById(userId);
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Authentication required.");
  }

  return user;
}
