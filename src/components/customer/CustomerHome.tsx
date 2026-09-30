import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, Search, CheckCircle2, Shield, ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const CustomerHome: React.FC = () => {
  const { setCustomerTab, setSelectedBatchId, batches } = useApp();
  const [manualBatchId, setManualBatchId] = useState('');

  const handleBatchClick = (batchId: string) => {
    setSelectedBatchId(batchId);
    setCustomerTab('result');
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBatchId.trim()) {
      const match = batches.find((b) => b.id.toLowerCase() === manualBatchId.trim().toLowerCase());
      if (match) {
        setSelectedBatchId(match.id);
      } else {
        setSelectedBatchId('HC-2026-001'); // fallback to default demo
      }
      setCustomerTab('result');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* Header Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Good Morning 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Discover the story behind your pure honey
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold border border-amber-300">
          🍯
        </div>
      </div>

      {/* Hero Banner Card with Apiary/Honey Jar Photo */}
      <div className="relative rounded-3xl overflow-hidden shadow-honey bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white p-6 sm:p-8">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-35 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80"
            alt="Honey Bottle"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-amber-100 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Traceable Apiculture</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Authentic Indian Honey, Verified at Source
          </h3>

          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Scan the QR code on your HONIVA honey jar to unlock hive location, harvest date, NABL lab certificates, and blockchain records.
          </p>
        </div>
      </div>

      {/* Main Action CTAs */}
      <div className="flex flex-col gap-3">
        
        {/* Primary Scan Button */}
        <button
          onClick={() => setCustomerTab('scan')}
          className="group py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base shadow-honey flex items-center justify-between transition-all transform active:scale-98 w-full cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="block text-sm sm:text-base font-extrabold">Scan QR Code</span>
              <span className="block text-xs text-amber-100 font-normal">Use Jar Camera Scanner</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Enter Batch ID Search - Positioned UNDER Scan QR Code */}
        <form onSubmit={handleManualSearch} className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-2.5 w-full">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Enter Batch ID (e.g. HC-2026-001)"
            value={manualBatchId}
            onChange={(e) => setManualBatchId(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none font-medium"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex-shrink-0 cursor-pointer"
          >
            Verify
          </button>
        </form>
      </div>

      {/* Recently Verified Batches Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Recently Verified Batches</span>
          </h4>
          <span className="text-xs text-amber-700 font-semibold cursor-pointer hover:underline" onClick={() => setCustomerTab('learn')}>
            Explore All
          </span>
        </div>

        <div className="space-y-3">
          {batches.slice(0, 3).map((batch) => (
            <div
              key={batch.id}
              onClick={() => handleBatchClick(batch.id)}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-amber-100 flex-shrink-0 border border-amber-200">
                  <img
                    src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=200&q=80"
                    alt="Honey Jar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{batch.honeyType}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="font-mono text-amber-800 font-semibold">{batch.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {batch.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-400 block">Harvested</span>
                <span className="text-xs font-semibold text-slate-700">{batch.harvestDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
