import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-[#1F1F1F]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">{description}</p>
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
