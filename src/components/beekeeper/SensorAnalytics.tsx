import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowLeft, Thermometer, Droplets, Scale } from 'lucide-react';

export const SensorAnalytics: React.FC = () => {
  const { setBeekeeperTab, selectedHiveId } = useApp();
  const [timeRange, setTimeRange] = useState<'10H' | '1W' | '1M' | '3M'>('10H');

  const rawDataSets = {
    '10H': [
      { time: '12 AM', temp: 31.0, humidity: 65, weight: 38.0, activity: 40 },
      { time: '3 AM', temp: 30.5, humidity: 68, weight: 38.1, activity: 20 },
      { time: '6 AM', temp: 31.2, humidity: 70, weight: 38.3, activity: 60 },
      { time: '9 AM', temp: 33.4, humidity: 72, weight: 38.4, activity: 85 },
      { time: '12 PM', temp: 34.8, humidity: 74, weight: 38.6, activity: 30 },
      { time: '3 PM', temp: 34.2, humidity: 71, weight: 38.6, activity: 45 },
      { time: '6 PM', temp: 32.8, humidity: 68, weight: 38.6, activity: 50 },
      { time: '9 PM', temp: 31.9, humidity: 66, weight: 38.6, activity: 35 },
    ],
    '1W': [
      { time: 'Mon', temp: 31.2, humidity: 64, weight: 36.5, activity: 75 },
      { time: 'Tue', temp: 31.8, humidity: 65, weight: 37.0, activity: 80 },
      { time: 'Wed', temp: 32.1, humidity: 67, weight: 37.4, activity: 82 },
      { time: 'Thu', temp: 33.0, humidity: 70, weight: 37.9, activity: 70 },
      { time: 'Fri', temp: 33.8, humidity: 72, weight: 38.2, activity: 65 },
      { time: 'Sat', temp: 34.8, humidity: 74, weight: 38.6, activity: 40 },
      { time: 'Sun', temp: 34.1, humidity: 73, weight: 38.6, activity: 50 },
    ],
    '1M': [
      { time: 'Week 1', temp: 30.5, humidity: 62, weight: 32.0, activity: 80 },
      { time: 'Week 2', temp: 31.4, humidity: 65, weight: 34.5, activity: 85 },
      { time: 'Week 3', temp: 32.6, humidity: 69, weight: 36.8, activity: 75 },
      { time: 'Week 4', temp: 34.8, humidity: 74, weight: 38.6, activity: 40 },
    ],
    '3M': [
      { time: 'Jul', temp: 29.8, humidity: 60, weight: 26.0, activity: 70 },
      { time: 'Aug', temp: 31.0, humidity: 63, weight: 32.0, activity: 85 },
      { time: 'Sep', temp: 34.8, humidity: 74, weight: 38.6, activity: 40 },
    ],
  };

  const currentChartData = rawDataSets[timeRange];

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setBeekeeperTab('hive_details')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-amber-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h3 className="font-extrabold text-lg text-slate-900 font-serif">Sensor Analytics</h3>
          <p className="text-xs text-slate-500">{selectedHiveId} • Multi-Sensor Graphs</p>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Time Filter Pills */}
      <div className="flex items-center justify-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs gap-2">
        {(['10H', '1W', '1M', '3M'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-5 py-2 rounded-xl font-bold text-xs transition-all ${
              timeRange === range
                ? 'bg-amber-500 text-slate-950 shadow-honey scale-105'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Temperature Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Temperature (°C)</h4>
              <p className="text-[10px] text-slate-400">Target Range: 31°C - 33°C</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            34.8°C Max
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[28, 36]} />
              <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#ef4444' }} />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Humidity (%)</h4>
              <p className="text-[10px] text-slate-400">Optimal Range: 60% - 70%</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            74% Current
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[55, 80]} />
              <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#3b82f6' }} />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hive Weight Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-card border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Hive Weight Accumulation (kg)</h4>
              <p className="text-[10px] text-slate-400">Honey yield accumulation curve</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
            38.6 kg Total
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip contentStyle={{ borderRadius: '12px', borderColor: '#f59e0b' }} />
              <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
