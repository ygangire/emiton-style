"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { signIn, type SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

import PasswordInput from "@/components/admin/auth/PasswordInput";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  authError?: string;
  isLoading?: boolean;
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export default function LoginForm({
  authError,
  isLoading = false,
  onSubmit,
}: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof LoginFormErrors, boolean>>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authErrorState, setAuthErrorState] = useState<string | undefined>(undefined);
  const router = useRouter();

  const visibleErrors = useMemo(
    () => ({
      email: touched.email ? errors.email : undefined,
      password: touched.password ? errors.password : undefined,
    }),
    [errors, touched],
  );
  const pending = isLoading || isSubmitting;

  const updateValue = <Field extends keyof LoginFormValues>(
    field: Field,
    value: LoginFormValues[Field],
  ) => {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors(validate(nextValues));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setAuthErrorState(undefined);
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        const res = (await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: "/admin",
        })) as SignInResponse | undefined;

        const errorCode = res?.error;
        if (errorCode) {
          setAuthErrorState(
            errorCode === "CredentialsSignin"
              ? "Invalid email or password."
              : "Authentication failed."
          );
        } else {
          router.push("/admin");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      {(authError || authErrorState) ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {authError || authErrorState}
        </div>
      ) : null}

      <div>
        <label htmlFor="admin-email" className="block text-sm font-medium text-[#1F1F1F]">
          Email Address
        </label>

        <input
          id="admin-email"
          name="email"
          type="email"
          value={values.email}
          placeholder="admin@emitonstyle.com"
          autoComplete="email"
          required
          disabled={pending}
          aria-invalid={Boolean(visibleErrors.email)}
          aria-describedby={visibleErrors.email ? "admin-email-error" : undefined}
          className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
          onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          onChange={(event) => updateValue("email", event.target.value)}
        />

        {visibleErrors.email ? (
          <p id="admin-email-error" className="mt-2 text-sm text-red-600">
            {visibleErrors.email}
          </p>
        ) : null}
      </div>

      <PasswordInput
        id="admin-password"
        name="password"
        value={values.password}
        required
        disabled={pending}
        error={visibleErrors.password}
        onBlur={() => setTouched((current) => ({ ...current, password: true }))}
        onChange={(value) => updateValue("password", value)}
      />

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-3 text-gray-600">
          <input
            type="checkbox"
            name="rememberMe"
            checked={values.rememberMe}
            disabled={pending}
            className="h-4 w-4 rounded border-gray-300 text-[#C89B3C] focus:ring-[#C89B3C] disabled:cursor-not-allowed"
            onChange={(event) => updateValue("rememberMe", event.target.checked)}
          />
          <span>Remember me</span>
        </label>

        <a
          href="#"
          className="font-medium text-[#1F1F1F] transition hover:text-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4"
        >
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#1F1F1F] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C89B3C] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4 disabled:cursor-not-allowed disabled:bg-[#1F1F1F]/60"
      >
        {pending ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        ) : null}
        {pending ? "Signing In..." : "Sign In"}
      </button>

      <div className="border-t border-gray-100 pt-5 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-4"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Return to Website
        </Link>
      </div>
    </form>
  );
}
