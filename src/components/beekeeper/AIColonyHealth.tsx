import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Sparkles, UserCheck, Calendar } from 'lucide-react';

export const AIColonyHealth: React.FC = () => {
  const { setBeekeeperTab, selectedHiveId, hives } = useApp();

  const hive = hives.find((h) => h.id === selectedHiveId) || hives[3] || hives[0];

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBeekeeperTab('hive_details')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">AI Colony Health</h3>
          <p className="text-xs text-amber-700 font-bold">{hive.id}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Radial Health Gauge Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-amber-200 text-center space-y-4">
        
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          {/* Radial Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="68" stroke="#f1f5f9" strokeWidth="14" fill="transparent" />
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#ef4444"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={427}
              strokeDashoffset={427 - (427 * 78) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-900 font-mono">78%</span>
            <span className="text-[11px] font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full mt-1 border border-red-200">
              Attention Required
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Decision-Support Diagnostic Model • Trained on 120,000+ Apiculture Telemetry Data
        </p>
      </div>

      {/* Key Risk Indicators */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3.5">
        <h4 className="font-bold text-slate-900 text-sm">Key Health Indicators</h4>

        {/* Indicator 1 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Temperature Pattern Stress</span>
            <span className="text-red-600 font-mono font-bold">80%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full w-[80%]"></div>
          </div>
        </div>

        {/* Indicator 2 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Humidity Balance</span>
            <span className="text-amber-600 font-mono font-bold">65%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[65%]"></div>
          </div>
        </div>

        {/* Indicator 3 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Weight Accumulation Variation</span>
            <span className="text-amber-600 font-mono font-bold">72%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-[72%]"></div>
          </div>
        </div>

        {/* Indicator 4 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700">Worker Activity Acoustic Pattern</span>
            <span className="text-red-600 font-mono font-bold">85%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full w-[85%]"></div>
          </div>
        </div>
      </div>

      {/* AI Insight Box */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>AI Insight Notice</span>
        </div>
        <p className="text-slate-700 leading-relaxed">
          "Recent temperature and activity patterns differ from the hive's normal baseline. Possible heat ventilation constraint or early swarm preparation."
        </p>
        <div className="p-3 bg-white rounded-xl font-bold text-amber-950 border border-amber-200">
          Recommended Action: Schedule an inspection within the next 24 hours.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => alert(`Booking Expert Visit for ${hive.id}... Veteran Apiculturist notified!`)}
          className="py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey text-center flex items-center justify-center gap-1.5"
        >
          <UserCheck className="w-4 h-4" />
          <span>Book Expert Visit</span>
        </button>

        <button
          onClick={() => setBeekeeperTab('yield')}
          className="py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Yield Forecast</span>
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-400 italic">
        *HONIVA AI is a decision-support tool, not a definitive agricultural disease diagnosis.
      </p>
    </div>
  );
};
