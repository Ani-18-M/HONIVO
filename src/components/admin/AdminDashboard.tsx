import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShieldCheck, MapPin, AlertTriangle, Users, Layers, Hexagon } from 'lucide-react';

export const AdminDashboard: React.FC = () => {

  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');

  const productionTrends = [
    { month: 'Apr', yield: 1200 },
    { month: 'May', yield: 1450 },
    { month: 'Jun', yield: 1800 },
    { month: 'Jul', yield: 2100 },
    { month: 'Aug', yield: 2600 },
    { month: 'Sep', yield: 3100 },
  ];

  const regionalHives = [
    { region: 'Narasaraopet, AP', count: 480, status: 'Healthy', lat: '16.23', lng: '80.05' },
    { region: 'Araku Valley, AP', count: 320, status: 'Healthy', lat: '18.32', lng: '82.87' },
    { region: 'Visakhapatnam, AP', count: 210, status: 'Attention', lat: '17.68', lng: '83.21' },
    { region: 'Telangana Region', count: 140, status: 'Healthy', lat: '17.38', lng: '78.48' },
    { region: 'Karnataka Belagavi', count: 98, status: 'Critical', lat: '15.84', lng: '74.49' },
  ];

  const pieData = [
    { name: 'Healthy', value: 1080, color: '#10b981' },
    { name: 'Attention', value: 140, color: '#f59e0b' },
    { name: 'Critical', value: 28, color: '#ef4444' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-card border border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>HONIVA Ecosystem National Monitoring Authority</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Ecosystem Overview & Telemetry Map
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time apiculture monitoring across South India
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-300 font-bold text-xs bg-slate-50 focus:outline-none focus:border-amber-500"
          >
            <option value="All Regions">All Regions (South India)</option>
            <option value="Andhra Pradesh">Andhra Pradesh Cluster</option>
            <option value="Telangana">Telangana Cluster</option>
            <option value="Karnataka">Karnataka Cluster</option>
          </select>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Registered Hives</span>
            <Hexagon className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono block">1,248</span>
          <span className="text-[10px] text-emerald-600 font-bold">+18 hives this month</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Honey Batches</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-amber-700 font-mono block">4,862</span>
          <span className="text-[10px] text-emerald-600 font-bold">100% Traceable</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Active Ecosystem Users</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono block">3,921</span>
          <span className="text-[10px] text-slate-400">Beekeepers & Consumers</span>
        </div>

        <div className="bg-red-50/70 p-5 rounded-3xl border border-red-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-red-700 font-bold">
            <span>Active Alerts</span>
            <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <span className="text-3xl font-black text-red-600 font-mono block">18</span>
          <span className="text-[10px] text-red-600 font-bold">Action teams dispatched</span>
        </div>
      </div>

      {/* Interactive Map-style Visualization */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="font-bold text-lg font-serif text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>National Apiary Telemetry Map</span>
            </h4>
            <p className="text-xs text-slate-400">Smart Hive distribution & telemetry nodes</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
            Live Stream Connected
          </span>
        </div>

        {/* Map Canvas Graphic Mockup */}
        <div className="h-64 sm:h-72 w-full bg-slate-950 rounded-2xl relative p-4 overflow-hidden border border-slate-800 flex items-center justify-center">
          
          {/* Subtle Grid Map Lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Regional Apiary Nodes */}
          {regionalHives.map((r, idx) => (
            <div
              key={idx}
              className={`absolute p-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-transform hover:scale-110 cursor-pointer ${
                idx === 0
                  ? 'top-10 left-12 sm:left-24 bg-emerald-950/80 border-emerald-400 text-emerald-200'
                  : idx === 1
                  ? 'top-20 right-16 sm:right-36 bg-emerald-950/80 border-emerald-400 text-emerald-200'
                  : idx === 2
                  ? 'bottom-12 right-12 sm:right-28 bg-amber-950/80 border-amber-400 text-amber-200'
                  : idx === 3
                  ? 'top-12 left-44 sm:left-72 bg-emerald-950/80 border-emerald-400 text-emerald-200'
                  : 'bottom-10 left-16 sm:left-32 bg-red-950/80 border-red-400 text-red-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${r.status === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
                <span className="font-bold text-xs">{r.region}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300 block mt-0.5">{r.count} Hives • {r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Production Trends */}
        <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Monthly Honey Production (kg)</h4>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionTrends}>
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#f59e0b' }} />
                <Area type="monotone" dataKey="yield" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#prodGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hive Health Pie Breakdown */}
        <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">National Hive Health Distribution</h4>
          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy (86%)
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Attention (11%)
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical (3%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
