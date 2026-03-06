import { NextResponse } from "next/server";
import { formatMenuForVoice } from "@/lib/menu-data";
import { checkDelivery } from "@/lib/delivery-zones";
import {
  addOrder,
  getOrders,
  getSmsMessages,
  getStats,
  addCallLog,
  updateOrderStatus,
} from "@/lib/store";

// GET: Polling endpoint for frontend
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // Handle order status updates via GET (simple for demo)
  if (action === "update-status") {
    const id = searchParams.get("id");
    const status = searchParams.get("status") as
      | "nieuw"
      | "in_bereiding"
      | "klaar"
      | "bezorgd";
    if (id && status) {
      updateOrderStatus(id, status);
    }
  }

  return NextResponse.json({
    orders: getOrders(),
    smsMessages: getSmsMessages(),
    stats: getStats(),
  });
}

// POST: Vapi webhook handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messageType = body.message?.type;

    switch (messageType) {
      case "tool-calls":
        return handleToolCalls(body);
      case "end-of-call-report":
        return handleEndOfCallReport(body);
      default:
        return NextResponse.json({});
    }
  } catch (error) {
    console.error("Vapi webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function handleToolCalls(body: Record<string, unknown>) {
  const message = body.message as {
    toolCallList?: Array<{
      id: string;
      function?: { name: string; arguments: Record<string, unknown> };
    }>;
    toolWithToolCallList?: Array<{
      toolCall: {
        id: string;
        function: { name: string; arguments: Record<string, unknown> };
      };
    }>;
  };

  // Vapi can send tool calls in different formats
  const toolCalls =
    message.toolCallList?.map((tc) => ({
      id: tc.id,
      name: tc.function?.name ?? "",
      params: tc.function?.arguments ?? {},
    })) ??
    message.toolWithToolCallList?.map((tc) => ({
      id: tc.toolCall.id,
      name: tc.toolCall.function.name,
      params:
        typeof tc.toolCall.function.arguments === "string"
          ? JSON.parse(tc.toolCall.function.arguments)
          : tc.toolCall.function.arguments,
    })) ??
    [];

  const results = toolCalls.map((tc) => {
    let result: unknown;

    switch (tc.name) {
      case "get_menu":
        result = { menu: formatMenuForVoice() };
        break;

      case "check_delivery":
        result = checkDelivery(String(tc.params.postal_code ?? ""));
        break;

      case "place_order": {
        const params = tc.params as {
          customer_name?: string;
          customer_phone?: string;
          customer_address?: string;
          postal_code?: string;
          type?: string;
          items?: Array<{
            name: string;
            quantity: number;
            price_cents: number;
          }>;
          notes?: string;
        };

        const order = addOrder({
          customer_name: params.customer_name ?? "Onbekend",
          customer_phone: params.customer_phone ?? "",
          customer_address: params.customer_address,
          postal_code: params.postal_code,
          type: (params.type as "afhalen" | "bezorgen") ?? "afhalen",
          items: params.items ?? [],
          notes: params.notes,
        });

        result = {
          order_number: order.order_number,
          total: `EUR ${(order.total_cents / 100).toFixed(2).replace(".", ",")}`,
          estimated_ready: order.estimated_ready,
          message: `Bestelling #${order.order_number} is geplaatst!`,
        };
        break;
      }

      default:
        result = { error: `Onbekende tool: ${tc.name}` };
    }

    return {
      toolCallId: tc.id,
      result: typeof result === "string" ? result : JSON.stringify(result),
    };
  });

  return NextResponse.json({ results });
}

function handleEndOfCallReport(body: Record<string, unknown>) {
  const message = body.message as {
    endedReason?: string;
    artifact?: {
      transcript?: string;
      messages?: Array<{ role: string; message: string }>;
    };
    startedAt?: string;
    endedAt?: string;
    call?: { id?: string };
  };

  const startedAt = message.startedAt ? new Date(message.startedAt) : null;
  const endedAt = message.endedAt ? new Date(message.endedAt) : null;
  const durationSeconds =
    startedAt && endedAt
      ? Math.round((endedAt.getTime() - startedAt.getTime()) / 1000)
      : undefined;

  addCallLog({
    call_id: message.call?.id ?? "unknown",
    duration_seconds: durationSeconds,
    ended_reason: message.endedReason,
    transcript: message.artifact?.transcript,
  });

  return NextResponse.json({});
}
