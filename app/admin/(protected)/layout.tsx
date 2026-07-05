import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import { requireUser } from "@/lib/auth/session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;

  try {
    user = await requireUser();
  } catch {
    redirect("/admin/login");
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
