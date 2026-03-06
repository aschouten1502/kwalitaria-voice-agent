"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
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
  setCallActive: (active: boolean) => void;
  addTranscriptMessage: (role: string, text: string) => void;
  clearTranscript: () => void;
  addOrderFromToolCall: (toolCallParams: Record<string, unknown>, toolCallResult: Record<string, unknown>) => void;
  addSmsMessage: (from: "klant" | "kwalitaria", text: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
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
  const orderCounterRef = useRef(1000);

  const addTranscriptMessage = useCallback((role: string, text: string) => {
    setTranscriptMessages((prev) => [
      ...prev,
      { role, text, timestamp: new Date().toISOString() },
    ]);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscriptMessages([]);
  }, []);

  const addSmsMessage = useCallback((from: "klant" | "kwalitaria", text: string) => {
    const msg: SmsMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      from,
      text,
      timestamp: new Date().toISOString(),
    };
    setSmsMessages((prev) => [...prev, msg]);
  }, []);

  const addOrderFromToolCall = useCallback(
    (toolCallParams: Record<string, unknown>, toolCallResult: Record<string, unknown>) => {
      orderCounterRef.current++;
      const now = new Date();

      const params = toolCallParams as {
        customer_name?: string;
        customer_phone?: string;
        customer_address?: string;
        postal_code?: string;
        type?: string;
        items?: Array<{ name: string; quantity: number; price_cents: number }>;
        notes?: string;
      };

      const items = params.items ?? [];
      const totalCents = items.reduce(
        (sum, item) => sum + item.price_cents * item.quantity,
        0
      );
      const deliveryCost =
        params.type === "bezorgen" && totalCents < 1500 ? 250 : 0;
      const finalTotal = totalCents + deliveryCost;

      const orderNumber =
        (toolCallResult as { order_number?: number }).order_number ??
        orderCounterRef.current;

      const order: Order = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        order_number: orderNumber,
        customer_name: params.customer_name ?? "Onbekend",
        customer_phone: params.customer_phone ?? "",
        customer_address: params.customer_address,
        postal_code: params.postal_code,
        type: (params.type as "afhalen" | "bezorgen") ?? "afhalen",
        items,
        notes: params.notes,
        total_cents: finalTotal,
        status: "nieuw",
        created_at: now.toISOString(),
        estimated_ready: params.type === "afhalen" ? "15-20 minuten" : "30-45 minuten",
      };

      setOrders((prev) => [order, ...prev]);

      // Update stats
      setStats((prev) => {
        const newTotal = prev.totalOrders + 1;
        const newRevenue = prev.totalRevenue + finalTotal;
        return {
          totalOrders: newTotal,
          totalRevenue: newRevenue,
          avgOrderValue: Math.round(newRevenue / newTotal),
          callCount: prev.callCount,
        };
      });

      // Generate SMS messages
      const itemsSummary = items
        .map((i) => `${i.quantity}x ${i.name}`)
        .join(", ");

      addSmsMessage("klant", `Nieuwe bestelling: ${itemsSummary}`);

      const formatEuro = (cents: number) =>
        `EUR ${(cents / 100).toFixed(2).replace(".", ",")}`;

      let confirmText = `Bedankt ${params.customer_name ?? ""}! Je bestelling #${orderNumber} is ontvangen.\n\n`;
      confirmText += items
        .map((i) => `${i.quantity}x ${i.name} - ${formatEuro(i.price_cents * i.quantity)}`)
        .join("\n");
      if (deliveryCost > 0) {
        confirmText += `\nBezorgkosten: ${formatEuro(deliveryCost)}`;
      }
      confirmText += `\n\nTotaal: ${formatEuro(finalTotal)}`;
      confirmText += `\n${params.type === "afhalen" ? "Klaar over" : "Bezorging over"} ${order.estimated_ready}`;

      addSmsMessage("kwalitaria", confirmText);
    },
    [addSmsMessage]
  );

  const updateOrderStatus = useCallback(
    (id: string, status: Order["status"]) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    },
    []
  );

  return (
    <DemoContext.Provider
      value={{
        orders,
        smsMessages,
        stats,
        isCallActive,
        transcriptMessages,
        setCallActive,
        addTranscriptMessage,
        clearTranscript,
        addOrderFromToolCall,
        addSmsMessage,
        updateOrderStatus,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
