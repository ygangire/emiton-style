import {
  ShoppingBag,
  FolderKanban,
  Package,
  Users,
} from "lucide-react";

import DashboardCard from "@/components/admin/DashboardCard";
import AdminContainer from "@/components/admin/AdminContainer";

export default function DashboardPage() {
  return (
    <AdminContainer title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Products"
          value={0}
          icon={ShoppingBag}
        />

        <DashboardCard
          title="Collections"
          value={0}
          icon={FolderKanban}
        />

        <DashboardCard
          title="Orders"
          value={0}
          icon={Package}
        />

        <DashboardCard
          title="Customers"
          value={0}
          icon={Users}
        />
      </div>
    </AdminContainer>
  );
}