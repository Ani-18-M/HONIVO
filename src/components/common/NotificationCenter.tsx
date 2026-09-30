import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, Info, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, setRole, setBeekeeperTab, setLabTab, setCustomerTab } = useApp();

  if (!isOpen) return null;

  const handleNotifClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.role === 'beekeeper') {
      setRole('beekeeper');
      setBeekeeperTab('hive_details');
    } else if (notif.role === 'lab') {
      setRole('lab');
      setLabTab('samples');
    } else if (notif.role === 'customer') {
      setRole('customer');
      setCustomerTab('result');
    }
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="w-5 h-5 text-red-500" />;
      case 'attention':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animation-slide-in">
        <div className="p-4 bg-amber-500 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Bell className="w-5 h-5" />
            <span>HONIVA Alerts</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-amber-600 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900">
          Real-time updates across Beekeepers, Labs, and Consumers.
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotifClick(n)}
                className={`p-3 rounded-xl mb-2 transition-all cursor-pointer ${
                  n.read ? 'bg-slate-50 opacity-75' : 'bg-amber-50/50 border border-amber-200 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(n.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-sm">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                      Role: {n.role}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
