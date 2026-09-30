import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, LogOut, MapPin, Flower2, CheckCircle2 } from 'lucide-react';

export const BeekeeperProfile: React.FC = () => {
  const { setRole, hives, batches } = useApp();

  const totalYield = batches.reduce((acc, b) => acc + (b.quantityKg || 0), 0);

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12 select-none">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-emerald-200 text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold text-2xl mx-auto flex items-center justify-center shadow-md border-4 border-emerald-200">
          R
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">Ravi Kumar</h3>
          <p className="text-xs text-emerald-800 font-medium flex items-center justify-center gap-1 mt-0.5">
            <Flower2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Master Apiculturist & Beekeeper</span>
          </p>
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Narasaraopet & Araku Valley Apiaries, AP</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Certified Honey Producer
        </span>
      </div>

      {/* Production Stats */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">Beekeeping Network Stats</h4>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <span className="text-emerald-900 font-bold block text-lg font-mono">{hives.length}</span>
            <span className="text-[10px] text-emerald-800 font-medium">Smart Hives</span>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <span className="text-amber-900 font-bold block text-lg font-mono">{batches.length}</span>
            <span className="text-[10px] text-amber-800 font-medium">Batches</span>
          </div>

          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
            <span className="text-purple-900 font-bold block text-lg font-mono">{totalYield || 430} kg</span>
            <span className="text-[10px] text-purple-800 font-medium">Total Yield</span>
          </div>
        </div>
      </div>

      {/* Apiary Credentials & Settings */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">Apiary Credentials</h4>
        
        <div className="space-y-2 text-slate-600">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">Beekeeper ID</span>
            <span className="font-bold font-mono text-slate-900">BK-AP-2026-042</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">IoT Sensor Network</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 18 Active Sensors
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">FSSAI Registration</span>
            <span className="font-bold text-slate-900">FSSAI/2026/88210</span>
          </div>
        </div>
      </div>

      {/* Button to Switch Role */}
      <button
        onClick={() => setRole('role_select')}
        className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4 text-amber-400" />
        <span>Switch Ecosystem Role / Logout</span>
      </button>
    </div>
  );
};
