import React from 'react';
import {
  SystemConnectionStatus,
  TodayViewState,
  CalendarViewState,
  BudgetState,
} from '../types';
import { X, Sliders, CheckCircle2 } from 'lucide-react';

interface StateInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionStatus: SystemConnectionStatus;
  setConnectionStatus: (s: SystemConnectionStatus) => void;
  todayState: TodayViewState;
  setTodayState: (s: TodayViewState) => void;
  calendarState: CalendarViewState;
  setCalendarState: (s: CalendarViewState) => void;
  budget: BudgetState;
  setBudget: React.Dispatch<React.SetStateAction<BudgetState>>;
}

export const StateInspectorModal: React.FC<StateInspectorModalProps> = ({
  isOpen,
  onClose,
  connectionStatus,
  setConnectionStatus,
  todayState,
  setTodayState,
  calendarState,
  setCalendarState,
  budget,
  setBudget,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f131c] border border-[#27354a] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#1e283a] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#162032] text-indigo-400 border border-[#27384f]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                System State Simulation Sandbox
              </h3>
              <p className="text-xs text-slate-400">
                Trigger and test any deterministic state from Sheets A, B, and C
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-[#182030]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Database Connection */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono font-bold uppercase text-indigo-400">
            1. Database Connection Status (Sheet C 1 &amp; 2)
          </label>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <button
              onClick={() => setConnectionStatus('connected')}
              className={`p-2.5 rounded border text-left ${
                connectionStatus === 'connected'
                  ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Online Connected
            </button>
            <button
              onClick={() => setConnectionStatus('checking')}
              className={`p-2.5 rounded border text-left ${
                connectionStatus === 'checking'
                  ? 'bg-slate-800 border-slate-500 text-slate-200 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Snapshot 1: Checking…
            </button>
            <button
              onClick={() => setConnectionStatus('failed')}
              className={`p-2.5 rounded border text-left ${
                connectionStatus === 'failed'
                  ? 'bg-rose-950/70 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Snapshot 2: DB Failed
            </button>
          </div>
        </div>

        {/* 2. Today Metrics View */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono font-bold uppercase text-indigo-400">
            2. Today Metrics Section (Sheet C 3, 4, 5)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <button
              onClick={() => setTodayState('normal')}
              className={`p-2.5 rounded border text-left ${
                todayState === 'normal'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Normal (4 Tiles)
            </button>
            <button
              onClick={() => setTodayState('loading')}
              className={`p-2.5 rounded border text-left ${
                todayState === 'loading'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Snapshot 3: Loading
            </button>
            <button
              onClick={() => setTodayState('partial_degraded')}
              className={`p-2.5 rounded border text-left ${
                todayState === 'partial_degraded'
                  ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Snapshot 4: Degraded
            </button>
            <button
              onClick={() => setTodayState('error')}
              className={`p-2.5 rounded border text-left ${
                todayState === 'error'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Snapshot 5: Fatal Error
            </button>
          </div>
        </div>

        {/* 3. Calendar State */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono font-bold uppercase text-indigo-400">
            3. Upcoming Events (Sheet C Snapshot 6)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <button
              onClick={() => setCalendarState('events')}
              className={`p-2 rounded border text-center ${
                calendarState === 'events'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setCalendarState('loading')}
              className={`p-2 rounded border text-center ${
                calendarState === 'loading'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              6(a) Loading
            </button>
            <button
              onClick={() => setCalendarState('empty')}
              className={`p-2 rounded border text-center ${
                calendarState === 'empty'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              6(b) Empty
            </button>
            <button
              onClick={() => setCalendarState('unavailable')}
              className={`p-2 rounded border text-center ${
                calendarState === 'unavailable'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              6(c) Unavail
            </button>
            <button
              onClick={() => setCalendarState('failed')}
              className={`p-2 rounded border text-center ${
                calendarState === 'failed'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              6(d) Failed
            </button>
          </div>
        </div>

        {/* 4. Budget & AI Scoring */}
        <div className="space-y-2.5">
          <label className="text-xs font-mono font-bold uppercase text-indigo-400">
            4. AI Scoring Budget State (Sheet A 1–8)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <button
              onClick={() =>
                setBudget({
                  mode: 'normal',
                  monthlyBudget: 1.0,
                  currentSpend: 0.04,
                  remaining: 0.96,
                  callsThisMonth: 37,
                  isScoringPending: false,
                  activeBanner: 'none',
                })
              }
              className={`p-2.5 rounded border text-left ${
                budget.mode === 'normal' && budget.activeBanner === 'none'
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              1 Normal ($0.04)
            </button>
            <button
              onClick={() =>
                setBudget({
                  mode: 'near_limit',
                  monthlyBudget: 1.0,
                  currentSpend: 0.91,
                  remaining: 0.09,
                  callsThisMonth: 212,
                  isScoringPending: false,
                  activeBanner: 'none',
                })
              }
              className={`p-2.5 rounded border text-left ${
                budget.mode === 'near_limit'
                  ? 'bg-amber-950 border-amber-600 text-amber-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              2 Near Limit ($0.91)
            </button>
            <button
              onClick={() =>
                setBudget({
                  mode: 'exceeded',
                  monthlyBudget: 1.0,
                  currentSpend: 1.0,
                  remaining: 0.0,
                  callsThisMonth: 233,
                  isScoringPending: false,
                  activeBanner: 'none',
                })
              }
              className={`p-2.5 rounded border text-left ${
                budget.mode === 'exceeded'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              3 Exceeded (Locked)
            </button>
            <button
              onClick={() =>
                setBudget({
                  mode: 'unavailable',
                  monthlyBudget: 0,
                  currentSpend: 0,
                  remaining: 0,
                  callsThisMonth: 0,
                  isScoringPending: false,
                  activeBanner: 'none',
                })
              }
              className={`p-2.5 rounded border text-left ${
                budget.mode === 'unavailable'
                  ? 'bg-rose-950 border-rose-600 text-rose-300 font-bold'
                  : 'bg-[#111622] border-[#222c3d] text-slate-300'
              }`}
            >
              4 Unavailable (--)
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-1">
            <button
              onClick={() =>
                setBudget((prev) => ({
                  ...prev,
                  activeBanner: 'success',
                }))
              }
              className="p-2 rounded border bg-[#111622] hover:bg-[#161f30] border-[#222c3d] text-slate-300 text-center"
            >
              Banner: Success
            </button>
            <button
              onClick={() =>
                setBudget((prev) => ({
                  ...prev,
                  activeBanner: 'rate_limit',
                }))
              }
              className="p-2 rounded border bg-[#111622] hover:bg-[#161f30] border-[#222c3d] text-slate-300 text-center"
            >
              Banner: 429 Rate
            </button>
            <button
              onClick={() =>
                setBudget((prev) => ({
                  ...prev,
                  activeBanner: 'ledger_blocked',
                }))
              }
              className="p-2 rounded border bg-[#111622] hover:bg-[#161f30] border-[#222c3d] text-slate-300 text-center"
            >
              Banner: Ledger Block
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#1e283a] flex justify-end">
          <button onClick={onClose} className="btn-primary text-xs py-2 px-4">
            Apply and Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
