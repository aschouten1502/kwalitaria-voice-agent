# CLAUDE.md

## Project Overview

**Kwalitaria Voice Agent Demo** — A single-page Next.js application demonstrating a Dutch snack bar (Kwalitaria) AI voice ordering system. Customers talk to "Lisa", an AI assistant that takes phone orders via Vapi.

## Architecture

```
Browser (Vapi Web SDK) → Vapi Cloud → POST /api/vapi (tool-calls) → In-memory store
                                                                          ↓
Browser (polling GET /api/vapi) ← JSON response ← orders, SMS, stats
```

**Stack:**
- **Next.js 14+ App Router** — Frontend + API routes
- **Vapi Web SDK** (`@vapi-ai/web`) — Voice calls in browser
- **Tailwind CSS** — Styling (dark theme)
- **In-memory store** — No database (demo mode)

## Key Files

| File | Purpose |
|------|---------|
| `src/app/api/vapi/route.ts` | Vapi webhook handler (tool-calls + polling) |
| `src/lib/store.ts` | In-memory state (orders, SMS, call logs) |
| `src/lib/menu-data.ts` | Kwalitaria menu (56 items, 8 categories) |
| `src/lib/types.ts` | All TypeScript interfaces |
| `src/context/DemoContext.tsx` | React Context + polling sync |
| `src/hooks/useVapi.ts` | Vapi Web SDK wrapper hook |
| `src/components/DemoLayout.tsx` | Three-panel demo layout |

## Layout

Three panels on one screen:
- **Left (30%)**: Simulated SMS chat with order confirmations
- **Center (25%)**: Voice call button, live transcript, status
- **Right (45%)**: CMS with orders, menu viewer, stats

## API Route (`/api/vapi`)

- **POST**: Handles Vapi `tool-calls` and `end-of-call-report` events
- **GET**: Returns current state (orders, SMS messages, stats) for frontend polling
- Tools: `get_menu`, `check_delivery`, `place_order`

## Environment Variables

```
NEXT_PUBLIC_VAPI_PUBLIC_KEY    # Vapi public key (client-side)
NEXT_PUBLIC_VAPI_ASSISTANT_ID  # Vapi assistant ID (client-side)
VAPI_PRIVATE_KEY               # Vapi private key (server-side only)
```

## Commands

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint

## Language

All UI text is in **Dutch (Nederlands)**. The assistant speaks Dutch using informal "je".

## Reference Project

The original v1 project at `/d/Levtor/voice agent/Voiceagentsnackbar/` contains:
- `system-prompt.md` — Lisa's personality and conversation flow
- `knowledge-base.md` — FAQ, opening hours, delivery info
- `menu.json` — Source menu data
