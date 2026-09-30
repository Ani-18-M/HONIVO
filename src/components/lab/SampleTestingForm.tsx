import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const SampleTestingForm: React.FC = () => {
  const { setLabTab, selectedBatchId, batches, submitLabTest } = useApp();

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];

  const [moisture, setMoisture] = useState<number>(17.2);
  const [ph, setPh] = useState<number>(4.1);
  const [hmf, setHmf] = useState<number>(12);
  const [sugarProfile, setSugarProfile] = useState<'Normal' | 'Elevated' | 'Low'>('Normal');
  const [adulteration, setAdulteration] = useState<'Passed' | 'Failed'>('Passed');
  const [antibiotics, setAntibiotics] = useState<'Not Detected' | 'Detected'>('Not Detected');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLabTest(batch.id, {
      moisture,
      ph,
      hmf,
      sugarProfile,
      adulterationScreen: adulteration,
      antibioticResidue: antibiotics,
    });
    setLabTab('result');
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setLabTab('dashboard')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Sample Testing</h3>
          <p className="text-xs text-amber-700 font-mono font-bold">{batch.id}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-card border border-blue-200 space-y-4 text-xs">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-900 font-semibold border border-blue-200">
          Sample: {batch.honeyType} • Beekeeper: {batch.beekeeperName} ({batch.location})
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Moisture Content (%)</label>
          <input
            type="number"
            step="0.1"
            value={moisture}
            onChange={(e) => setMoisture(parseFloat(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">pH Level</label>
          <input
            type="number"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">HMF Level (mg/kg)</label>
          <input
            type="number"
            value={hmf}
            onChange={(e) => setHmf(parseFloat(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Sugar Profile (Fructose/Glucose)</label>
          <select
            value={sugarProfile}
            onChange={(e) => setSugarProfile(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="Normal">Normal (FSSAI Compliant)</option>
            <option value="Elevated">Elevated C4 Sugar</option>
            <option value="Low">Low Natural Fructose</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Adulteration Screen (C4 Sugars)</label>
          <select
            value={adulteration}
            onChange={(e) => setAdulteration(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="Passed">Passed (Zero C4 Additives)</option>
            <option value="Failed">Failed (Adulterated)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Antibiotic Residue</label>
          <select
            value={antibiotics}
            onChange={(e) => setAntibiotics(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="Not Detected">Not Detected</option>
            <option value="Detected">Detected</option>
          </select>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            type="button"
            onClick={() => alert('Draft saved to lab queue.')}
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey"
          >
            Submit Result
          </button>
        </div>
      </form>
    </div>
  );
};
