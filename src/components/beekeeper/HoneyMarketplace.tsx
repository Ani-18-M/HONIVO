import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Plus, MapPin } from 'lucide-react';

export const HoneyMarketplace: React.FC = () => {
  const { marketplace, addMarketListing, batches } = useApp();
  const [tab, setTab] = useState<'listings' | 'buyers'>('listings');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState('HC-2026-001');
  const [price, setPrice] = useState(420);
  const [availableQty, setAvailableQty] = useState(86);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMarketListing(selectedBatch, price, availableQty);
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif">Honey Marketplace</h2>
          <p className="text-xs text-slate-500">B2B & Retail Direct Honey Trading</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center gap-1.5 transition-transform transform active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Post Listing</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setTab('listings')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            tab === 'listings' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          My Listings ({marketplace.length})
        </button>
        <button
          onClick={() => setTab('buyers')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
            tab === 'buyers' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Active Buyers (14 Demands)
        </button>
      </div>

      {/* Listings View */}
      {tab === 'listings' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {marketplace.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div className="h-40 w-full relative bg-amber-50">
                <img src={item.imageUrl} alt={item.honeyType} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                  {item.isLabTested && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
                      Lab Certified
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg font-serif">{item.honeyType}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-600" /> {item.location}
                  </p>

                  <div className="mt-3 flex items-baseline justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Price</span>
                      <span className="block font-black text-xl text-amber-800 font-mono">₹{item.pricePerKg} <span className="text-xs text-slate-500 font-normal">/ kg</span></span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Available Stock</span>
                      <span className="block font-bold text-slate-800 text-sm font-mono">{item.availableKg} kg</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Connecting with wholesale buyers for ${item.honeyType}... 5 buyers matched!`)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs shadow-md"
                >
                  Find Buyers
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Buyers View */
        <div className="space-y-3">
          {[
            { name: 'Organic India Retail', need: '500 kg Forest Honey', rate: '₹440 / kg', location: 'Hyderabad' },
            { name: 'Kashmir Apiculture Co-op', need: '300 kg Acacia Honey', rate: '₹470 / kg', location: 'Delhi' },
            { name: 'Ayush Pharma Naturals', need: '1000 kg Multi Floral', rate: '₹395 / kg', location: 'Bengaluru' },
          ].map((buyer, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{buyer.name}</h4>
                <p className="text-xs text-amber-800 font-semibold mt-0.5">{buyer.need}</p>
                <span className="text-[10px] text-slate-400">{buyer.location} • Target Rate: {buyer.rate}</span>
              </div>
              <button
                onClick={() => alert(`Offer submitted to ${buyer.name}!`)}
                className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
              >
                Send Offer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Listing Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900 font-serif border-b pb-3">Post Marketplace Listing</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{b.id} — {b.honeyType} ({b.quantityKg}kg)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Price per kg (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Available Quantity (kg)</label>
                <input
                  type="number"
                  value={availableQty}
                  onChange={(e) => setAvailableQty(parseFloat(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-honey"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
