import {
  ShoppingBag,
  FolderKanban,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import DashboardCard from "@/components/admin/DashboardCard";
import PageHeader from "@/components/admin/ui/PageHeader";
import Breadcrumbs from "@/components/admin/layout/Breadcrumbs";
import QuickActions from "@/components/admin/ui/QuickActions";
import RecentActivity from "@/components/admin/activity/RecentActivity";

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumbs />
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here’s an overview of your store and recent activity."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Products"
          value={0}
          change="0%"
          trend="neutral"
          icon={ShoppingBag}
          footer="No new products today"
        />

        <DashboardCard
          title="Collections"
          value={0}
          change="+8%"
          trend="up"
          icon={FolderKanban}
          footer="Compared to last month"
        />

        <DashboardCard
          title="Orders"
          value={0}
          change="-2%"
          trend="down"
          icon={Package}
          footer="Pending review"
        />

        <DashboardCard
          title="Customers"
          value={0}
          change="+12%"
          trend="up"
          icon={Users}
          footer="New signups"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#1F1F1F]">Performance</h3>
              <p className="text-sm text-gray-500">This month overview</p>
            </div>
            <div className="rounded-full bg-[#F5E8C7] p-2 text-[#C89B3C]">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-[#FAF8F5] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Revenue</span>
                <span className="flex items-center gap-1 font-medium text-green-600">
                  <ArrowUpRight size={16} /> +12%
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#1F1F1F]">$5,240</p>
            </div>

            <div className="rounded-xl bg-[#FAF8F5] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Conversion</span>
                <span className="flex items-center gap-1 font-medium text-red-500">
                  <ArrowDownRight size={16} /> -3%
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-[#1F1F1F]">3.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
