import type { Order, OrderItem, SmsMessage, CallLog, DemoStats } from "./types";
import { generateId, formatEuro, formatTime } from "./utils";

let orderCounter = 1000;
const orders: Order[] = [];
const smsMessages: SmsMessage[] = [];
const callLogs: CallLog[] = [];

export function addOrder(data: {
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  postal_code?: string;
  type: "afhalen" | "bezorgen";
  items: OrderItem[];
  notes?: string;
}): Order {
  orderCounter++;
  const now = new Date();

  const totalCents = data.items.reduce(
    (sum, item) => sum + item.price_cents * item.quantity,
    0
  );

  const deliveryCost =
    data.type === "bezorgen" && totalCents < 1500 ? 250 : 0;
  const finalTotal = totalCents + deliveryCost;

  const estimatedMinutes = data.type === "afhalen" ? "15-20" : "30-45";
  const estimatedReady = `${estimatedMinutes} minuten`;

  const order: Order = {
    id: generateId(),
    order_number: orderCounter,
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    customer_address: data.customer_address,
    postal_code: data.postal_code,
    type: data.type,
    items: data.items,
    notes: data.notes,
    total_cents: finalTotal,
    status: "nieuw",
    created_at: now.toISOString(),
    estimated_ready: estimatedReady,
  };

  orders.unshift(order);

  // Auto-generate SMS messages
  const itemsSummary = data.items
    .map((i) => `${i.quantity}x ${i.name}`)
    .join(", ");

  addSmsMessage({
    from: "klant",
    text: `Nieuwe bestelling: ${itemsSummary}`,
  });

  let confirmText = `Bedankt ${data.customer_name}! Je bestelling #${order.order_number} is ontvangen.\n\n`;
  confirmText += data.items
    .map((i) => `${i.quantity}x ${i.name} - ${formatEuro(i.price_cents * i.quantity)}`)
    .join("\n");
  if (deliveryCost > 0) {
    confirmText += `\nBezorgkosten: ${formatEuro(deliveryCost)}`;
  }
  confirmText += `\n\nTotaal: ${formatEuro(finalTotal)}`;
  confirmText += `\n${data.type === "afhalen" ? "Klaar over" : "Bezorging over"} ${estimatedReady}`;
  confirmText += `\n\nTijd: ${formatTime(now)}`;

  addSmsMessage({
    from: "kwalitaria",
    text: confirmText,
  });

  return order;
}

export function getOrders(): Order[] {
  return orders;
}

export function updateOrderStatus(
  id: string,
  status: Order["status"]
): Order | null {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
}

export function addSmsMessage(msg: {
  from: "klant" | "kwalitaria";
  text: string;
}): SmsMessage {
  const message: SmsMessage = {
    id: generateId(),
    from: msg.from,
    text: msg.text,
    timestamp: new Date().toISOString(),
  };
  smsMessages.push(message);
  return message;
}

export function getSmsMessages(): SmsMessage[] {
  return smsMessages;
}

export function addCallLog(log: {
  call_id: string;
  duration_seconds?: number;
  ended_reason?: string;
  transcript?: string;
}): CallLog {
  const entry: CallLog = {
    id: generateId(),
    ...log,
    created_at: new Date().toISOString(),
  };
  callLogs.push(entry);
  return entry;
}

export function getCallLogs(): CallLog[] {
  return callLogs;
}

export function getStats(): DemoStats {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_cents, 0);
  return {
    totalOrders: orders.length,
    totalRevenue,
    avgOrderValue: orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0,
    callCount: callLogs.length,
  };
}
