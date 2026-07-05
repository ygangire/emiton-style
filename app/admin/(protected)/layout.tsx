import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import { requireUser } from "@/lib/auth/session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireUser();
  } catch {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
