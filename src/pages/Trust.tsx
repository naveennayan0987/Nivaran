import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye } from 'lucide-react';

export default function Trust() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="page-content-full flex flex-col px-5">
        {/* Logo */}
        <div className="pt-12 pb-8 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-base">N</span>
          </div>
          <span className="text-text-primary font-bold text-xl">Nivaran</span>
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Icon cluster */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center">
              <Shield size={36} className="text-accent" strokeWidth={1.5} />
            </div>
          </div>

          {/* Main message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary leading-snug mb-4">
              We don't lend money.<br />
              <span className="text-accent">We help you resolve</span><br />
              your debt.
            </h1>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
              Nivaran is an independent advisor. We work for you — not for lenders or banks.
            </p>
          </div>

          {/* Trust pillars */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-border-card p-4">
              <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Bank-grade security</div>
                <div className="text-xs text-text-secondary mt-0.5">Your data is encrypted and never shared</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-border-card p-4">
              <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Read-only access</div>
                <div className="text-xs text-text-secondary mt-0.5">We view your report — we cannot move money</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-border-card p-4">
              <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">No judgment</div>
                <div className="text-xs text-text-secondary mt-0.5">We're here to help, not to assess blame</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pb-10">
          <button
            id="continue-securely-btn"
            onClick={() => navigate('/input')}
            className="btn-primary"
          >
            Continue securely
          </button>
        </div>
      </div>
    </div>
  );
}
