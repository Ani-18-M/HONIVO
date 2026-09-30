import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  QrCode,
  ShieldCheck,
  BookOpen,
  User,
  LayoutDashboard,
  Hexagon,
  FlaskConical,
  ShoppingCart,
  PackagePlus,
  Activity,
  FileCheck,
  Award,
  Link2,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    role,
    customerTab,
    setCustomerTab,
    beekeeperTab,
    setBeekeeperTab,
    labTab,
    setLabTab,
    adminTab,
    setAdminTab,
    isMobileFrameView,
  } = useApp();

  if (role === 'splash' || role === 'role_select' || isMobileFrameView) return null;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-amber-200/80 min-h-[calc(100vh-4rem)] p-4 space-y-6 flex-shrink-0">
      
      {/* Role Title Badge */}
      <div className="px-3 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
        <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">Active Perspective</span>
        <span className="font-extrabold text-slate-900 text-sm capitalize">{role} Portal</span>
      </div>

      {/* Customer Sidebar Navigation */}
      {role === 'customer' && (
        <nav className="space-y-1 text-sm font-semibold">
          <button
            onClick={() => setCustomerTab('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'home' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Home className="w-4 h-4" /> <span>Customer Home</span>
          </button>

          <button
            onClick={() => setCustomerTab('scan')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'scan' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <QrCode className="w-4 h-4" /> <span>Scan QR Code</span>
          </button>

          <button
            onClick={() => setCustomerTab('result')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'result' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> <span>Verification Result</span>
          </button>

          <button
            onClick={() => setCustomerTab('journey')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'journey' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Activity className="w-4 h-4" /> <span>Honey Journey</span>
          </button>

          <button
            onClick={() => setCustomerTab('lab_report')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'lab_report' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> <span>Lab Report</span>
          </button>

          <button
            onClick={() => setCustomerTab('learn')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'learn' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> <span>Learn About Honey</span>
          </button>

          <button
            onClick={() => setCustomerTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              customerTab === 'profile' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <User className="w-4 h-4" /> <span>Profile</span>
          </button>
        </nav>
      )}

      {/* Beekeeper Sidebar Navigation */}
      {role === 'beekeeper' && (
        <nav className="space-y-1 text-sm font-semibold">
          <button
            onClick={() => setBeekeeperTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('hives')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'hives' || beekeeperTab === 'hive_details' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Hexagon className="w-4 h-4" /> <span>My Hives</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Activity className="w-4 h-4" /> <span>Sensor Analytics</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('ai_health')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'ai_health' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> <span>AI Colony Health</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('yield')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'yield' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> <span>Yield Forecast</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('create_batch')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'create_batch' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <PackagePlus className="w-4 h-4" /> <span>Create Honey Batch</span>
          </button>

          <button
            onClick={() => setBeekeeperTab('market')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              beekeeperTab === 'market' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <ShoppingCart className="w-4 h-4" /> <span>Honey Marketplace</span>
          </button>
        </nav>
      )}

      {/* Lab Officer Sidebar Navigation */}
      {role === 'lab' && (
        <nav className="space-y-1 text-sm font-semibold">
          <button
            onClick={() => setLabTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              labTab === 'dashboard' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-blue-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> <span>Lab Dashboard</span>
          </button>

          <button
            onClick={() => setLabTab('testing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              labTab === 'testing' || labTab === 'samples' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-blue-50'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> <span>Sample Testing</span>
          </button>

          <button
            onClick={() => setLabTab('result')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              labTab === 'result' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-blue-50'
            }`}
          >
            <FileCheck className="w-4 h-4" /> <span>Test Results</span>
          </button>

          <button
            onClick={() => setLabTab('blockchain')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              labTab === 'blockchain' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-blue-50'
            }`}
          >
            <Link2 className="w-4 h-4" /> <span>Blockchain Record</span>
          </button>

          <button
            onClick={() => setLabTab('certificate')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              labTab === 'certificate' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-blue-50'
            }`}
          >
            <Award className="w-4 h-4" /> <span>Issue Certificate</span>
          </button>
        </nav>
      )}

      {/* Admin Sidebar Navigation */}
      {role === 'admin' && (
        <nav className="space-y-1 text-sm font-semibold">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              adminTab === 'dashboard' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> <span>Network Overview</span>
          </button>

          <button
            onClick={() => setAdminTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
              adminTab === 'analytics' ? 'bg-slate-900 text-white font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" /> <span>National Analytics</span>
          </button>
        </nav>
      )}
    </aside>
  );
};
