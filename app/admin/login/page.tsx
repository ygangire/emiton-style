import type { Metadata } from "next";

import LoginCard from "@/components/admin/auth/LoginCard";
import LoginForm from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Emiton Style",
  description: "Sign in to the Emiton Style administrator dashboard.",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F1EA] px-4 py-10 sm:px-6">
      <LoginCard>
        <LoginForm />
      </LoginCard>
    </main>
  );
}
