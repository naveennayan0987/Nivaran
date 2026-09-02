import { useNavigate } from 'react-router-dom';
import { User, ChevronRight, Bell, Shield, HelpCircle, LogOut, Settings } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

const profileItems = [
  { icon: User, label: 'Personal information', id: 'personal-info' },
  { icon: Shield, label: 'Data & privacy', id: 'data-privacy' },
  { icon: Bell, label: 'Notification preferences', id: 'notifications' },
  { icon: Settings, label: 'App settings', id: 'settings' },
  { icon: HelpCircle, label: 'Help & support', id: 'help' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">
        <div className="px-6 pt-8 pb-0">
          <h1 className="text-[20px] font-bold text-text-primary">Profile</h1>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar card */}
          <div className="card mt-4 mb-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <div>
              <div className="font-bold text-text-primary text-lg">Arjun Sharma</div>
              <div className="text-text-secondary text-sm mt-0.5">+91 98765 43210</div>
              <div className="mt-1 inline-flex items-center gap-1 bg-accent-light px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-accent text-[10px] font-semibold">Active member</span>
              </div>
            </div>
          </div>

          {/* Credit snapshot */}
          <div className="card mb-5">
            <div className="text-xs text-text-secondary uppercase tracking-widest font-semibold mb-3">Credit snapshot</div>
            <div className="flex gap-4">
              <div className="flex-1 text-center">
                <div className="text-xl font-bold text-text-primary">624</div>
                <div className="text-xs text-text-secondary mt-0.5">Credit score</div>
              </div>
              <div className="w-px bg-border-light" />
              <div className="flex-1 text-center">
                <div className="text-xl font-bold text-text-primary">₹8.4L</div>
                <div className="text-xs text-text-secondary mt-0.5">Outstanding</div>
              </div>
              <div className="w-px bg-border-light" />
              <div className="flex-1 text-center">
                <div className="text-xl font-bold text-overdue">₹47.2K</div>
                <div className="text-xs text-text-secondary mt-0.5">Overdue</div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="card mb-5">
            <div className="space-y-1">
              {profileItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`profile-${item.id}-btn`}
                    className={`w-full flex items-center gap-3 py-3 text-left ${i < profileItems.length - 1 ? 'border-b border-border-light' : ''}`}
                  >
                    <Icon size={18} className="text-text-secondary flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium text-text-primary">{item.label}</span>
                    <ChevronRight size={16} className="text-text-muted" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Log out */}
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-white border border-border-card rounded-2xl py-4 px-4 text-left"
          >
            <LogOut size={18} className="text-red-400 flex-shrink-0" />
            <span className="text-red-400 font-semibold text-sm">Log out</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
