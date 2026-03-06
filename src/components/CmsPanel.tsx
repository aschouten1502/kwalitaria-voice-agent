"use client";

import { useState, useCallback } from "react";
import { useDemoContext } from "@/context/DemoContext";
import OrderCard from "./OrderCard";
import MenuViewer from "./MenuViewer";
import StatsBar from "./StatsBar";
import type { Order } from "@/lib/types";

type Tab = "bestellingen" | "menu" | "stats";

export default function CmsPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("bestellingen");
  const { orders, stats, refreshData } = useDemoContext();

  const handleStatusChange = useCallback(
    async (id: string, status: Order["status"]) => {
      await fetch(`/api/vapi?action=update-status&id=${id}&status=${status}`);
      refreshData();
    },
    [refreshData]
  );

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "bestellingen", label: "Bestellingen", count: orders.length },
    { id: "menu", label: "Menu" },
    { id: "stats", label: "Statistieken" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Header with tabs */}
      <div className="border-b border-gray-700">
        <div className="px-4 py-2 flex items-center gap-1">
          <svg className="w-4 h-4 text-orange-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <h2 className="text-white font-semibold text-sm mr-4">CMS Dashboard</h2>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-orange-500/20 text-orange-400"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-1.5 bg-orange-500/30 text-orange-300 px-1.5 py-0.5 rounded-full text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "bestellingen" && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="w-16 h-16 text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-500 text-sm">Nog geen bestellingen</p>
                <p className="text-gray-600 text-xs mt-1">
                  Bestellingen verschijnen hier zodra klanten bellen
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        )}

        {activeTab === "menu" && <MenuViewer />}

        {activeTab === "stats" && (
          <div>
            <StatsBar stats={stats} />
            <div className="mt-6 bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-gray-300 text-sm font-medium mb-2">
                Over deze demo
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Dit is een demo van het Kwalitaria Voice Agent systeem. Alle data
                is in-memory en wordt gereset bij het herstarten van de server.
                In productie wordt dit gekoppeld aan een database, echte SMS via
                Twilio, en een betaalsysteem via Mollie.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
