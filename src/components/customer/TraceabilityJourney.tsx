import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ShieldCheck, MapPin, Calendar, User, FileText, ArrowLeft } from 'lucide-react';

export const TraceabilityJourney: React.FC = () => {
  const { setCustomerTab, selectedBatchId, batches } = useApp();

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];

  return (
    <div className="max-w-md mx-auto space-y-6 pb-12">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCustomerTab('result')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Honey Journey</h3>
          <p className="text-xs text-amber-700 font-mono font-bold">Batch: {batch.id}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl shadow-honey flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-wider bg-black/10 px-2 py-0.5 rounded text-amber-950">
            Immutable Supply Chain
          </span>
          <h4 className="font-extrabold text-sm mt-1">{batch.honeyType}</h4>
          <p className="text-xs text-amber-950 font-medium">Harvested at {batch.location}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-extrabold text-lg">
          🍯
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-emerald-500 before:to-amber-500">
        {batch.steps.map((step, idx) => (
          <div key={step.id || idx} className="relative group">
            
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white ring-2 ring-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>

            {/* Timeline Content Card */}
            <div className="bg-white rounded-2xl p-4 shadow-card border border-slate-200/80 hover:border-amber-400 transition-all space-y-2">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  STEP {step.step || `0${idx + 1}`}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-600" /> {step.date}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>

              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>

              {/* Image thumbnail if available */}
              {step.imageUrl && (
                <div className="w-full h-28 rounded-xl overflow-hidden mt-2 border border-slate-100 shadow-xs">
                  <img src={step.imageUrl} alt={step.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Actor & Verification Metadata */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <User className="w-3 h-3 text-amber-600" /> {step.responsible}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <MapPin className="w-3 h-3 text-amber-600" /> {step.location}
                </span>
              </div>

              {step.verifiedBy && (
                <div className="bg-emerald-50 text-emerald-800 p-2 rounded-lg text-[11px] font-semibold flex items-center justify-between border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified: {step.verifiedBy}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => setCustomerTab('lab_report')}
        className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4 text-amber-400" />
        <span>Inspect Laboratory Test Certification</span>
      </button>
    </div>
  );
};
