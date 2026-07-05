import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { dashboardColors, DashboardColor } from "@/lib/dashboard";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  footer?: string;
  icon: LucideIcon;
  color?: DashboardColor;
}

export default function DashboardCard({
  title,
  value,
  change,
  trend = "neutral",
  footer,
  icon: Icon,
  color = "primary",
}: DashboardCardProps) {
  const styles = dashboardColors[color];

  const trendStyles = {
    up: "text-green-600",
    down: "text-red-500",
    neutral: "text-gray-500",
  };

  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1F1F1F]">{value}</h2>
        </div>

        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${styles.bg}`}>
          <Icon className={styles.text} size={28} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {change ? (
          <span className={`inline-flex items-center gap-1 text-sm font-medium ${trendStyles[trend]}`}>
            {TrendIcon ? <TrendIcon size={16} /> : null}
            {change}
          </span>
        ) : (
          <span className="text-sm text-gray-400">No update</span>
        )}

        <span className="text-xs uppercase tracking-wide text-gray-400">Live</span>
      </div>

      {footer ? <p className="mt-4 text-sm text-gray-500">{footer}</p> : null}
    </div>
  );
}