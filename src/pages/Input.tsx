import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Link, PenLine, ChevronRight } from 'lucide-react';

export default function Input() {
  const navigate = useNavigate();

  const options = [
    {
      id: 'connect',
      icon: Link,
      title: 'Connect credit report',
      subtitle: 'Securely link your CIBIL or Experian report',
      tag: 'Recommended',
      tagColor: 'text-accent bg-accent-light',
    },
    {
      id: 'manual',
      icon: PenLine,
      title: 'Add manually',
      subtitle: 'Enter your loan and card details yourself',
      tag: null,
    },
  ];

  return (
    <div className="app-shell">
      <div className="page-content-full flex flex-col px-5">
        <div className="pt-12 pb-6">
          <button onClick={() => navigate('/trust')} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-border-light transition-colors">
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary leading-snug mb-2">
            How would you like to<br />add your data?
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            We need your loan information to build your financial picture.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-auto">
          {options.map(opt => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                id={`input-${opt.id}-btn`}
                onClick={() => navigate('/home')}
                className="w-full bg-white rounded-2xl border border-border-card p-4 flex items-center gap-4 text-left hover:border-accent transition-colors active:bg-accent-light"
              >
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex-1">
                  {opt.tag && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${opt.tagColor} inline-block mb-1`}>
                      {opt.tag}
                    </span>
                  )}
                  <div className="text-sm font-semibold text-text-primary">{opt.title}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{opt.subtitle}</div>
                </div>
                <ChevronRight size={18} className="text-text-muted flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Security note */}
        <div className="pb-10 pt-6">
          <p className="text-center text-text-muted text-xs">
            256-bit encrypted connection · Read-only access
          </p>
        </div>
      </div>
    </div>
  );
}
