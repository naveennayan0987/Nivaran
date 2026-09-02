import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, FileText, Star, User } from 'lucide-react';

const tabs = [
  { label: 'Home',      icon: Home,     path: '/home'      },
  { label: 'Diagnosis', icon: Search,   path: '/diagnosis' },
  { label: 'Track',     icon: FileText, path: '/tracker'   },
  { label: 'Score',     icon: Star,     path: '/score'     },
  { label: 'Profile',   icon: User,     path: '/profile'   },
];

/**
 * Sticky bottom nav inside the 390px app shell.
 * Uses sticky positioning relative to the .app-shell flex column
 * so it never floats over content on narrow viewports.
 */
export default function BottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <nav
      className="w-full bg-white z-50 flex-shrink-0"
      style={{
        borderTop:  '1px solid #EDEBE7',
        boxShadow:  '0 -2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center justify-around px-1 pt-2 pb-4">
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              id={`nav-${label.toLowerCase().replace(' ', '-')}`}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 rounded-xl transition-colors min-w-0"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.6}
                style={{ color: active ? '#2D6A4F' : '#9BA8A5' }}
              />
              <span
                className="text-[10px] leading-none mt-0.5"
                style={{
                  color:      active ? '#2D6A4F' : '#9BA8A5',
                  fontWeight: active ? 600 : 500,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
