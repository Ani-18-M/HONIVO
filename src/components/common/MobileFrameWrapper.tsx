import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center sm:p-4 md:p-6 select-none font-sans">
      
      {/* Smartphone Device Frame Container */}
      <div className="w-full sm:w-[410px] h-screen sm:h-[840px] bg-slate-900 sm:rounded-[48px] shadow-2xl border-0 sm:border-4 sm:border-slate-700/80 relative flex flex-col overflow-hidden ring-1 ring-amber-500/20">
        
        {/* Top Camera Notch (Only visible on desktop sm screens) */}
        <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-950 rounded-full z-50 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800"></div>
        </div>

        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-[#FAF8F5] sm:rounded-[40px] overflow-hidden flex flex-col relative pt-0 sm:pt-4">
          
          {/* iOS / Mobile Status Bar */}
          <div className="px-6 pt-3 pb-1.5 flex items-center justify-between text-xs font-semibold text-slate-800 z-40 bg-white/70 backdrop-blur-md select-none border-b border-slate-100">
            <span className="font-bold tracking-tight">9:41</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3 fill-slate-800" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-slate-800" />
            </div>
          </div>

          {/* Mobile Screen Content Scroll Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-full py-1.5 flex justify-center bg-white/90 backdrop-blur-md z-40 select-none border-t border-slate-100">
            <div className="w-32 h-1 bg-slate-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
