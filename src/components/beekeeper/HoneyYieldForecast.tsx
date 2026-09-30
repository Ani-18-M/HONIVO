import React from 'react';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, Calendar, Thermometer, Droplets, Scale, Activity, ArrowRight } from 'lucide-react';

export const HoneyYieldForecast: React.FC = () => {
  const { setBeekeeperTab, selectedHiveId } = useApp();

  const forecastData = [
    { date: '01 Oct', yield: 12.0 },
    { date: '04 Oct', yield: 14.2 },
    { date: '07 Oct', yield: 16.1 },
    { date: '10 Oct', yield: 17.8 },
    { date: '12 Oct (Harvest)', yield: 18.4 },
  ];

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBeekeeperTab('ai_health')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Honey Yield Forecast</h3>
          <p className="text-xs text-amber-700 font-bold">{selectedHiveId}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Primary Forecast Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 rounded-3xl shadow-honey space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-black tracking-wider bg-black/15 px-2.5 py-0.5 rounded text-amber-950">
            AI Yield Prediction
          </span>
          <span className="text-xs font-bold text-amber-950 bg-white/30 px-2 py-0.5 rounded-full">
            Confidence: 86%
          </span>
        </div>

        <div>
          <span className="text-xs font-bold text-amber-950 block">Expected Harvest</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black font-mono tracking-tight text-white">18.4 kg</span>
            <span className="text-xs font-bold text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12% vs previous
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-amber-400/50 flex items-center justify-between text-xs text-amber-950 font-semibold">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Projected Date: 12 Oct 2026
          </span>
          <span className="font-bold">Grade: Premium Monofloral</span>
        </div>
      </div>

      {/* Yield Curve Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm">Accumulation Trajectory</h4>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={10} domain={[10, 20]} />
              <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#10b981' }} />
              <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#forecastGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Influencing Factors Table */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm">Influencing Environmental Factors</h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Thermometer className="w-3.5 h-3.5 text-amber-600" /> Temperature
            </span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Positive</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Droplets className="w-3.5 h-3.5 text-blue-500" /> Humidity
            </span>
            <span className="font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">Neutral</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Scale className="w-3.5 h-3.5 text-amber-600" /> Hive Weight
            </span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Positive</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Activity className="w-3.5 h-3.5 text-amber-600" /> Activity
            </span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Positive</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setBeekeeperTab('create_batch')}
        className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
      >
        <span>Proceed to Create Honey Batch</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
