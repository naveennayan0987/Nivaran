interface LoanCardProps {
  bank: string;
  type: string;
  outstanding: string;
  emi: string;
  emiLabel: string;
  status: 'overdue' | 'on-track' | 'due-soon';
  statusLabel: string;
  isMinDue?: boolean;
}

export default function LoanCard({
  bank, type, outstanding, emi, emiLabel, status, statusLabel, isMinDue
}: LoanCardProps) {
  const badgeClass =
    status === 'overdue'   ? 'badge-overdue' :
    status === 'on-track'  ? 'badge-on-track' :
                             'badge-due-soon';

  return (
    <div className="card mb-3">
      {/* Bank name + badge row */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-text-primary text-[14px] leading-snug">{bank}</div>
          <div className="text-text-secondary text-xs mt-0.5">{type}</div>
        </div>
        <span className={badgeClass}>{statusLabel}</span>
      </div>

      {/* Amount row */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[22px] font-bold text-text-primary leading-none">{outstanding}</div>
          <div className="text-[11px] text-text-secondary mt-1">Outstanding</div>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-semibold text-text-primary leading-none">
            {emi}{' '}
            <span className="text-text-secondary font-normal text-xs">{emiLabel}</span>
          </div>
          <div className="text-[11px] text-text-secondary mt-1">{isMinDue ? 'Minimum due' : 'EMI'}</div>
        </div>
      </div>
    </div>
  );
}
