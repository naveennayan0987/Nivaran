import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, ArrowRight, Target } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';

export default function Roadmap() {
  const navigate = useNavigate();
  const { roadmapSteps, toggleRoadmapStep } = useApp();

  const completed = roadmapSteps.filter(s => s.done).length;
  const total = roadmapSteps.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-8 pb-2 flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors">
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-[20px] font-bold text-text-primary">Recovery Roadmap</h1>
        </div>

        <div className="px-6 pb-6">
          {/* Progress header */}
          <div className="card mt-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-text-primary">Your recovery plan</h2>
                <p className="text-text-secondary text-xs mt-0.5">{completed} of {total} steps completed</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent-light flex items-center justify-center">
                <span className="text-accent text-sm font-bold">{pct}%</span>
              </div>
            </div>
            <div className="h-2 bg-border-light rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="card mb-4">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-3">Steps</h2>
            <div className="space-y-2.5">
              {roadmapSteps.map(step => (
                <button
                  key={step.id}
                  id={`roadmap-step-${step.id}`}
                  onClick={() => toggleRoadmapStep(step.id)}
                  className="w-full flex items-center gap-3 text-left group"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    step.done
                      ? 'bg-accent border-accent'
                      : 'border-border-card group-hover:border-accent'
                  }`}>
                    {step.done && <Check size={13} className="text-white" />}
                  </div>
                  <span className={`text-sm leading-relaxed ${step.done ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Next milestone card */}
          <div className="card border-accent/30 bg-gradient-to-br from-white to-accent-light mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={18} className="text-accent" />
              <h2 className="text-sm font-bold text-text-primary">Next milestone</h2>
            </div>
            <p className="text-sm text-text-secondary mb-3">Reach a healthier credit profile</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '62%' }} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-accent text-lg font-bold">650</span>
                <span className="text-text-muted text-xs">target</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">26 points to go from current 624</p>
          </div>

          {/* CTA */}
          <button
            id="view-next-step-btn"
            onClick={() => navigate('/score')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            View next step
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
