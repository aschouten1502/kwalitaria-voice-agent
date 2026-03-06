"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Order, SmsMessage, DemoStats } from "@/lib/types";

interface TranscriptMessage {
  role: string;
  text: string;
  timestamp: string;
}

interface DemoContextType {
  orders: Order[];
  smsMessages: SmsMessage[];
  stats: DemoStats;
  isCallActive: boolean;
  transcriptMessages: TranscriptMessage[];
  refreshData: () => Promise<void>;
  setCallActive: (active: boolean) => void;
  addTranscriptMessage: (role: string, text: string) => void;
  clearTranscript: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function useDemoContext() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoContext must be used within DemoProvider");
  return ctx;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [smsMessages, setSmsMessages] = useState<SmsMessage[]>([]);
  const [stats, setStats] = useState<DemoStats>({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    callCount: 0,
  });
  const [isCallActive, setCallActive] = useState(false);
  const [transcriptMessages, setTranscriptMessages] = useState<
    TranscriptMessage[]
  >([]);

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch("/api/vapi");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setSmsMessages(data.smsMessages);
        setStats(data.stats);
      }
    } catch {
      // Silently fail on network errors (demo)
    }
  }, []);

  const addTranscriptMessage = useCallback((role: string, text: string) => {
    setTranscriptMessages((prev) => [
      ...prev,
      { role, text, timestamp: new Date().toISOString() },
    ]);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscriptMessages([]);
  }, []);

  // Poll for state updates
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, isCallActive ? 1000 : 2000);
    return () => clearInterval(interval);
  }, [refreshData, isCallActive]);

  return (
    <DemoContext.Provider
      value={{
        orders,
        smsMessages,
        stats,
        isCallActive,
        transcriptMessages,
        refreshData,
        setCallActive,
        addTranscriptMessage,
        clearTranscript,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
