import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import { ShoppingBag, Flower2, FlaskConical, Building2, Hexagon } from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const { setRole, setCustomerTab, setBeekeeperTab, setLabTab, setAdminTab } = useApp();

  const handleSelectRole = (selectedRole: Role) => {
    setRole(selectedRole);
    if (selectedRole === 'customer') setCustomerTab('login');
    if (selectedRole === 'beekeeper') setBeekeeperTab('login');
    if (selectedRole === 'lab') setLabTab('login');
    if (selectedRole === 'admin') setAdminTab('login');
  };

  const cards = [
    {
      role: 'customer' as Role,
      title: 'Customer',
      subtitle: 'Verify & know your honey',
      icon: <ShoppingBag className="w-7 h-7 text-amber-700" />,
      bgColor: 'bg-amber-100/90 hover:bg-amber-100 border-amber-300',
      iconBg: 'bg-amber-200/80',
    },
    {
      role: 'beekeeper' as Role,
      title: 'Beekeeper',
      subtitle: 'Manage hives & track production',
      icon: <Flower2 className="w-7 h-7 text-emerald-700" />,
      bgColor: 'bg-emerald-100/90 hover:bg-emerald-100 border-emerald-300',
      iconBg: 'bg-emerald-200/80',
    },
    {
      role: 'lab' as Role,
      title: 'Lab Officer',
      subtitle: 'Test & certify honey samples',
      icon: <FlaskConical className="w-7 h-7 text-purple-700" />,
      bgColor: 'bg-purple-100/90 hover:bg-purple-100 border-purple-300',
      iconBg: 'bg-purple-200/80',
    },
    {
      role: 'admin' as Role,
      title: 'Admin',
      subtitle: 'Monitor & manage beekeeping network',
      icon: <Building2 className="w-7 h-7 text-blue-800" />,
      bgColor: 'bg-blue-100/90 hover:bg-blue-100 border-blue-300',
      iconBg: 'bg-blue-200/80',
    },
  ];

  return (
    <div className="w-full h-full min-h-[680px] p-5 flex flex-col justify-between bg-[#FAF8F5]">
      
      {/* Header matching Screen 2 */}
      <div className="text-center pt-4 pb-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 mx-auto flex items-center justify-center text-white shadow-md mb-3">
          <Hexagon className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
          HONIVA
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Choose your role to continue
        </p>
      </div>

      {/* 2x2 Grid of Role Cards matching Screen 2 */}
      <div className="grid grid-cols-2 gap-3.5 my-auto">
        {cards.map((card) => (
          <div
            key={card.role}
            onClick={() => handleSelectRole(card.role)}
            className={`${card.bgColor} rounded-3xl p-4 border shadow-xs transition-all duration-200 active:scale-95 hover:shadow-md cursor-pointer flex flex-col justify-between min-h-[140px]`}
          >
            <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-2 shadow-xs`}>
              {card.icon}
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{card.title}</h3>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug font-medium">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pb-2">
        <p className="text-[10px] text-slate-400">Tap a card to enter the interactive mobile prototype</p>
      </div>
    </div>
  );
};
