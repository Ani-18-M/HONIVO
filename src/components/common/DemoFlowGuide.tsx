import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Activity, PackagePlus, FlaskConical, ShieldCheck, QrCode, Smartphone, Monitor } from 'lucide-react';

export const DemoFlowGuide: React.FC = () => {
  const { runDemoStep, isMobileFrameView, setIsMobileFrameView, role } = useApp();

  if (role === 'splash') return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 text-white px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 backdrop-blur-md flex items-center gap-2 max-w-full overflow-x-auto text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 font-bold text-amber-400 border-r border-slate-700 pr-3 mr-1">
        <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="hidden sm:inline">Hackathon Demo Flow:</span>
        <span className="sm:hidden">Demo:</span>
      </div>

      <button
        onClick={() => runDemoStep(1)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-200 transition-colors whitespace-nowrap"
        title="Step 1: Hive 04 Alert"
      >
        <Activity className="w-3.5 h-3.5 text-amber-400" />
        <span>1. Hive Alert</span>
      </button>

      <button
        onClick={() => runDemoStep(2)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-200 transition-colors whitespace-nowrap"
        title="Step 2: Beekeeper creates honey batch"
      >
        <PackagePlus className="w-3.5 h-3.5 text-amber-400" />
        <span>2. Create Batch</span>
      </button>

      <button
        onClick={() => runDemoStep(3)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-200 transition-colors whitespace-nowrap"
        title="Step 3: Lab Officer tests batch"
      >
        <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
        <span>3. Lab Test</span>
      </button>

      <button
        onClick={() => runDemoStep(4)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-200 transition-colors whitespace-nowrap"
        title="Step 4: Immutable Ledger Record"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
        <span>4. Blockchain</span>
      </button>

      <button
        onClick={() => runDemoStep(5)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/30 text-amber-200 transition-colors whitespace-nowrap"
        title="Step 5: Customer QR Verification"
      >
        <QrCode className="w-3.5 h-3.5 text-amber-400" />
        <span>5. Scan & Trace</span>
      </button>

      <div className="border-l border-slate-700 pl-3 ml-1 flex items-center gap-1">
        <button
          onClick={() => setIsMobileFrameView(!isMobileFrameView)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
            isMobileFrameView ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
          title="Toggle Mobile Screen Frame Preview (matching reference image)"
        >
          {isMobileFrameView ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{isMobileFrameView ? 'Phone Frame View' : 'Web View'}</span>
        </button>
      </div>
    </div>
  );
};
