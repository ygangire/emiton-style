"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  collections: "Collections",
  categories: "Categories",
  media: "Media",
  orders: "Orders",
  customers: "Customers",
  users: "Users",
  settings: "Settings",
  new: "New",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.reduce<Array<{ href: string; label: string }>>((acc, segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = labels[segment] ?? segment.replace(/-/g, " ");

    if (segment === "admin") {
      acc.push({ href: "/admin", label: "Dashboard" });
      return acc;
    }

    acc.push({ href, label: label.charAt(0).toUpperCase() + label.slice(1) });
    return acc;
  }, []);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
      <Link href="/admin" className="transition hover:text-[#C89B3C]">
        Dashboard
      </Link>

      {crumbs.slice(1).map((crumb) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <span>/</span>
          <Link href={crumb.href} className="transition hover:text-[#C89B3C]">
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
