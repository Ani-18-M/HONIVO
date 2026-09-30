import React from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut, FlaskConical, Award, CheckCircle2 } from 'lucide-react';

export const LabProfile: React.FC = () => {
  const { setRole, labReports } = useApp();

  const totalCertified = Object.keys(labReports).length;

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12 select-none">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-purple-200 text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-2xl mx-auto flex items-center justify-center shadow-md border-4 border-purple-200">
          P
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">Dr. Priya</h3>
          <p className="text-xs text-purple-800 font-medium flex items-center justify-center gap-1 mt-0.5">
            <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
            <span>Senior NABL Quality Testing Officer</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            HONIVA NAEL Accredited Laboratory, Guntur
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-xs font-bold border border-purple-300">
          <Award className="w-3.5 h-3.5 text-purple-600" /> ISO/IEC 17025 Certified Signatory
        </span>
      </div>

      {/* Lab Accreditation Stats */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">Lab Performance Metrics</h4>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
            <span className="text-purple-900 font-bold block text-lg font-mono">24</span>
            <span className="text-[10px] text-purple-800 font-medium">Screened</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <span className="text-emerald-900 font-bold block text-lg font-mono">{totalCertified || 18}</span>
            <span className="text-[10px] text-emerald-800 font-medium">Certs Signed</span>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <span className="text-amber-900 font-bold block text-lg font-mono">99.4%</span>
            <span className="text-[10px] text-amber-800 font-medium">Purity Score</span>
          </div>
        </div>
      </div>

      {/* Laboratory Details */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 text-sm">NABL Laboratory Info</h4>

        <div className="space-y-2 text-slate-600">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">NABL Acc. Number</span>
            <span className="font-bold font-mono text-slate-900">NABL/2026/001</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">Testing Equipment</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> HPLC & NMR Spectrometry
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-medium">Blockchain Signer Key</span>
            <span className="font-bold font-mono text-xs text-purple-700">0x8f2a...9d12</span>
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
