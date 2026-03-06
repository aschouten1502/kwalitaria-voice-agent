"use client";

import { useVapi } from "@/hooks/useVapi";
import { useDemoContext } from "@/context/DemoContext";

export default function VoicePanel() {
  const { isConnected, isSpeaking, isLoading, volumeLevel, startCall, endCall } =
    useVapi();
  const { transcriptMessages } = useDemoContext();

  return (
    <div className="flex flex-col h-full bg-gray-850 border-x border-gray-700">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-700">
        <h2 className="text-white font-semibold text-sm">Telefoon</h2>
        <p className="text-gray-400 text-xs">
          {isConnected
            ? isSpeaking
              ? "Lisa spreekt..."
              : "Verbonden - luistert..."
            : "Klik om te bellen"}
        </p>
      </div>

      {/* Call Button Area */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center py-8 gap-4">
        {/* Audio Visualizer */}
        <div className="flex items-end gap-1 h-12">
          {[...Array(5)].map((_, i) => {
            const height = isConnected
              ? Math.max(8, Math.min(48, volumeLevel * 48 * (0.5 + Math.random() * 0.5)))
              : 8;
            return (
              <div
                key={i}
                className={`w-2 rounded-full transition-all duration-150 ${
                  isConnected
                    ? isSpeaking
                      ? "bg-orange-500"
                      : "bg-green-500"
                    : "bg-gray-600"
                }`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>

        {/* Call Button */}
        <button
          onClick={isConnected ? endCall : startCall}
          disabled={isLoading}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
            isLoading
              ? "bg-yellow-500 animate-pulse cursor-wait"
              : isConnected
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30"
              : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
          }`}
        >
          {isLoading ? (
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : isConnected ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )}
        </button>

        <p className="text-gray-400 text-xs">
          {isLoading ? "Verbinden..." : isConnected ? "Klik om op te hangen" : "Bel Kwalitaria"}
        </p>
      </div>

      {/* Live Transcript */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h3 className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
          Live Transcript
        </h3>
        <div className="space-y-2">
          {transcriptMessages.length === 0 ? (
            <p className="text-gray-600 text-xs italic">
              Start een gesprek om het transcript te zien...
            </p>
          ) : (
            transcriptMessages.map((msg, i) => (
              <div key={i} className="text-xs">
                <span
                  className={`font-medium ${
                    msg.role === "assistant" ? "text-orange-400" : "text-blue-400"
                  }`}
                >
                  {msg.role === "assistant" ? "Lisa" : "Klant"}:
                </span>{" "}
                <span className="text-gray-300">{msg.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
