"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { useDemoContext } from "@/context/DemoContext";

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const {
    setCallActive,
    addTranscriptMessage,
    clearTranscript,
    addOrderFromToolCall,
  } = useDemoContext();

  // Store pending tool call params so we can match them with results
  const pendingToolCallsRef = useRef<Map<string, Record<string, unknown>>>(
    new Map()
  );

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey || publicKey === "your-vapi-public-key-here") {
      console.warn(
        "Vapi public key not configured. Set NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env.local"
      );
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setIsConnected(true);
      setIsLoading(false);
      setCallActive(true);
    });

    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
      setIsLoading(false);
      setCallActive(false);
    });

    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("volume-level", (level: number) => setVolumeLevel(level));

    vapi.on("message", (message: Record<string, unknown>) => {
      // Handle transcript messages
      if (message.type === "transcript") {
        const role = message.role as string;
        const text = message.transcript as string;
        if (text && message.transcriptType === "final") {
          addTranscriptMessage(role, text);
        }
      }

      // Capture tool-calls to store parameters
      if (message.type === "tool-calls") {
        const toolCallList = message.toolCallList as Array<{
          id: string;
          function?: { name: string; arguments: Record<string, unknown> };
        }> | undefined;

        if (toolCallList) {
          for (const tc of toolCallList) {
            if (tc.function?.name === "place_order") {
              pendingToolCallsRef.current.set(tc.id, tc.function.arguments);
            }
          }
        }
      }

      // Capture tool-calls-result to generate client-side orders/SMS
      if (message.type === "tool-calls-result") {
        const toolCallList = message.toolCallList as Array<{
          id: string;
          function?: { name: string; arguments: Record<string, unknown> };
          result?: string;
        }> | undefined;

        if (toolCallList) {
          for (const tc of toolCallList) {
            if (tc.function?.name === "place_order" && tc.result) {
              try {
                const result = JSON.parse(tc.result);
                // Get the original params from our pending map, or from the result itself
                const params =
                  pendingToolCallsRef.current.get(tc.id) ??
                  tc.function.arguments ??
                  {};
                addOrderFromToolCall(params, result);
                pendingToolCallsRef.current.delete(tc.id);
              } catch {
                console.error("Failed to parse place_order result");
              }
            }
          }
        }
      }
    });

    vapi.on("error", (error: unknown) => {
      console.error("Vapi error:", error);
      setIsLoading(false);
    });

    return () => {
      vapi.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCall = useCallback(() => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId || assistantId === "your-vapi-assistant-id-here") {
      alert(
        "Vapi Assistant ID niet geconfigureerd. Stel NEXT_PUBLIC_VAPI_ASSISTANT_ID in via .env.local"
      );
      return;
    }
    setIsLoading(true);
    clearTranscript();
    vapiRef.current?.start(assistantId);
  }, [clearTranscript]);

  const endCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  return {
    isConnected,
    isSpeaking,
    isLoading,
    volumeLevel,
    startCall,
    endCall,
  };
}
