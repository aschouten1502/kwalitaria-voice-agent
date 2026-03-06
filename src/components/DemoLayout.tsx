"use client";

import { DemoProvider } from "@/context/DemoContext";
import SmsPanel from "./SmsPanel";
import VoicePanel from "./VoicePanel";
import CmsPanel from "./CmsPanel";

export default function DemoLayout() {
  return (
    <DemoProvider>
      <div className="h-screen flex flex-col bg-gray-900">
        {/* Header */}
        <header className="h-14 bg-gradient-to-r from-orange-600 to-orange-500 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                Kwalitaria
              </h1>
              <p className="text-orange-200 text-[10px] leading-tight">
                Voice Agent Demo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-orange-800/50 text-orange-200 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider">
              Demo Modus
            </span>
          </div>
        </header>

        {/* Three-panel grid */}
        <div className="flex-1 grid grid-cols-[30%_25%_45%] overflow-hidden">
          <SmsPanel />
          <VoicePanel />
          <CmsPanel />
        </div>
      </div>
    </DemoProvider>
  );
}
