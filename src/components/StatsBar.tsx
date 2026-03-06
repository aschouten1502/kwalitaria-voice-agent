"use client";

import type { DemoStats } from "@/lib/types";
import { formatEuro } from "@/lib/utils";

export default function StatsBar({ stats }: { stats: DemoStats }) {
  const items = [
    {
      label: "Bestellingen",
      value: String(stats.totalOrders),
      color: "text-orange-400",
    },
    {
      label: "Omzet",
      value: formatEuro(stats.totalRevenue),
      color: "text-green-400",
    },
    {
      label: "Gem. bestelling",
      value: stats.avgOrderValue > 0 ? formatEuro(stats.avgOrderValue) : "-",
      color: "text-blue-400",
    },
    {
      label: "Gesprekken",
      value: String(stats.callCount),
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-gray-700/30 rounded-lg p-3 text-center"
        >
          <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
