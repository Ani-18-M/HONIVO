import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNav } from './components/common/BottomNav';
import { MobileFrameWrapper } from './components/common/MobileFrameWrapper';

import { SplashScreen } from './components/splash/SplashScreen';
import { RoleSelection } from './components/splash/RoleSelection';

import { RoleAuth } from './components/common/RoleAuth';
import { CustomerHome } from './components/customer/CustomerHome';
import { QRScannerModal } from './components/customer/QRScannerModal';
import { VerificationResult } from './components/customer/VerificationResult';
import { TraceabilityJourney } from './components/customer/TraceabilityJourney';
import { LabReportView } from './components/customer/LabReportView';
import { LearnAboutHoney } from './components/customer/LearnAboutHoney';
import { CustomerProfile } from './components/customer/CustomerProfile';

import { BeekeeperDashboard } from './components/beekeeper/BeekeeperDashboard';
import { MyHives } from './components/beekeeper/MyHives';
import { HiveDetails } from './components/beekeeper/HiveDetails';
import { SensorAnalytics } from './components/beekeeper/SensorAnalytics';
import { AIColonyHealth } from './components/beekeeper/AIColonyHealth';
import { HoneyYieldForecast } from './components/beekeeper/HoneyYieldForecast';
import { CreateHoneyBatch } from './components/beekeeper/CreateHoneyBatch';
import { HoneyMarketplace } from './components/beekeeper/HoneyMarketplace';
import { BeekeeperProfile } from './components/beekeeper/BeekeeperProfile';

import { LabDashboard } from './components/lab/LabDashboard';
import { PendingSamples } from './components/lab/PendingSamples';
import { SampleTestingForm } from './components/lab/SampleTestingForm';
import { TestResultView } from './components/lab/TestResultView';
import { BlockchainRecord } from './components/lab/BlockchainRecord';
import { LaboratoryCertificate } from './components/lab/LaboratoryCertificate';
import { LabProfile } from './components/lab/LabProfile';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { Hexagon, UserCheck, LogOut, ChevronDown } from 'lucide-react';

const UserProfileHeaderBar: React.FC = () => {
  const {
    role,
    setRole,
    customerTab,
    setCustomerTab,
    beekeeperTab,
    setBeekeeperTab,
    labTab,
    setLabTab,
    adminTab,
    setAdminTab,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide header bar on splash or role_select
  if (role === 'splash' || role === 'role_select') return null;

  // Don't show profile bar if user is currently on login screen
  const isLoggedOut =
    (role === 'customer' && customerTab === 'login') ||
    (role === 'beekeeper' && beekeeperTab === 'login') ||
    (role === 'lab' && labTab === 'login') ||
    (role === 'admin' && adminTab === 'login');

  if (isLoggedOut) return null;

  // Dynamic User Details based on active role
  const userInfo = {
    customer: {
      name: 'Ananya Sharma',
      roleLabel: 'Customer',
      email: 'ananya@example.com',
      avatar: 'A',
      avatarBg: 'bg-amber-500 text-slate-950',
      onViewProfile: () => setCustomerTab('profile'),
      onLogout: () => setCustomerTab('login'),
    },
    beekeeper: {
      name: 'Ravi Kumar',
      roleLabel: 'Master Beekeeper',
      email: 'ravi.kumar@honiva.com',
      avatar: 'R',
      avatarBg: 'bg-emerald-500 text-white',
      onViewProfile: () => setBeekeeperTab('profile'),
      onLogout: () => setBeekeeperTab('login'),
    },
    lab: {
      name: 'Dr. Priya',
      roleLabel: 'Lab Officer',
      email: 'dr.priya@nael.gov.in',
      avatar: 'P',
      avatarBg: 'bg-purple-600 text-white',
      onViewProfile: () => setLabTab('profile'),
      onLogout: () => setLabTab('login'),
    },
    admin: {
      name: 'Admin Officer',
      roleLabel: 'System Admin',
      email: 'admin@honiva.com',
      avatar: 'A',
      avatarBg: 'bg-blue-600 text-white',
      onViewProfile: () => {},
      onLogout: () => setAdminTab('login'),
    },
  }[role as 'customer' | 'beekeeper' | 'lab' | 'admin'] || {
    name: 'User',
    roleLabel: 'Member',
    email: 'user@honiva.com',
    avatar: 'U',
    avatarBg: 'bg-slate-700 text-white',
    onViewProfile: () => {},
    onLogout: () => setRole('splash'),
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    userInfo.onLogout();
  };

  const handleViewProfile = () => {
    setIsMenuOpen(false);
    userInfo.onViewProfile();
  };

  return (
    <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-semibold select-none z-30 relative shadow-md">
      {/* Brand Title */}
      <div className="flex items-center gap-1.5 text-amber-400">
        <Hexagon className="w-3.5 h-3.5 stroke-[2.5]" />
        <span className="font-extrabold uppercase tracking-wide">HONIVA App</span>
      </div>

      {/* User Profile Button (Replaces Role Dropdown & Reload Icon) */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-750 text-white text-[11px] font-bold rounded-xl px-2.5 py-1 border border-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <div className={`w-4 h-4 rounded-full ${userInfo.avatarBg} flex items-center justify-center text-[10px] font-extrabold shadow-xs`}>
            {userInfo.avatar}
          </div>
          <span className="text-amber-300 font-extrabold">{userInfo.name}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu with Logout Option */}
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="absolute right-0 top-full mt-1.5 w-48 bg-slate-950 border border-slate-800 rounded-2xl p-2.5 shadow-2xl z-50 text-xs space-y-2">
              {/* User Details */}
              <div className="pb-2 border-b border-slate-800 px-1">
                <p className="font-extrabold text-white text-xs">{userInfo.name}</p>
                <p className="text-[10px] text-amber-400 font-medium">{userInfo.roleLabel}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{userInfo.email}</p>
              </div>

              {/* View Profile Action */}
              <button
                onClick={handleViewProfile}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-2 font-medium transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>View Profile</span>
              </button>

              {/* Logout Action */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-950/60 text-red-400 hover:text-red-300 flex items-center gap-2 font-bold transition-colors border-t border-slate-800/80 pt-2"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { role, customerTab, beekeeperTab, labTab, adminTab } = useApp();

  if (role === 'splash') {
    return <SplashScreen />;
  }

  if (role === 'role_select') {
    return <RoleSelection />;
  }

  // Customer Views
  if (role === 'customer') {
    switch (customerTab) {
      case 'login':
        return <RoleAuth targetRole="customer" />;
      case 'home':
        return <CustomerHome />;
      case 'scan':
        return <QRScannerModal />;
      case 'result':
        return <VerificationResult />;
      case 'journey':
        return <TraceabilityJourney />;
      case 'lab_report':
        return <LabReportView />;
      case 'learn':
        return <LearnAboutHoney />;
      case 'profile':
        return <CustomerProfile />;
      default:
        return <RoleAuth targetRole="customer" />;
    }
  }

  // Beekeeper Views
  if (role === 'beekeeper') {
    switch (beekeeperTab) {
      case 'login':
        return <RoleAuth targetRole="beekeeper" />;
      case 'dashboard':
        return <BeekeeperDashboard />;
      case 'hives':
        return <MyHives />;
      case 'hive_details':
        return <HiveDetails />;
      case 'analytics':
        return <SensorAnalytics />;
      case 'ai_health':
        return <AIColonyHealth />;
      case 'yield':
        return <HoneyYieldForecast />;
      case 'create_batch':
      case 'batches':
        return <CreateHoneyBatch />;
      case 'market':
        return <HoneyMarketplace />;
      case 'profile':
        return <BeekeeperProfile />;
      default:
        return <RoleAuth targetRole="beekeeper" />;
    }
  }

  // Lab Officer Views
  if (role === 'lab') {
    switch (labTab) {
      case 'login':
        return <RoleAuth targetRole="lab" />;
      case 'dashboard':
        return <LabDashboard />;
      case 'samples':
        return <PendingSamples />;
      case 'testing':
        return <SampleTestingForm />;
      case 'result':
        return <TestResultView />;
      case 'blockchain':
        return <BlockchainRecord />;
      case 'certificate':
        return <LaboratoryCertificate />;
      case 'profile':
        return <LabProfile />;
      default:
        return <RoleAuth targetRole="lab" />;
    }
  }

  // Admin View
  if (role === 'admin') {
    if (adminTab === 'login') {
      return <RoleAuth targetRole="admin" />;
    }
    return <AdminDashboard />;
  }

  return <RoleSelection />;
};

export function App() {
  return (
    <AppProvider>
      <MobileFrameWrapper>
        <UserProfileHeaderBar />
        <div className="flex-1 p-3 overflow-y-auto">
          <MainContent />
        </div>
        <BottomNav />
      </MobileFrameWrapper>
    </AppProvider>
  );
}

export default App;
