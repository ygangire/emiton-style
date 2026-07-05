interface RoleBadgeProps {
  role?: string | null;
}

const roleStyles: Record<string, string> = {
  ADMIN: "bg-[#1F1F1F] text-white",
  MANAGER: "bg-[#F5F1EA] text-[#1F1F1F]",
  EDITOR: "bg-[#C89B3C] text-[#1F1F1F]",
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const normalizedRole = role?.toUpperCase();
  const style = roleStyles[normalizedRole ?? ""] ?? "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      {normalizedRole ?? "USER"}
    </span>
  );
}
