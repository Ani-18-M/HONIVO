import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Thermometer, Droplets, Scale, Activity, Sparkles, PackagePlus } from 'lucide-react';

export const HiveDetails: React.FC = () => {
  const { setBeekeeperTab, selectedHiveId, hives } = useApp();
  const [activeTab, setActiveTab] = useState<'live' | 'analytics' | 'ai'>('live');

  const hive = hives.find((h) => h.id === selectedHiveId) || hives[3] || hives[0];

  return (
    <div className="max-w-md mx-auto space-y-5 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBeekeeperTab('hives')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">{hive.id}</h3>
          <p className="text-xs text-slate-500">{hive.name}</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Hive Risk Banner */}
      <div className={`p-5 rounded-3xl text-white shadow-lg relative overflow-hidden flex items-center justify-between ${
        hive.status === 'critical' ? 'bg-gradient-to-r from-red-600 to-amber-600' : 'bg-gradient-to-r from-emerald-600 to-emerald-800'
      }`}>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded text-white">
            Telemetry Risk Score: {hive.riskScore}/100
          </span>
          <h3 className="text-2xl font-extrabold font-serif mt-1">
            Risk Level: {hive.status === 'critical' ? 'HIGH' : hive.status === 'attention' ? 'MEDIUM' : 'LOW'}
          </h3>
          <p className="text-xs text-white/90 mt-1">{hive.apiary}</p>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-2xl">
          {hive.status === 'critical' ? '⚠️' : '🐝'}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'live' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Live Data
        </button>
        <button
          onClick={() => setBeekeeperTab('analytics')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setBeekeeperTab('ai_health')}
          className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'ai' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Live Sensors Grid */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Temperature Card */}
        <div className={`p-4 rounded-2xl border shadow-xs space-y-1 ${
          hive.temperature > 34 ? 'bg-red-50/60 border-red-300' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Temperature</span>
            <Thermometer className={`w-4 h-4 ${hive.temperature > 34 ? 'text-red-500' : 'text-amber-500'}`} />
          </div>
          <span className={`text-2xl font-black font-mono block ${hive.temperature > 34 ? 'text-red-600' : 'text-slate-900'}`}>
            {hive.temperature}°C
          </span>
          <span className="text-[10px] text-slate-400 block">+1.4°C vs baseline</span>
        </div>

        {/* Humidity Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Humidity</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-mono block">{hive.humidity}%</span>
          <span className="text-[10px] text-slate-400 block">Normal range</span>
        </div>

        {/* Hive Weight Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Hive Weight</span>
            <Scale className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 font-mono block">{hive.weight} kg</span>
          <span className="text-[10px] text-emerald-600 font-bold block">+0.4kg today</span>
        </div>

        {/* Worker Traffic Activity Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Bee Activity</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <span className={`text-2xl font-black font-mono block ${hive.activity === 'Low' ? 'text-amber-600' : 'text-emerald-600'}`}>
            {hive.activity}
          </span>
          <span className="text-[10px] text-slate-400 block">Acoustic mic sensing</span>
        </div>
      </div>

      {/* AI Analysis Spotlight Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-5 rounded-3xl border border-amber-300 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI Colony Health Diagnosis</span>
          </div>
          <span className="text-xs font-mono font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
            Risk: {hive.riskScore}/100
          </span>
        </div>

        <h4 className="font-extrabold text-slate-900 text-base">{hive.aiInsight}</h4>

        <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-amber-200">
          <strong>Recommended Action:</strong> {hive.recommendedAction}
        </p>

        <div className="pt-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setBeekeeperTab('ai_health')}
            className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-honey text-center"
          >
            View All Insights
          </button>
          <button
            onClick={() => setBeekeeperTab('create_batch')}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center flex items-center justify-center gap-1"
          >
            <PackagePlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Create Batch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
