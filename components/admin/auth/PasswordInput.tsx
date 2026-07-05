"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function PasswordInput({
  id,
  name,
  value,
  label = "Password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  required = false,
  disabled = false,
  error,
  onChange,
  onBlur,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#1F1F1F]">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          name={name}
          type={isVisible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm text-[#1F1F1F] outline-none transition placeholder:text-gray-400 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/15 disabled:cursor-not-allowed disabled:bg-gray-50"
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />

        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          disabled={disabled}
          className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#F5F1EA] hover:text-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
