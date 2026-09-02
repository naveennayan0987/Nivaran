import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="page-content-full flex flex-col">

        {/* Logo header */}
        <div className="px-6 pt-10 pb-4 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-base">N</span>
          </div>
          <span className="text-text-primary font-bold text-[20px] tracking-tight">Nivaran</span>
        </div>

        {/* Hero illustration */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-2 pb-6">
          {/* Card cluster */}
          <div className="relative w-[260px] h-[200px] mx-auto">
            {/* Left background card */}
            <div className="absolute top-3 left-0 w-[110px] h-[52px] bg-white rounded-xl border border-border-card shadow-sm flex items-center px-3 gap-2 z-10">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <path d="M2 7l3.5 3.5L12 3" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 bg-border-light rounded-full w-full"/>
                <div className="h-1.5 bg-border-light rounded-full w-3/4"/>
              </div>
            </div>

            {/* Right background card */}
            <div className="absolute top-3 right-0 w-[110px] h-[52px] bg-white rounded-xl border border-border-card shadow-sm flex items-center px-3 z-10">
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 bg-border-light rounded-full w-full"/>
                <div className="h-1.5 bg-border-light rounded-full w-4/5"/>
                <div className="h-1.5 bg-border-light rounded-full w-3/5"/>
              </div>
            </div>

            {/* Main score card */}
            <div className="absolute top-[44px] left-1/2 -translate-x-1/2 bg-white rounded-2xl border border-border-card shadow-md px-6 pt-4 pb-5 flex flex-col items-center z-20 w-[168px]">
              <ScoreGauge score={612} size="sm" showLabel={false} />
              <div className="text-2xl font-bold text-text-primary mt-1 leading-none">612</div>
              <div className="text-[11px] text-text-secondary mt-1">Credit Score</div>
            </div>

            {/* +12 pts badge */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-accent-light rounded-full px-3 py-1.5 flex items-center gap-1.5 z-30">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 9.5V2.5M6 2.5L3.5 5M6 2.5L8.5 5" stroke="#2D6A4F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-accent text-xs font-semibold">+12 pts</span>
            </div>
          </div>

          {/* Copy */}
          <div className="w-full mt-10">
            <h1 className="text-[28px] font-bold text-text-primary leading-tight mb-3">
              Take control of your<br />financial future.
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nivaran helps you{' '}
              <span className="text-accent font-semibold">understand your debt</span>
              , explore your options, and{' '}
              <span className="text-accent font-semibold">move forward</span>
              {' '}— one step at a time.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-10 pt-2">
          <button
            id="get-started-btn"
            onClick={() => navigate('/login')}
            className="btn-primary mb-4"
          >
            Get Started
          </button>
          <div className="flex items-center justify-center gap-1.5">
            <Shield size={13} className="text-text-muted" strokeWidth={1.6} />
            <span className="text-text-muted text-xs">Private and secure. We never lend money.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
