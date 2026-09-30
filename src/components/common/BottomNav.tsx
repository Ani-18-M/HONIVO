import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  QrCode,
  History,
  BookOpen,
  User,
  LayoutDashboard,
  Hexagon,
  Package,
  Store,
  FlaskConical,
  FileCheck,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    role,
    customerTab,
    setCustomerTab,
    beekeeperTab,
    setBeekeeperTab,
    labTab,
    setLabTab,
    adminTab,
  } = useApp();

  if (
    role === 'splash' ||
    role === 'role_select' ||
    (role === 'customer' && customerTab === 'login') ||
    (role === 'beekeeper' && beekeeperTab === 'login') ||
    (role === 'lab' && labTab === 'login') ||
    (role === 'admin' && adminTab === 'login')
  )
    return null;

  return (
    <nav className="bg-white border-t border-slate-200/80 px-2 py-1.5 z-40 select-none">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Customer App Bottom Navigation (Matching Image Screens 3, 5, 6, 7, 8) */}
        {role === 'customer' && (
          <>
            <button
              onClick={() => setCustomerTab('home')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                customerTab === 'home' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Home</span>
            </button>

            <button
              onClick={() => setCustomerTab('scan')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                customerTab === 'scan' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <QrCode className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Scan</span>
            </button>

            <button
              onClick={() => setCustomerTab('journey')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                customerTab === 'journey' || customerTab === 'result' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <History className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">History</span>
            </button>

            <button
              onClick={() => setCustomerTab('learn')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                customerTab === 'learn' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Learn</span>
            </button>

            <button
              onClick={() => setCustomerTab('profile')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                customerTab === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Profile</span>
            </button>
          </>
        )}

        {/* Beekeeper App Bottom Navigation (Matching Image Screens 9, 10, 15, 16) */}
        {role === 'beekeeper' && (
          <>
            <button
              onClick={() => setBeekeeperTab('dashboard')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                beekeeperTab === 'dashboard' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Home</span>
            </button>

            <button
              onClick={() => setBeekeeperTab('hives')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                beekeeperTab === 'hives' || beekeeperTab === 'hive_details' || beekeeperTab === 'analytics' || beekeeperTab === 'ai_health' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Hexagon className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Hives</span>
            </button>

            <button
              onClick={() => setBeekeeperTab('create_batch')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                beekeeperTab === 'create_batch' || beekeeperTab === 'batches' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Package className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Batches</span>
            </button>

            <button
              onClick={() => setBeekeeperTab('market')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                beekeeperTab === 'market' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Store className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Market</span>
            </button>

            <button
              onClick={() => setBeekeeperTab('profile')}
              className={`flex flex-col items-center py-1 px-2.5 transition-colors ${
                beekeeperTab === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Profile</span>
            </button>
          </>
        )}

        {/* Lab Officer App Bottom Navigation (Matching Image Screen 17) */}
        {role === 'lab' && (
          <>
            <button
              onClick={() => setLabTab('dashboard')}
              className={`flex flex-col items-center py-1 px-3 transition-colors ${
                labTab === 'dashboard' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setLabTab('testing')}
              className={`flex flex-col items-center py-1 px-3 transition-colors ${
                labTab === 'testing' || labTab === 'samples' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FlaskConical className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Samples</span>
            </button>

            <button
              onClick={() => setLabTab('result')}
              className={`flex flex-col items-center py-1 px-3 transition-colors ${
                labTab === 'result' || labTab === 'certificate' || labTab === 'blockchain' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <FileCheck className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Reports</span>
            </button>

            <button
              onClick={() => setLabTab('profile')}
              className={`flex flex-col items-center py-1 px-3 transition-colors ${
                labTab === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] mt-0.5 font-medium">Profile</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
