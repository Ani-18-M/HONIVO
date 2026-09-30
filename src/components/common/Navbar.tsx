import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import { NotificationCenter } from './NotificationCenter';
import {
  Hexagon,
  ShoppingBag,
  FlaskConical,
  ShieldCheck,
  Bell,
  Smartphone,
  Globe,
  Flower2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { role, setRole, notifications, isMobileFrameView, setIsMobileFrameView, setCustomerTab, setBeekeeperTab, setLabTab, setAdminTab } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (role === 'splash') return null;

  const roles: { id: Role; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'customer', label: 'Customer', icon: <ShoppingBag className="w-4 h-4" />, color: 'bg-amber-500' },
    { id: 'beekeeper', label: 'Beekeeper', icon: <Flower2 className="w-4 h-4" />, color: 'bg-emerald-600' },
    { id: 'lab', label: 'Lab Officer', icon: <FlaskConical className="w-4 h-4" />, color: 'bg-blue-600' },
    { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" />, color: 'bg-slate-800' },
  ];

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === 'customer') setCustomerTab('home');
    if (newRole === 'beekeeper') setBeekeeperTab('dashboard');
    if (newRole === 'lab') setLabTab('dashboard');
    if (newRole === 'admin') setAdminTab('dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Title & Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRole('splash')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-white shadow-honey">
                <Hexagon className="w-6 h-6 stroke-[2.5] text-white fill-amber-300/30" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 font-serif">HONIVA</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    Live
                  </span>
                </div>
                <p className="text-[10px] font-medium text-amber-700 tracking-wide">From Hive to Home</p>
              </div>
            </div>

            {/* Desktop Role Switcher Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-2xl border border-amber-200/60">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 ${
                    role === r.id
                      ? 'bg-white text-slate-900 shadow-md border border-amber-200/80 scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
                  }`}
                >
                  <span className={`p-1 rounded-lg text-white ${r.color}`}>{r.icon}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>

            {/* Right Side Tools */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* View Switcher Button */}
              <button
                onClick={() => setIsMobileFrameView(!isMobileFrameView)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
                title="Toggle Phone Frame View"
              >
                {isMobileFrameView ? (
                  <>
                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                    <span>Web View</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mobile Screen View</span>
                  </>
                )}
              </button>

              {/* Role Dropdown for Mobile Header */}
              <div className="md:hidden relative">
                <select
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value as Role)}
                  className="bg-amber-50 font-bold text-xs text-amber-900 border border-amber-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="customer">🛒 Customer</option>
                  <option value="beekeeper">🐝 Beekeeper</option>
                  <option value="lab">🧪 Lab Officer</option>
                  <option value="admin">📊 Admin</option>
                </select>
              </div>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition-colors"
                title="View Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Current Role Avatar */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center border-2 border-amber-200 shadow-xs">
                  {role === 'customer' && 'C'}
                  {role === 'beekeeper' && 'RK'}
                  {role === 'lab' && 'DP'}
                  {role === 'admin' && 'AD'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Notification Panel */}
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
