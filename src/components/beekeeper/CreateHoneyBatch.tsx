import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, QrCode, Download, Share2, ArrowRight, ArrowLeft, Upload } from 'lucide-react';

export const CreateHoneyBatch: React.FC = () => {
  const { setBeekeeperTab, setRole, setCustomerTab, setSelectedBatchId, hives, createHoneyBatch } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedHive, setSelectedHive] = useState<string>('Hive 04');
  const [honeyType, setHoneyType] = useState<any>('Forest Honey');
  const [quantityKg, setQuantityKg] = useState<number>(38.6);
  const [extractionLocation, setExtractionLocation] = useState<string>('Narasaraopet Processing Unit');
  const [labCertFile] = useState<string>('lab_report_preliminary.pdf');

  const [generatedBatchId, setGeneratedBatchId] = useState<string>('');

  const handleCreateBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const batchId = createHoneyBatch(selectedHive, honeyType, quantityKg, extractionLocation);
    setGeneratedBatchId(batchId);
    setSelectedBatchId(batchId);
    setStep(4); // Success step
  };

  const handleCustomerView = () => {
    setRole('customer');
    setCustomerTab('result');
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBeekeeperTab('dashboard')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Create Honey Batch</h3>
          <p className="text-xs text-amber-700 font-semibold">Step {step} of 3</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Wizard Progress Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full font-extrabold text-xs flex items-center justify-center ${
                  step >= s ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {s}
              </div>
              <span className={`text-xs font-bold ${step === s ? 'text-slate-900' : 'text-slate-400'}`}>
                {s === 1 ? 'Hive' : s === 2 ? 'Details' : 'Lab Certificate'}
              </span>
              {s < 3 && <div className="w-6 h-0.5 bg-slate-200"></div>}
            </div>
          ))}
        </div>
      )}

      {/* Wizard Form Body */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-amber-200 space-y-4">
          <h4 className="font-bold text-slate-900 text-base">Step 1: Select Source Hive</h4>
          <p className="text-xs text-slate-500">Choose the IoT hive from which honey was extracted</p>

          <div className="space-y-2">
            {hives.map((h) => (
              <div
                key={h.id}
                onClick={() => setSelectedHive(h.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  selectedHive === h.id
                    ? 'border-amber-500 bg-amber-50/70 shadow-xs font-bold'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    🐝
                  </div>
                  <div>
                    <span className="block text-slate-900 text-sm">{h.id}</span>
                    <span className="block text-xs text-slate-500 font-normal">{h.apiary}</span>
                  </div>
                </div>
                {selectedHive === h.id && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
          >
            <span>Next: Enter Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 shadow-card border border-amber-200 space-y-4 text-xs">
          <h4 className="font-bold text-slate-900 text-base">Step 2: Enter Honey Specs</h4>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Honey Type</label>
            <select
              value={honeyType}
              onChange={(e) => setHoneyType(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-500"
            >
              <option value="Forest Honey">Forest Honey</option>
              <option value="Multi Floral Honey">Multi Floral Honey</option>
              <option value="Acacia Honey">Acacia Honey</option>
              <option value="Eucalyptus Honey">Eucalyptus Honey</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Harvested Quantity (kg)</label>
            <input
              type="number"
              value={quantityKg}
              onChange={(e) => setQuantityKg(parseFloat(e.target.value) || 0)}
              className="w-full p-3 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Extraction Location</label>
            <input
              type="text"
              value={extractionLocation}
              onChange={(e) => setExtractionLocation(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 font-medium focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 shadow-honey"
            >
              Next: Lab Cert
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleCreateBatchSubmit} className="bg-white rounded-3xl p-6 shadow-card border border-amber-200 space-y-4 text-xs">
          <h4 className="font-bold text-slate-900 text-base">Step 3: Attach Laboratory Certificate</h4>
          <p className="text-xs text-slate-500">Upload initial lab screening report or request lab testing</p>

          <div className="p-6 border-2 border-dashed border-amber-300 rounded-2xl bg-amber-50/50 text-center space-y-2">
            <Upload className="w-8 h-8 text-amber-600 mx-auto" />
            <span className="block font-bold text-slate-800">{labCertFile}</span>
            <span className="block text-[10px] text-slate-500">NABL / FSSAI Accredited Format PDF</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-slate-600 text-[11px] border border-slate-200">
            <strong>Traceability Note:</strong> Submitting this batch generates an instant QR code and sends a notification to Dr. Priya at the HONIVA Accredited Lab.
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:from-amber-600 hover:to-amber-700 shadow-honey"
            >
              ✓ Create Batch
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Success Result Screen */}
      {step === 4 && (
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-300 text-center space-y-4 animation-slide-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 font-serif">Batch Created!</h3>
          <p className="text-xs text-slate-600">
            Batch ID: <strong className="font-mono text-amber-700 text-sm">{generatedBatchId}</strong>
          </p>

          {/* Generated QR Code Box */}
          <div className="w-48 h-48 bg-white border-2 border-amber-400 rounded-2xl mx-auto p-3 shadow-honey flex flex-col items-center justify-center">
            <QrCode className="w-32 h-32 text-slate-900" />
            <span className="text-[10px] font-mono font-bold text-amber-800 mt-1">{generatedBatchId}</span>
          </div>

          <p className="text-xs text-slate-500">
            QR Code linked to HONIVA Traceability Ledger. Download & print on product packaging.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => alert(`Downloaded QR Code for Batch ${generatedBatchId}`)}
              className="py-3 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 flex items-center justify-center gap-1"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Download QR</span>
            </button>

            <button
              onClick={() => alert(`QR Code URL copied: https://honiva.app/verify/${generatedBatchId}`)}
              className="py-3 px-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 flex items-center justify-center gap-1"
            >
              <Share2 className="w-4 h-4 text-amber-600" />
              <span>Share Link</span>
            </button>
          </div>

          <button
            onClick={handleCustomerView}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
          >
            <span>Switch Role & Scan as Customer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
