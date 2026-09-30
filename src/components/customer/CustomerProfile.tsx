import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, LogOut } from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const { setRole } = useApp();

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-amber-200 text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-amber-500 text-white font-extrabold text-2xl mx-auto flex items-center justify-center shadow-honey border-4 border-amber-200">
          C
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">Customer Account</h3>
          <p className="text-xs text-slate-500">Verified HONIVA Honey Enthusiast</p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Pure Honey Verified User
        </span>
      </div>

      {/* History Stats */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">Your Verification Activity</h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-amber-900 font-bold block text-lg font-mono">14</span>
            <span className="text-[10px] text-amber-800 font-medium">Jars Verified</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-emerald-900 font-bold block text-lg font-mono">100%</span>
            <span className="text-[10px] text-emerald-800 font-medium">Purity Score</span>
          </div>
        </div>
      </div>

      {/* Button to Switch Role */}
      <button
        onClick={() => setRole('role_select')}
        className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4 text-slate-600" />
        <span>Switch Ecosystem Role</span>
      </button>
    </div>
  );
};
