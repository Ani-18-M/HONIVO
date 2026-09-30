import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, MapPin, Calendar, User, Scale, FlaskConical, Link2, ArrowRight, Award, ChevronRight } from 'lucide-react';

export const VerificationResult: React.FC = () => {
  const { setCustomerTab, selectedBatchId, batches, labReports } = useApp();

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const report = labReports[batch.id];

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Verified Header Badge */}
      <div className="bg-gradient-to-b from-emerald-500 to-emerald-700 text-white p-6 rounded-3xl text-center shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-md mb-3">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight">Verified Honey</h2>
        <p className="text-xs text-emerald-100 mt-1 font-medium max-w-xs mx-auto">
          This product is authentic and fully traceable on the HONIVA Blockchain Ledger
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/30 rounded-full text-[11px] font-bold text-emerald-100 border border-emerald-300/30">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>FSSAI & NABL Compliant</span>
        </div>
      </div>

      {/* Honey Product Card */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-amber-200/80 space-y-4">
        
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 shadow-xs flex-shrink-0">
            <img
              src={batch.imageUrl || "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=80"}
              alt={batch.honeyType}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider mb-1">
              Batch: {batch.id}
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">{batch.honeyType}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{batch.extractionLocation}</p>
          </div>
        </div>

        {/* Traceability Spec Details Table */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Beekeeper</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <User className="w-3.5 h-3.5 text-amber-600" /> {batch.beekeeperName}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> {batch.location}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Harvest Date</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" /> {batch.harvestDate}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Batch Yield Size</span>
            <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
              <Scale className="w-3.5 h-3.5 text-amber-600" /> {batch.quantityKg} kg
            </span>
          </div>

          <div className="col-span-2 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-emerald-800 block text-[10px] uppercase font-bold">Lab Verification</span>
              <span className="font-extrabold text-emerald-900 text-sm">
                ✓ Passed ({report?.certificateNo || batch.certNumber || 'NABL/2026/001'})
              </span>
            </div>
            <Award className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => setCustomerTab('journey')}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-base shadow-honey flex items-center justify-center gap-2 transition-transform transform active:scale-98"
      >
        <span>View Full Journey</span>
        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCustomerTab('lab_report')}
          className="p-3.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-300 shadow-xs flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-600" />
            <span>Lab Report</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setCustomerTab('journey')}
          className="p-3.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-300 shadow-xs flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-600" />
            <span>Blockchain Record</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
