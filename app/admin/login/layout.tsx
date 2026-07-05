import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export default async function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  // If already authenticated, send to admin home
  const session = await getSession();

  if (session?.user?.id) {
    redirect("/admin");
  }

  return <>{children}</>;
}
