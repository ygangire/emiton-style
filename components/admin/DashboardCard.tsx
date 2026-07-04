import { LucideIcon } from "lucide-react";
import {
  dashboardColors,
  DashboardColor,
} from "@/lib/dashboard";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: DashboardColor;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "primary",
}: DashboardCardProps) {
  const styles = dashboardColors[color];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-[#1F1F1F]">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${styles.bg}`}
        >
          <Icon className={styles.text} size={28} />
        </div>
      </div>
    </div>
  );
}