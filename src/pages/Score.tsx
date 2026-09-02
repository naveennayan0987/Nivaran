import { useNavigate } from 'react-router-dom';
import { ArrowUp, Check, ArrowRight, Bell } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScoreGauge from '../components/ScoreGauge';
import ScoreChart from '../components/ScoreChart';

const scoreFactors = [
  { label: 'Consistent repayment',             done: true  },
  { label: 'Reduce credit utilization',         done: false },
  { label: 'Resolve overdue accounts',          done: false },
];

export default function Score() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">

        {/* ── Header ── */}
        <div className="px-6 pt-8 pb-0">
          <h1 className="text-[20px] font-bold text-text-primary">Your credit journey</h1>
        </div>

        <div className="px-6 pb-4">

          {/* ── Score card ── */}
          <div className="card mt-5 mb-4">
            {/* Gauge */}
            <div className="flex justify-center">
              <ScoreGauge score={624} size="md" showLabel={false} />
            </div>

            {/* Score number — clearly below the gauge arc */}
            <div className="text-center mt-2">
              <div className="text-[42px] font-bold text-text-primary leading-none">624</div>

              {/* +12 pts badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 bg-accent-light px-3.5 py-1.5 rounded-full">
                <ArrowUp size={13} className="text-accent" strokeWidth={2} />
                <span className="text-accent text-xs font-semibold">+12 points</span>
              </div>

              <p className="text-text-secondary text-xs mt-2 leading-relaxed">
                Since your first Nivaran check
              </p>
            </div>
          </div>

          {/* ── Score history chart ── */}
          <div className="card mb-4">
            <h2 className="text-sm font-semibold text-text-secondary mb-4">Score history</h2>
            <div className="w-full">
              <ScoreChart />
            </div>
          </div>

          {/* ── Next milestone ── */}
          <div className="card mb-4">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-[15px] font-bold text-text-primary">Next milestone</h2>
              <span className="text-accent text-[22px] font-bold leading-none">650</span>
            </div>
            <p className="text-text-secondary text-xs mb-3">26 points to go</p>
            <div className="h-2 bg-border-light rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: '62%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
              <span>624 current</span>
              <span>650 target</span>
            </div>
          </div>

          {/* ── Score factors ── */}
          <div className="card mb-4">
            <h2 className="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-3">
              Score factors
            </h2>
            <div className="space-y-3">
              {scoreFactors.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      item.done ? 'bg-accent border-accent' : 'border-border-card'
                    }`}
                  >
                    {item.done && <Check size={11} className="text-white" strokeWidth={2.5} />}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Reminder card ── */}
          <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #fff 60%, #D8EFE3 100%)', borderColor: '#C5E8D5' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell size={18} className="text-accent" strokeWidth={1.6} />
              </div>
              <div>
                <div className="font-semibold text-text-primary text-sm">Keep going</div>
                <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                  Your next EMI is due in 5 days.
                </p>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <button
            id="view-repayment-plan-btn"
            onClick={() => navigate('/roadmap')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            View repayment plan
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
