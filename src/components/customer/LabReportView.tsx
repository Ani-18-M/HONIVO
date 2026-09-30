import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, Award, Download } from 'lucide-react';

export const LabReportView: React.FC = () => {
  const { setCustomerTab, setLabTab, setRole, selectedBatchId, labReports, batches } = useApp();

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const report = labReports[batch.id] || {
    batchId: batch.id,
    sampleId: 'SMP-2026-881',
    moisture: 17.2,
    ph: 4.1,
    hmf: 12,
    sugarProfile: 'Normal',
    adulterationScreen: 'Passed',
    antibioticResidue: 'Not Detected',
    overallStatus: 'PASSED',
    testedBy: 'Dr. Priya',
    labName: 'HONIVA NAEL Accredited Lab',
    testedOn: '28 Sep 2026',
    certificateNo: 'NABL/2026/001',
    notes: 'Sample complies with FSSAI regulations and ISO 17025 standards.',
  };

  const openFullCertificate = () => {
    setRole('lab');
    setLabTab('certificate');
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCustomerTab('result')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Laboratory Report</h3>
          <p className="text-xs text-slate-500">Food Safety & Quality Test</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Passed Status Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-3xl text-center shadow-lg relative overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-md mb-2">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>
        <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full font-black text-sm uppercase tracking-wider text-emerald-100 border border-white/30">
          PASSED
        </div>
        <p className="text-xs text-emerald-100 mt-2 font-medium">
          Tested by {report.labName} • Cert #{report.certificateNo}
        </p>
      </div>

      {/* Test Parameters Card */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-amber-200/80 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Tested Sample</span>
            <h4 className="font-bold text-slate-900 text-base">{batch.honeyType}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Date</span>
            <span className="block text-xs font-semibold text-slate-700">{report.testedOn}</span>
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="space-y-2.5 divide-y divide-slate-100 text-xs">
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">Moisture Content</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {report.moisture}% <span className="text-[10px] text-emerald-600 font-bold ml-1">(Max 20%)</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">pH Level</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {report.ph} <span className="text-[10px] text-emerald-600 font-bold ml-1">(Normal 3.4-6.1)</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">HMF (Hydroxymethylfurfural)</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
              {report.hmf} mg/kg <span className="text-[10px] text-emerald-600 font-bold ml-1">(Fresh)</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">Sugar Profile (Fructose/Glucose)</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {report.sugarProfile}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">C4 Sugar Adulteration Screen</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ✓ {report.adulterationScreen}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-slate-600 font-medium">Antibiotic & Heavy Metal Residue</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ✓ {report.antibioticResidue}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 italic border border-slate-200">
          "{report.notes}"
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={openFullCertificate}
          className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>View Official NABL Certificate</span>
        </button>

        <button
          onClick={() => alert(`Downloading Lab Certificate for Batch ${batch.id}...`)}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Download PDF Report</span>
        </button>
      </div>
    </div>
  );
};
