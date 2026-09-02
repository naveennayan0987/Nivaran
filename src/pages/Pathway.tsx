import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, Info } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { resolutionOptions } from '../data/mockData';

export default function Pathway() {
  const navigate = useNavigate();
  const { selectedPath } = useApp();

  const option = resolutionOptions.find(o => o.id === selectedPath) ?? resolutionOptions[0];

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-8 pb-2 flex items-center gap-3">
          <button onClick={() => navigate('/diagnosis')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors">
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-[20px] font-bold text-text-primary">Resolution Pathway</h1>
        </div>

        <div className="px-6 pb-6">
          {/* Selected option badge */}
          <div className="mt-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-accent-light px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-accent text-sm font-semibold">{option.title}</span>
            </div>
          </div>

          {/* EMI comparison card */}
          <div className="card mb-4">
            <h2 className="text-base font-bold text-text-primary mb-3">EMI comparison</h2>
            <div className="flex gap-4">
              <div className="flex-1 bg-bg rounded-xl p-3">
                <div className="text-xs text-text-secondary mb-1">Current EMI</div>
                <div className="text-lg font-bold text-text-primary">{option.currentEMI}</div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-px bg-border-light relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-accent" />
                </div>
              </div>
              <div className="flex-1 bg-accent-light rounded-xl p-3">
                <div className="text-xs text-accent mb-1">
                  {option.id === 'restructure' ? 'Potential EMI' : 'Outcome'}
                </div>
                <div className="text-base font-bold text-accent">{option.potentialEMI}</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-3 flex items-start gap-2 bg-bg rounded-xl p-3">
              <Info size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                Illustrative estimate — actual terms depend on lender.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="card mb-4">
            <h2 className="text-base font-bold text-text-primary mb-3">How it works</h2>
            <div className="space-y-3">
              {option.howItWorks.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Credit considerations */}
          <div className="card mb-5">
            <h2 className="text-base font-bold text-text-primary mb-3">Credit considerations</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-text-primary mb-0.5">Short term</div>
                  <p className="text-xs text-text-secondary leading-relaxed">{option.shortTermNote}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-mid mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-text-primary mb-0.5">Long term</div>
                  <p className="text-xs text-text-secondary leading-relaxed">{option.longTermNote}</p>
                </div>
              </div>
            </div>

            {/* No guarantees note */}
            <div className="mt-3 flex items-start gap-2 bg-bg rounded-xl p-3">
              <AlertTriangle size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">
                We cannot guarantee specific credit score changes. Improvements depend on consistent repayment behavior and lender reporting.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <button
            id="start-request-btn"
            onClick={() => navigate('/tracker')}
            className="btn-primary mb-3"
          >
            Start this request
          </button>
          <button
            id="compare-options-btn"
            onClick={() => navigate('/diagnosis')}
            className="btn-secondary"
          >
            Compare other options
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
