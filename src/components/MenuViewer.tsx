"use client";

import { useState } from "react";
import { menuData } from "@/lib/menu-data";

export default function MenuViewer() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {menuData.categories.map((cat) => (
        <div key={cat.name} className="rounded-lg overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === cat.name ? null : cat.name)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          >
            <span className="text-gray-200 text-sm font-medium">
              {cat.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">
                {cat.items.length} items
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  expanded === cat.name ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {expanded === cat.name && (
            <div className="bg-gray-800/50 px-3 py-2 space-y-1">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center py-1"
                >
                  <span className="text-gray-300 text-xs">{item.name}</span>
                  <span className="text-orange-400 text-xs font-medium">
                    EUR {item.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
