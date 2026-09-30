import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const LabDashboard: React.FC = () => {
  const { setLabTab, setSelectedBatchId, batches } = useApp();

  const handleStartTest = (batchId: string) => {
    setSelectedBatchId(batchId);
    setLabTab('testing');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Greeting */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Good Morning, Dr. Priya 👋
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>HONIVA NAEL Accredited Quality Testing Facility • Guntur Hub</span>
        </p>
      </div>

      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-card border border-blue-200 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 flex items-center justify-between">
        <div className="space-y-2 max-w-md">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-500 text-white px-2.5 py-0.5 rounded">
            ISO 17025 Accredited Lab
          </span>
          <h3 className="text-xl font-bold font-serif text-white">FSSAI Honey Purity & Adulteration Screening</h3>
          <p className="text-xs text-slate-300">
            Real-time spectrometry, moisture analysis, and C4 sugar HPLC testing.
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 backdrop-blur-md flex items-center justify-center text-blue-400 font-bold text-3xl border border-blue-400/30">
          🧪
        </div>
      </div>

      {/* Stats Cards - Second Design from Image 1 */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        
        <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-slate-600 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Total</span>
            <br />
            <span>Samples</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-3">24</span>
        </div>

        <div className="bg-emerald-50/20 p-3.5 sm:p-4 rounded-3xl border border-emerald-400/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-emerald-700 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Tested &</span>
            <br />
            <span>Certified</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono mt-3">18</span>
        </div>

        <div className="bg-amber-50/30 p-3.5 sm:p-4 rounded-3xl border border-amber-300/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-amber-800 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Pending</span>
            <br />
            <span>Screening</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono mt-3">4</span>
        </div>

        <div className="bg-red-50/50 p-3.5 sm:p-4 rounded-3xl border border-red-300 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-red-700 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Flagged /</span>
            <br />
            <span>Retested</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono mt-3">2</span>
        </div>
      </div>

      {/* Pending Samples Action Feed */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-base">Pending Honey Samples</h4>
          <button onClick={() => setLabTab('samples')} className="text-xs font-bold text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {batches.slice(0, 3).map((b) => (
            <div key={b.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  🧪
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{b.id}</span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {b.honeyType}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Submitted by {b.beekeeperName} • {b.location}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartTest(b.id)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-xs"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
