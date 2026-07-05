import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  icon: LucideIcon;
}

export default function EmptyState({ title, description, buttonText, icon: Icon }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-[#FAF8F5] p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E8C7] text-[#C89B3C]">
        <Icon size={24} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#1F1F1F]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">{description}</p>
      {buttonText ? (
        <button type="button" className="mt-6 rounded-full bg-[#1F1F1F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#C89B3C]">
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}
