import Link from "next/link";
import { PackagePlus, FolderPlus, UsersRound, ShoppingCart } from "lucide-react";

const actions = [
  { label: "Add Product", href: "/admin/products", icon: PackagePlus },
  { label: "Create Collection", href: "/admin/collections", icon: FolderPlus },
  { label: "Manage Users", href: "/admin/users", icon: UsersRound },
  { label: "View Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[#1F1F1F]">Quick Actions</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#FAF8F5] px-4 py-3 text-sm font-medium text-[#1F1F1F] transition hover:border-[#C89B3C] hover:bg-[#F5E8C7]"
            >
              <Icon size={18} className="text-[#C89B3C]" />
              {action.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
