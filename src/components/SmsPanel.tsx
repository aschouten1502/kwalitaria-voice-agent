"use client";

import { useEffect, useRef } from "react";
import { useDemoContext } from "@/context/DemoContext";

export default function SmsPanel() {
  const { smsMessages } = useDemoContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [smsMessages]);

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h2 className="text-white font-semibold text-sm">SMS Berichten</h2>
        <span className="text-gray-500 text-xs ml-auto">
          {smsMessages.length} berichten
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {smsMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <svg className="w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-600 text-sm">Nog geen berichten</p>
            <p className="text-gray-700 text-xs mt-1">
              Berichten verschijnen hier na een bestelling
            </p>
          </div>
        ) : (
          smsMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "kwalitaria" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.from === "kwalitaria"
                    ? "bg-orange-500 text-white rounded-br-md"
                    : "bg-gray-700 text-gray-200 rounded-bl-md"
                }`}
              >
                <p className="text-xs font-medium opacity-70 mb-1">
                  {msg.from === "kwalitaria" ? "Kwalitaria" : "Klant"}
                </p>
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.from === "kwalitaria" ? "text-orange-200" : "text-gray-500"
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString("nl-NL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
