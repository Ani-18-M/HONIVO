import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, Copy, ExternalLink, Database } from 'lucide-react';

export const BlockchainRecord: React.FC = () => {
  const { setLabTab, selectedBatchId, batches, blockchainRecords } = useApp();
  const [copied, setCopied] = useState(false);

  const batch = batches.find((b) => b.id === selectedBatchId) || batches[0];
  const ledger = blockchainRecords[batch.id] || {
    batchId: batch.id,
    blockNumber: 18421,
    previousHash: '8a92e4b109c3f721a99042b88f12a9',
    currentHash: 'd31a5f902c8982bc12948e42105cc9',
    timestamp: '28 Sep 2026 • 10:42 AM',
    eventName: 'LAB_RESULT_APPROVED',
    digitalSignature: 'VERIFIED_BY_HONIVA_LEDGER',
    status: 'VERIFIED',
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(ledger.currentHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setLabTab('result')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Blockchain Ledger</h3>
          <p className="text-xs text-amber-700 font-mono font-bold">Batch: {batch.id}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Ledger Block Header Card */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden space-y-3 border border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-mono font-bold text-blue-400">Block #{ledger.blockNumber}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {ledger.status}
          </span>
        </div>

        <h4 className="font-mono font-extrabold text-lg text-amber-400">{ledger.eventName}</h4>

        <p className="text-xs text-slate-400">
          Timestamp: <span className="text-slate-200 font-semibold">{ledger.timestamp}</span>
        </p>
      </div>

      {/* Cryptographic Hashes Card */}
      <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-200 space-y-3.5 text-xs">
        
        <div>
          <span className="text-slate-400 font-bold uppercase text-[10px]">Previous Block Hash</span>
          <div className="p-2.5 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-600 border border-slate-200 truncate mt-1">
            {ledger.previousHash}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Current Transaction Hash</span>
            <button
              onClick={handleCopyHash}
              className="text-amber-700 hover:text-amber-800 font-bold text-[10px] flex items-center gap-1"
            >
              <Copy className="w-3 h-3" /> {copied ? 'Copied!' : 'Copy Hash'}
            </button>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl font-mono text-xs font-bold text-amber-900 border border-amber-300 break-all mt-1 shadow-xs">
            {ledger.currentHash}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Digital Signature</span>
          <span className="font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ✓ {ledger.digitalSignature}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => alert(`Ledger Explorer: Showing block history for ${batch.id}`)}
        className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center justify-center gap-2"
      >
        <ExternalLink className="w-4 h-4" />
        <span>View Full Block Transaction History</span>
      </button>

      <p className="text-[10px] text-center text-slate-400">
        *HONIVA Blockchain prototype visualization. Simulates cryptographic supply-chain consensus.
      </p>
    </div>
  );
};
