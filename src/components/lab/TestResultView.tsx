import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Link2, Award } from 'lucide-react';

export const TestResultView: React.FC = () => {
  const { setLabTab, selectedBatchId, batches, labReports } = useApp();

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const report = labReports[batch.id] || {
    batchId: batch.id,
    sampleId: 'SMP-2026-881',
    moisture: 17.2,
    ph: 4.1,
    hmf: 12,
    overallStatus: 'PASSED',
    testedBy: 'Dr. Priya',
    labName: 'HONIVA Accredited Lab',
    testedOn: '28 Sep 2026',
    certificateNo: 'NABL/2026/001',
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Passed Status Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-3xl text-center shadow-lg relative overflow-hidden space-y-2">
        <div className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-3xl font-black font-serif tracking-tight">PASSED</h2>
        <p className="text-xs text-emerald-100 font-medium">Sample meets configured FSSAI quality standards</p>
      </div>

      {/* Test Meta Card */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-amber-200 space-y-3 text-xs">
        <div className="flex justify-between border-b pb-2">
          <span className="text-slate-400 font-bold uppercase">Batch ID</span>
          <span className="font-mono font-bold text-amber-800">{batch.id}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-slate-400 font-bold uppercase">Tested On</span>
          <span className="font-semibold text-slate-800">{report.testedOn}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-slate-400 font-bold uppercase">Tested By</span>
          <span className="font-semibold text-slate-800">{report.testedBy}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-slate-400 font-bold uppercase">Accredited Lab</span>
          <span className="font-semibold text-slate-800">{report.labName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400 font-bold uppercase">Certificate No.</span>
          <span className="font-mono font-bold text-emerald-700">{report.certificateNo}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={() => setLabTab('certificate')}
          className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span>View & Issue Certificate</span>
        </button>

        <button
          onClick={() => setLabTab('blockchain')}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
        >
          <Link2 className="w-4 h-4 text-blue-400" />
          <span>Submit to Blockchain Ledger</span>
        </button>
      </div>
    </div>
  );
};
