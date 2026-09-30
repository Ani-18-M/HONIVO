import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Download, QrCode, Hexagon } from 'lucide-react';

export const LaboratoryCertificate: React.FC = () => {
  const { setLabTab, selectedBatchId, batches, labReports } = useApp();

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
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setLabTab('result')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Laboratory Certificate</h3>
          <p className="text-xs text-slate-500">Official ISO 17025 Certified Document</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Official Certificate Paper Document View */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-amber-300 space-y-6 relative overflow-hidden text-slate-900">
        
        {/* Ornate Gold Border Watermark Background */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Certificate Header Header Logo & Seals */}
        <div className="flex items-center justify-between border-b-2 border-amber-400 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Hexagon className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-black text-xl text-slate-900 tracking-tight font-serif">HONIVA CERTIFIED LABS</h2>
              <p className="text-xs text-amber-800 font-bold">NABL & FSSAI Accredited Testing Body</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Certificate No.</span>
            <span className="font-mono font-black text-sm text-amber-900">{report.certificateNo}</span>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 tracking-wide uppercase">
            HONEY QUALITY TEST REPORT
          </h1>
          <p className="text-xs text-slate-500">Issued under ISO 17025 Quality Certification Framework</p>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Batch ID</span>
            <span className="font-mono font-extrabold text-slate-900 text-sm">{batch.id}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Sample Type</span>
            <span className="font-bold text-slate-900 text-sm">{batch.honeyType}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Test Date</span>
            <span className="font-bold text-slate-900">{report.testedOn}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Overall Result</span>
            <span className="font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              ✓ {report.overallStatus}
            </span>
          </div>
        </div>

        {/* Parameters Breakdown */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b pb-1">
            Analytical Test Parameters
          </h4>

          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>Moisture Content:</span>
              <span className="font-bold">{report.moisture}%</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>pH Level:</span>
              <span className="font-bold">{report.ph}</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>HMF Level:</span>
              <span className="font-bold">{report.hmf} mg/kg</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>Sugar Profile:</span>
              <span className="font-bold text-emerald-700">{report.sugarProfile}</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>Adulteration Screen:</span>
              <span className="font-bold text-emerald-700">✓ {report.adulterationScreen}</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-50 rounded">
              <span>Antibiotic Residue:</span>
              <span className="font-bold text-emerald-700">✓ {report.antibioticResidue}</span>
            </div>
          </div>
        </div>

        {/* Signatures & Stamp Footer */}
        <div className="pt-6 border-t-2 border-slate-200 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-xl p-1 flex flex-col items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <div className="text-[10px] text-slate-500">
              <span className="block font-bold text-slate-800">Scan to Verify Certificate</span>
              <span>Ledger Signature: Verified</span>
            </div>
          </div>

          <div className="text-center">
            <div className="h-10 text-amber-800 font-serif italic text-lg font-extrabold flex items-center justify-center">
              Dr. Priya
            </div>
            <div className="w-32 h-0.5 bg-slate-800 mx-auto my-1"></div>
            <span className="block text-xs font-bold text-slate-900">Dr. Priya</span>
            <span className="block text-[10px] text-slate-500">Authorized Lab Signatory</span>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <button
        onClick={() => alert(`Downloading official PDF Certificate: ${report.certificateNo}...`)}
        className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-honey flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        <span>Download PDF Certificate</span>
      </button>
    </div>
  );
};
