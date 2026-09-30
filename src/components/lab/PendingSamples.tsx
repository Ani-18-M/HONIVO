import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, FlaskConical, ChevronRight } from 'lucide-react';

export const PendingSamples: React.FC = () => {
  const { setLabTab, setSelectedBatchId, batches } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'tested'>('pending');

  const handleStartTest = (batchId: string) => {
    setSelectedBatchId(batchId);
    setLabTab('testing');
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setLabTab('dashboard')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Pending Samples</h3>
          <p className="text-xs text-slate-500">Laboratory Testing Queue</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            filter === 'all' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All (4)
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            filter === 'pending' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pending (4)
        </button>
        <button
          onClick={() => setFilter('tested')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            filter === 'tested' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tested
        </button>
      </div>

      {/* Sample Cards List */}
      <div className="space-y-3">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold border border-amber-300">
                <FlaskConical className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <span className="font-mono font-bold text-slate-900 text-sm block">{batch.id}</span>
                <span className="text-xs font-bold text-slate-700">{batch.honeyType}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Submitted {batch.harvestDate}</span>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(batch.id)}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center gap-1"
            >
              <span>Start Test</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
