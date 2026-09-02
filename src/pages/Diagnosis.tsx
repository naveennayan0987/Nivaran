import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { resolutionOptions } from '../data/mockData';
import type { ResolutionPath } from '../context/AppContext';

export default function Diagnosis() {
  const navigate = useNavigate();
  const { setSelectedPath } = useApp();

  const handleSelect = (id: ResolutionPath) => {
    setSelectedPath(id);
    navigate('/pathway');
  };

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-8 pb-2 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors">
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-[20px] font-bold text-text-primary">Debt Diagnosis</h1>
        </div>

        <div className="px-6 pb-6">
          {/* Why behind card */}
          <div className="card mt-4 mb-4">
            <h2 className="text-lg font-bold text-text-primary mb-2">Here's why you're behind</h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your monthly EMIs take up a large part of your estimated income. Two accounts are overdue, which is putting additional pressure on your credit health.
            </p>

            {/* Visual stress indicators */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-text-secondary">EMI-to-income ratio</span>
                  <span className="text-overdue font-semibold">High</span>
                </div>
                <div className="h-2 bg-border-light rounded-full overflow-hidden">
                  <div className="h-full bg-overdue rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-text-secondary">Overdue accounts</span>
                  <span className="text-overdue font-semibold">2 of 3</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-2 flex-1 bg-overdue rounded-full" />
                  <div className="h-2 flex-1 bg-border-light rounded-full overflow-hidden">
                    <div className="h-full bg-overdue-bg rounded-full w-full border border-overdue-border" />
                  </div>
                  <div className="h-2 flex-1 bg-on-track rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Resolution options */}
          <div className="mb-2">
            <h2 className="text-[15px] font-bold text-text-primary mb-3">What could you do next?</h2>

            {/* Main resolution cards */}
            <div className="space-y-3 mb-3">
              {resolutionOptions.map(opt => (
                <button
                  key={opt.id}
                  id={`resolution-${opt.id}-btn`}
                  onClick={() => handleSelect(opt.id as ResolutionPath)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.99]
                    ${opt.recommended
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-border-card hover:border-accent'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      {opt.recommended && (
                        <div className="flex items-center gap-1 mb-2">
                          <Sparkles size={12} className="text-accent-light" />
                          <span className="text-[10px] font-semibold text-accent-light tracking-wide uppercase">
                            Recommended starting point
                          </span>
                        </div>
                      )}
                      <div className={`text-base font-bold mb-1 ${opt.recommended ? 'text-white' : 'text-text-primary'}`}>
                        {opt.title}
                      </div>
                      <p className={`text-xs leading-relaxed ${opt.recommended ? 'text-green-100' : 'text-text-secondary'}`}>
                        {opt.subtitle}
                      </p>
                    </div>
                    <ArrowRight size={18} className={opt.recommended ? 'text-white mt-1 flex-shrink-0' : 'text-text-muted mt-1 flex-shrink-0'} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
