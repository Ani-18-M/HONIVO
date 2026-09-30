import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Thermometer, Droplets, ChevronRight, X } from 'lucide-react';

export const MyHives: React.FC = () => {
  const { setBeekeeperTab, setSelectedHiveId, hives, addHive } = useApp();
  const [filter, setFilter] = useState<'all' | 'healthy' | 'attention' | 'critical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newHiveName, setNewHiveName] = useState('');
  const [newApiary, setNewApiary] = useState('Narasaraopet Apiary');

  const filteredHives = hives.filter((h) => {
    const matchesFilter = filter === 'all' || h.status === filter;
    const matchesSearch = h.id.toLowerCase().includes(searchQuery.toLowerCase()) || h.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectHive = (hiveId: string) => {
    setSelectedHiveId(hiveId);
    setBeekeeperTab('hive_details');
  };

  const handleCreateHiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHive({
      name: newHiveName || `Hive 0${hives.length + 1} - New Box`,
      location: newApiary,
      status: 'healthy',
      temperature: 31.5,
      humidity: 65,
      weight: 40.0,
    });
    setIsAddModalOpen(false);
    setNewHiveName('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-extrabold text-[10px] uppercase border border-red-200">Critical</span>;
      case 'attention':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px] uppercase border border-amber-300">Attention</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-[10px] uppercase border border-emerald-200">Healthy</span>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif">My Hives</h2>
          <p className="text-xs text-slate-500">{hives.length} active IoT hives registered</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-honey flex items-center gap-1.5 transition-transform transform active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Add Hive</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-amber-200 shadow-xs flex items-center gap-2">
        <Search className="w-5 h-5 text-amber-600 ml-2" />
        <input
          type="text"
          placeholder="Search hive (e.g. Hive 04)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none font-medium"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'healthy', 'attention', 'critical'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              filter === tab
                ? 'bg-amber-500 text-slate-950 shadow-honey scale-105'
                : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            {tab === 'all' ? `All (${hives.length})` : tab}
          </button>
        ))}
      </div>

      {/* Hive Cards Grid */}
      <div className="space-y-3">
        {filteredHives.map((hive) => (
          <div
            key={hive.id}
            onClick={() => handleSelectHive(hive.id)}
            className={`bg-white p-4 rounded-2xl border shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${
              hive.status === 'critical'
                ? 'border-red-300 bg-red-50/20'
                : hive.status === 'attention'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-extrabold text-lg border border-amber-300 shadow-xs">
                🐝
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-base">{hive.id}</h4>
                  {getStatusBadge(hive.status)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{hive.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-xs space-y-0.5">
                <div className="flex items-center gap-1 justify-end font-mono font-bold text-slate-800">
                  <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                  <span className={hive.temperature > 34 ? 'text-red-600 font-extrabold' : ''}>
                    {hive.temperature}°C
                  </span>
                </div>
                <div className="flex items-center gap-1 justify-end text-slate-500 font-mono">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{hive.humidity}%</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Hive Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-slate-900 font-serif">Add New Smart Hive</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateHiveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Hive Identifier / Label</label>
                <input
                  type="text"
                  placeholder="e.g. Hive 07 - South Grove"
                  value={newHiveName}
                  onChange={(e) => setNewHiveName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Apiary Location</label>
                <select
                  value={newApiary}
                  onChange={(e) => setNewApiary(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                >
                  <option value="Narasaraopet Apiary">Narasaraopet Apiary, AP</option>
                  <option value="Araku Valley Apiary">Araku Valley Apiary, AP</option>
                  <option value="Visakhapatnam Apiary">Visakhapatnam Apiary, AP</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-600 shadow-honey"
                >
                  Provision Hive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
