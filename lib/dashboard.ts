export const dashboardColors = {
  primary: {
    bg: "bg-[#F5E8C7]",
    text: "text-[#C89B3C]",
  },
  success: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  warning: {
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  danger: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
} as const;

export type DashboardColor = keyof typeof dashboardColors;