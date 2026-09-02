import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScoreGauge from '../components/ScoreGauge';
import LoanCard from '../components/LoanCard';
import { mockUser, mockLoans } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">

        {/* ── Header ── */}
        <div className="px-6 pt-8 pb-0 flex items-start justify-between">
          <div>
            <p className="text-sm text-text-secondary leading-none mb-1">{greeting}</p>
            <h1 className="text-[20px] font-bold text-text-primary leading-tight">
              Here's your credit picture
            </h1>
          </div>
          <button
            className="w-9 h-9 rounded-full bg-white border border-border-card flex items-center justify-center flex-shrink-0 mt-0.5"
            aria-label="Notifications"
          >
            <Bell size={17} className="text-text-secondary" strokeWidth={1.6} />
          </button>
        </div>

        <div className="px-6">
          {/* ── Credit Score Card ── */}
          <div className="card mt-5 mb-4">
            <p className="text-center text-[10px] font-semibold text-text-secondary tracking-[0.12em] uppercase mb-1">
              Credit Score
            </p>

            {/* Gauge */}
            <div className="flex justify-center">
              <ScoreGauge score={612} size="md" showLabel={false} />
            </div>

            {/* Score number + badge – clearly below the gauge */}
            <div className="text-center mt-2">
              <div className="text-[42px] font-bold text-text-primary leading-none">612</div>
              <div className="mt-3 inline-flex">
                <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-overdue-bg text-overdue">
                  Needs attention
                </span>
              </div>
              <p className="text-text-secondary text-xs mt-2.5 leading-relaxed px-2">
                Your credit health can improve with consistent repayment.
              </p>
            </div>
          </div>

          {/* ── Metric Cards ── */}
          <div className="flex gap-2.5 mb-5">
            <div className="metric-card">
              <div className="text-[15px] font-bold text-text-primary">{mockUser.totalOutstanding}</div>
              <div className="text-[11px] text-text-secondary mt-0.5 leading-tight">Total outstanding</div>
            </div>
            <div className="metric-card">
              <div className="text-[15px] font-bold text-text-primary">{mockUser.monthlyEMI}</div>
              <div className="text-[11px] text-text-secondary mt-0.5 leading-tight">Monthly EMIs</div>
            </div>
            <div
              className="metric-card"
              style={{ backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }}
            >
              <div className="text-[15px] font-bold text-overdue">{mockUser.totalOverdue}</div>
              <div className="text-[11px] text-overdue mt-0.5 leading-tight">Overdue</div>
            </div>
          </div>

          {/* ── Loans ── */}
          <div className="mb-4">
            <h2 className="text-[15px] font-bold text-text-primary mb-3">Your loans</h2>
            {mockLoans.map(loan => (
              <LoanCard key={loan.id} {...loan} />
            ))}
          </div>

          {/* ── CTA ── */}
          <button
            id="see-what-you-can-do-btn"
            onClick={() => navigate('/diagnosis')}
            className="btn-primary flex items-center justify-center gap-2 mb-4"
          >
            See what you can do
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
