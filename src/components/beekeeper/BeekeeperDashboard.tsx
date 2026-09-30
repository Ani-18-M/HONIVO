import React from 'react';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, AlertTriangle, ShieldCheck, Scale, Plus, ArrowUpRight, ChevronRight } from 'lucide-react';

export const BeekeeperDashboard: React.FC = () => {
  const { setBeekeeperTab, setSelectedHiveId, hives } = useApp();

  const healthyCount = hives.filter((h) => h.status === 'healthy').length;
  const alertCount = hives.filter((h) => h.status !== 'healthy').length;
  const totalWeight = hives.reduce((acc, h) => acc + h.weight, 0).toFixed(0);

  const overviewData = [
    { time: '6 AM', temp: 24, weight: 810 },
    { time: '9 AM', temp: 28, weight: 825 },
    { time: '12 PM', temp: 33, weight: 835 },
    { time: '3 PM', temp: 34, weight: 840 },
    { time: '6 PM', temp: 30, weight: 842 },
    { time: '9 PM', temp: 27, weight: 842 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Good Morning, Ravi Kumar 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Narasaraopet Apiary • Andhra Pradesh</span>
          </p>
        </div>

        <button
          onClick={() => setBeekeeperTab('create_batch')}
          className="self-start sm:self-auto py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center gap-2 transition-transform transform active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create Honey Batch</span>
        </button>
      </div>

      {/* Hero Card with Apiary Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-card border border-amber-200/80 bg-slate-900 text-white min-h-[160px] flex items-end p-6">
        <img
          src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80"
          alt="Apiary Farm"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between w-full gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded">
              Active Apiary Telemetry
            </span>
            <h3 className="text-xl font-bold font-serif mt-1 text-white">Narasaraopet Smart Hive Cluster</h3>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <Sun className="w-6 h-6 text-amber-400" />
            <div>
              <span className="text-base font-extrabold text-white">28°C Clear</span>
              <span className="block text-[10px] text-slate-300">Humidity 65%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid - Second Design from Image 1 */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        
        {/* Card 1: Total Hives */}
        <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-slate-600 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Total</span>
            <br />
            <span>Hives</span>
          </div>
          <div className="flex items-baseline justify-between gap-1 mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{hives.length}</span>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200/80">
              Online
            </span>
          </div>
        </div>

        {/* Card 2: Healthy */}
        <div className="bg-emerald-50/20 p-3.5 sm:p-4 rounded-3xl border border-emerald-400/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-emerald-700 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Healthy</span>
          </div>
          <div className="flex items-center justify-between gap-1 mt-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">{healthyCount}</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500 stroke-[2.5] flex-shrink-0" />
          </div>
        </div>

        {/* Card 3: Alerts Needed */}
        <div
          onClick={() => {
            setSelectedHiveId('Hive 04');
            setBeekeeperTab('hive_details');
          }}
          className="bg-red-50/50 p-3.5 sm:p-4 rounded-3xl border border-red-300 shadow-xs flex flex-col justify-between min-h-[145px] cursor-pointer hover:bg-red-100/60 transition-colors"
        >
          <div className="text-red-700 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Alerts</span>
            <br />
            <span>Needed</span>
          </div>
          <div className="flex items-center justify-between gap-1 mt-3">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">{alertCount}</span>
            <AlertTriangle className="w-5 h-5 text-red-400 stroke-[2.2] animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Card 4: Total Hive Weight */}
        <div className="bg-amber-50/30 p-3.5 sm:p-4 rounded-3xl border border-amber-300/90 shadow-xs flex flex-col justify-between min-h-[145px]">
          <div className="text-amber-800 font-extrabold text-xs sm:text-sm leading-tight">
            <span>Total</span>
            <br />
            <span>Hive</span>
            <br />
            <span>Weight</span>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">{totalWeight}</span>
              <Scale className="w-4 h-4 text-amber-500 stroke-[2.5] flex-shrink-0" />
            </div>
            <span className="text-[11px] font-bold text-amber-700 block mt-0.5">kg</span>
          </div>
        </div>
      </div>

      {/* Critical Alert Spotlight Banner */}
      {alertCount > 0 && (
        <div
          onClick={() => {
            setSelectedHiveId('Hive 04');
            setBeekeeperTab('hive_details');
          }}
          className="bg-gradient-to-r from-red-500 to-amber-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-100">Critical Attention Required</span>
              <h4 className="font-extrabold text-sm">Hive 04 — Abnormal Temperature Pattern (34.8°C)</h4>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Today's Apiary Weight & Temp Overview</h4>
            <p className="text-xs text-slate-500">Live 24-hour IoT sensor telemetry</p>
          </div>
          <button
            onClick={() => setBeekeeperTab('analytics')}
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>Full Analytics</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={overviewData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f59e0b' }} />
              <Area type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#weightGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
