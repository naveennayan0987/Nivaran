import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Check, Clock, FileText, CheckCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { resolutionOptions } from '../data/mockData';

const STATUS_ORDER = ['requested', 'reviewing', 'offer', 'confirmed'] as const;
type TrackerStatus = typeof STATUS_ORDER[number];

const STATUS_LABELS: Record<TrackerStatus, string> = {
  requested: 'Requested',
  reviewing: 'Lender Reviewing',
  offer: 'Offer Received',
  confirmed: 'Confirmed',
};

const STATUS_ICONS: Record<TrackerStatus, React.ComponentType<{ size: number; className?: string }>> = {
  requested: FileText,
  reviewing: Clock,
  offer: FileText,
  confirmed: CheckCircle,
};

export default function Tracker() {
  const navigate = useNavigate();
  const { trackerStatus, setTrackerStatus, trackerNotes, addTrackerNote } = useApp();
  const selectedPath = useApp().selectedPath ?? 'restructure';
  const option = resolutionOptions.find(o => o.id === selectedPath) ?? resolutionOptions[0];

  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const currentIdx = STATUS_ORDER.indexOf(trackerStatus as TrackerStatus);

  const advanceStatus = () => {
    if (currentIdx < STATUS_ORDER.length - 1) {
      setTrackerStatus(STATUS_ORDER[currentIdx + 1]);
    }
  };

  const handleAddNote = () => {
    if (noteText.trim()) {
      addTrackerNote(noteText.trim());
      setNoteText('');
      setShowNoteInput(false);
    }
  };

  const baseTimeline = [
    { text: 'Request submitted', time: 'Today, 10:32 AM', type: 'system' },
    { text: 'Lender acknowledged your request', time: 'Today, 1:10 PM', type: 'system' },
  ];

  return (
    <div className="app-shell">
      <div className="page-content no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-8 pb-2 flex items-center gap-3">
          <button onClick={() => navigate('/pathway')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors">
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
          <h1 className="text-[20px] font-bold text-text-primary">Request Tracker</h1>
        </div>

        <div className="px-6 pb-6">
          {/* Loan & pathway info */}
          <div className="card mt-4 mb-4">
            <div className="text-xs text-text-secondary uppercase tracking-widest mb-1">Loan</div>
            <div className="font-bold text-text-primary">HDFC Bank — Personal Loan</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-accent-light px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-accent text-xs font-semibold">{option.title}</span>
              </div>
              <span className="text-text-muted text-xs">selected pathway</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="card mb-4">
            <div className="flex items-center justify-between relative">
              {/* Connector line */}
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-border-light mx-10" />
              <div
                className="absolute left-0 top-4 h-0.5 bg-accent mx-10 transition-all duration-500"
                style={{ width: `${(currentIdx / (STATUS_ORDER.length - 1)) * (100 - (20 / STATUS_ORDER.length))}%` }}
              />

              {STATUS_ORDER.map((s, i) => {
                const done = i < currentIdx;
                const active = i === currentIdx;
                const Icon = STATUS_ICONS[s];
                return (
                  <div key={s} className="flex flex-col items-center gap-1.5 z-10" style={{ flex: 1 }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      done ? 'bg-accent' : active ? 'bg-accent border-2 border-accent' : 'bg-white border-2 border-border-light'
                    }`}>
                      {done ? (
                        <Check size={14} className="text-white" />
                      ) : (
                        <Icon size={13} className={active ? 'text-white' : 'text-text-muted'} />
                      )}
                    </div>
                    <span className={`text-[9px] font-medium text-center leading-tight ${active ? 'text-accent font-semibold' : done ? 'text-text-secondary' : 'text-text-muted'}`}>
                      {STATUS_LABELS[s]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current status display */}
            <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
              <div>
                <div className="text-xs text-text-secondary">Current status</div>
                <div className="font-semibold text-text-primary text-sm">{STATUS_LABELS[trackerStatus as TrackerStatus]}</div>
              </div>
              {currentIdx < STATUS_ORDER.length - 1 && (
                <button
                  id="advance-status-btn"
                  onClick={advanceStatus}
                  className="text-xs bg-accent text-white px-3 py-1.5 rounded-lg font-medium"
                >
                  Advance status ›
                </button>
              )}
              {currentIdx === STATUS_ORDER.length - 1 && (
                <span className="text-xs text-on-track font-semibold bg-on-track-bg px-3 py-1.5 rounded-lg">
                  ✓ Complete
                </span>
              )}
            </div>
          </div>

          {/* Communication timeline */}
          <div className="mb-4">
            <h2 className="text-base font-bold text-text-primary mb-3">Activity timeline</h2>
            <div className="space-y-3">
              {baseTimeline.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div className="flex-1 bg-white rounded-xl border border-border-card p-3">
                    <div className="text-sm font-medium text-text-primary">{item.text}</div>
                    <div className="text-xs text-text-muted mt-0.5">{item.time}</div>
                  </div>
                </div>
              ))}

              {/* User notes */}
              {trackerNotes.map(note => (
                <div key={note.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-mid mt-2 flex-shrink-0" />
                  <div className="flex-1 bg-accent-light rounded-xl border border-accent/20 p-3">
                    <div className="text-xs text-accent font-semibold mb-0.5">Your note</div>
                    <div className="text-sm text-text-primary">{note.text}</div>
                    <div className="text-xs text-text-muted mt-0.5">{note.time}</div>
                  </div>
                </div>
              ))}

              {/* Add note */}
              {showNoteInput ? (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-border-light mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <textarea
                      autoFocus
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Add your note here..."
                      className="w-full bg-white border border-accent rounded-xl p-3 text-sm text-text-primary outline-none resize-none"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={handleAddNote} className="flex-1 bg-accent text-white text-xs font-semibold py-2 rounded-lg">
                        Save note
                      </button>
                      <button onClick={() => setShowNoteInput(false)} className="flex-1 border border-border-card text-text-secondary text-xs font-medium py-2 rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  id="add-note-btn"
                  onClick={() => setShowNoteInput(true)}
                  className="flex items-center gap-2 text-accent text-sm font-medium pl-5"
                >
                  <Plus size={16} />
                  Add note
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
