"use client";

import type { Order } from "@/lib/types";
import { formatEuro, formatDateTime } from "@/lib/utils";

const STATUS_CONFIG = {
  nieuw: { label: "Nieuw", color: "bg-yellow-500/20 text-yellow-400", next: "in_bereiding" as const },
  in_bereiding: { label: "In bereiding", color: "bg-blue-500/20 text-blue-400", next: "klaar" as const },
  klaar: { label: "Klaar", color: "bg-green-500/20 text-green-400", next: "bezorgd" as const },
  bezorgd: { label: "Afgerond", color: "bg-gray-500/20 text-gray-400", next: null },
};

export default function OrderCard({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
}) {
  const statusInfo = STATUS_CONFIG[order.status];

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm">
            #{order.order_number}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              order.type === "bezorgen"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {order.type === "bezorgen" ? "Bezorgen" : "Afhalen"}
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Customer */}
      <div className="text-gray-400 text-xs mb-2">
        <span className="text-gray-300">{order.customer_name}</span>
        {order.customer_phone && ` - ${order.customer_phone}`}
        {order.customer_address && (
          <div className="text-gray-500 mt-0.5">{order.customer_address}</div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-1 mb-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-gray-300">
              {item.quantity}x {item.name}
            </span>
            <span className="text-gray-400">
              {formatEuro(item.price_cents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {order.notes && (
        <p className="text-xs text-yellow-400/70 italic mb-2">
          Opmerking: {order.notes}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-600/50">
        <div>
          <span className="text-white font-semibold text-sm">
            {formatEuro(order.total_cents)}
          </span>
          <span className="text-gray-500 text-[10px] ml-2">
            {formatDateTime(order.created_at)}
          </span>
        </div>
        {statusInfo.next && (
          <button
            onClick={() => onStatusChange(order.id, statusInfo.next!)}
            className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-[10px] font-medium hover:bg-orange-500/30 transition-colors"
          >
            {STATUS_CONFIG[statusInfo.next].label} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
