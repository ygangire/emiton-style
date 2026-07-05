import type { ReactNode } from "react";

interface LoginCardProps {
  children: ReactNode;
}

export default function LoginCard({ children }: LoginCardProps) {
  return (
    <section
      aria-labelledby="admin-login-title"
      className="w-full max-w-[420px] rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-[0_24px_80px_rgba(31,31,31,0.10)] sm:p-8"
    >
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F1F1F] text-lg font-semibold tracking-tight text-[#C89B3C]">
          ES
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#C89B3C]">
          Emiton Style
        </p>

        <h1
          id="admin-login-title"
          className="mt-4 text-3xl font-semibold tracking-normal text-[#1F1F1F]"
        >
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign in to your administrator account
        </p>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-8">{children}</div>
    </section>
  );
}
