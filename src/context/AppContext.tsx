import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRoadmapSteps } from '../data/mockData';

export type ResolutionPath = 'restructure' | 'settle' | 'foreclose' | 'repay' | null;
export type TrackerStatus = 'requested' | 'reviewing' | 'offer' | 'confirmed';

export interface TrackerNote {
  id: string;
  text: string;
  time: string;
}

export interface RoadmapStep {
  id: number;
  label: string;
  done: boolean;
}

interface AppState {
  selectedPath: ResolutionPath;
  setSelectedPath: (p: ResolutionPath) => void;
  trackerStatus: TrackerStatus;
  setTrackerStatus: (s: TrackerStatus) => void;
  trackerNotes: TrackerNote[];
  addTrackerNote: (text: string) => void;
  roadmapSteps: RoadmapStep[];
  toggleRoadmapStep: (id: number) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

const LS_KEY = 'nivaran_state';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedPath, setSelectedPath] = useState<ResolutionPath>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved).selectedPath ?? null : null;
    } catch { return null; }
  });

  const [trackerStatus, setTrackerStatus] = useState<TrackerStatus>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved).trackerStatus ?? 'reviewing' : 'reviewing';
    } catch { return 'reviewing'; }
  });

  const [trackerNotes, setTrackerNotes] = useState<TrackerNote[]>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved).trackerNotes ?? [] : [];
    } catch { return []; }
  });

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved).roadmapSteps ?? initialRoadmapSteps : initialRoadmapSteps;
    } catch { return initialRoadmapSteps; }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved ? JSON.parse(saved).isLoggedIn ?? false : false;
    } catch { return false; }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({
        selectedPath, trackerStatus, trackerNotes, roadmapSteps, isLoggedIn
      }));
    } catch { /* ignore */ }
  }, [selectedPath, trackerStatus, trackerNotes, roadmapSteps, isLoggedIn]);

  const addTrackerNote = (text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = 'Today, ' + timeStr.toUpperCase();
    setTrackerNotes(prev => [...prev, { id: Date.now().toString(), text, time: dateStr }]);
  };

  const toggleRoadmapStep = (id: number) => {
    setRoadmapSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  return (
    <AppContext.Provider value={{
      selectedPath, setSelectedPath,
      trackerStatus, setTrackerStatus,
      trackerNotes, addTrackerNote,
      roadmapSteps, toggleRoadmapStep,
      isLoggedIn, setIsLoggedIn,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
