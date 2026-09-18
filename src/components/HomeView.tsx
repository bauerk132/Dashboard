import React from 'react';
import {
  SystemConnectionStatus,
  TodayViewState,
  CalendarViewState,
  TaskItem,
  JobItem,
  CalendarEvent,
} from '../types';
import { RefreshCw, ArrowRight, CheckCircle2, Clock, Calendar, AlertTriangle } from 'lucide-react';

interface HomeViewProps {
  connectionStatus: SystemConnectionStatus;
  setConnectionStatus: (s: SystemConnectionStatus) => void;
  todayState: TodayViewState;
  setTodayState: (s: TodayViewState) => void;
  calendarState: CalendarViewState;
  setCalendarState: (s: CalendarViewState) => void;
  tasks: TaskItem[];
  jobs: JobItem[];
  events: CalendarEvent[];
  navigateTo: (tab: 'tasks' | 'jobs' | 'budget') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  connectionStatus,
  setConnectionStatus,
  todayState,
  setTodayState,
  calendarState,
  setCalendarState,
  tasks,
  jobs,
  events,
  navigateTo,
}) => {
  const openTasksCount = tasks.filter((t) => !t.completed && !t.archived).length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const strongMatchJobsCount = jobs.filter((j) => j.matchScore >= 80).length;
  const applicationsSentCount = jobs.filter((j) => j.status === 'applied').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2638] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Operations Overview
            </span>
            <span className="text-slate-500 font-mono text-xs">· Node 01</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Home</h2>
          
          {/* Connection status pill (Snapshots 1 & 2) */}
          <div className="mt-2.5">
            {connectionStatus === 'checking' && (
              <div className="conn-pill conn-pill-checking">
                <span className="pill-dot"></span>
                <span>Checking connection…</span>
              </div>
            )}
            {connectionStatus === 'failed' && (
              <div className="conn-pill conn-pill-failed">
                <span className="pill-dot"></span>
                <span>The dashboard could not connect to its database.</span>
              </div>
            )}
            {connectionStatus === 'connected' && (
              <div className="conn-pill conn-pill-connected">
                <span className="pill-dot"></span>
                <span>System operational · Ledger database verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Home Quick State Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0e131d] p-2 rounded-lg border border-[#1e283a] text-xs font-mono">
          <span className="text-slate-500 text-[11px] px-1">Quick Toggle:</span>
          <button
            onClick={() =>
              setConnectionStatus(
                connectionStatus === 'connected'
                  ? 'checking'
                  : connectionStatus === 'checking'
                  ? 'failed'
                  : 'connected'
              )
            }
            className="px-2 py-1 rounded bg-[#161f30] hover:bg-[#1e2a40] text-slate-300 border border-[#27384f] transition-colors"
            title="Cycle through Connection states (Checking / Failed / Connected)"
          >
            Connection: <span className="text-indigo-300 font-semibold">{connectionStatus}</span>
          </button>
          <button
            onClick={() =>
              setTodayState(
                todayState === 'normal'
                  ? 'partial_degraded'
                  : todayState === 'partial_degraded'
                  ? 'loading'
                  : todayState === 'loading'
                  ? 'error'
                  : 'normal'
              )
            }
            className="px-2 py-1 rounded bg-[#161f30] hover:bg-[#1e2a40] text-slate-300 border border-[#27384f] transition-colors"
            title="Cycle Today overview states"
          >
            Today: <span className="text-amber-300 font-semibold">{todayState}</span>
          </button>
          <button
            onClick={() =>
              setCalendarState(
                calendarState === 'events'
                  ? 'loading'
                  : calendarState === 'loading'
                  ? 'empty'
                  : calendarState === 'empty'
                  ? 'unavailable'
                  : calendarState === 'unavailable'
                  ? 'failed'
                  : 'events'
              )
            }
            className="px-2 py-1 rounded bg-[#161f30] hover:bg-[#1e2a40] text-slate-300 border border-[#27384f] transition-colors"
            title="Cycle Calendar states"
          >
            Calendar: <span className="text-emerald-300 font-semibold">{calendarState}</span>
          </button>
        </div>
      </div>

      {/* TODAY CARD SECTION (Snapshots 3, 4, 5) */}
      <section className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm">
        {/* Loading State (Snapshot 3) */}
        {todayState === 'loading' && (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#182030]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Today (Snapshot 3: In-Flight)
              </span>
              <span className="text-xs text-indigo-400 font-mono animate-pulse">Fetching metrics…</span>
            </div>
            <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5">
              <div className="text-base font-bold text-slate-100 mb-3">Today</div>
              <div className="msg-neutral">
                Loading today’s overview…
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 font-mono">
              Spec note: No date line, no metrics tiles — pure neutral message container with 10px radius.
            </div>
          </div>
        )}

        {/* Error State (Snapshot 5) */}
        {todayState === 'error' && (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#182030]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Today (Snapshot 5: Fatal Load)
              </span>
              <span className="text-xs text-rose-400 font-mono">Service Outage</span>
            </div>
            <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5">
              <div className="text-base font-bold text-slate-100 mb-3">Today</div>
              <div className="msg-error">
                The dashboard could not load its data.
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setTodayState('normal')}
                  className="btn-secondary"
                >
                  <RefreshCw className="w-3 h-3 mr-1.5 inline" />
                  Retry
                </button>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 font-mono">
              Spec note: 4px red left-bar error message with secondary Retry action button directly below.
            </div>
          </div>
        )}

        {/* Partial Degradation State (Snapshot 4) */}
        {todayState === 'partial_degraded' && (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#182030]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Today (Snapshot 4: Partial Service Degradation)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800/50 font-mono">
                Job API Unreachable
              </span>
            </div>
            <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-slate-100">Today</span>
                <span className="text-xs text-slate-400 font-mono">Today: Sep 14, 2026</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-[#090d14] border border-[#1e2738] rounded-md p-4">
                  <div className="text-[11px] text-slate-400 uppercase font-medium">Open tasks</div>
                  <div className="text-2xl font-bold text-slate-100 font-mono mt-1">{openTasksCount}</div>
                </div>
                <div className="bg-[#090d14] border border-[#1e2738] rounded-md p-4">
                  <div className="text-[11px] text-slate-400 uppercase font-medium">Completed tasks</div>
                  <div className="text-2xl font-bold text-slate-100 font-mono mt-1">{completedTasksCount}</div>
                </div>
                <div className="bg-[#090d14] border border-[#1e2738] rounded-md p-4">
                  <div className="text-[11px] text-slate-400 uppercase font-medium">Strong-match jobs</div>
                  <div className="text-sm font-semibold text-slate-400 font-mono mt-2.5">
                    — (unavailable)
                  </div>
                </div>
                <div className="bg-[#090d14] border border-[#1e2738] rounded-md p-4">
                  <div className="text-[11px] text-slate-400 uppercase font-medium">Applications sent</div>
                  <div className="text-sm font-semibold text-slate-400 font-mono mt-2.5">
                    — (unavailable)
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 font-mono">
              Spec note: Date line shown. Four full tiles: unavailable values match tile styling and are never truncated.
            </div>
          </div>
        )}

        {/* Normal Operating State */}
        {todayState === 'normal' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100">Today</h3>
                <p className="text-xs text-slate-400">Core operational metrics and pipeline velocity</p>
              </div>
              <span className="text-xs text-indigo-400 font-mono bg-[#141b29] px-2.5 py-1 rounded border border-[#27384f]">
                Today: Sep 18, 2026
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                onClick={() => navigateTo('tasks')}
                className="bg-[#090d14] hover:bg-[#0c121d] border border-[#1e2738] hover:border-indigo-500/40 rounded-md p-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-medium">
                  <span>Open tasks</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-2xl font-bold text-slate-100 font-mono mt-1">{openTasksCount}</div>
                <div className="text-[11px] text-rose-400 mt-1">1 overdue requires attention</div>
              </div>

              <div
                onClick={() => navigateTo('tasks')}
                className="bg-[#090d14] hover:bg-[#0c121d] border border-[#1e2738] hover:border-indigo-500/40 rounded-md p-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-medium">
                  <span>Completed tasks</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-slate-100 font-mono mt-1">{completedTasksCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">Archived on ledger</div>
              </div>

              <div
                onClick={() => navigateTo('jobs')}
                className="bg-[#090d14] hover:bg-[#0c121d] border border-[#1e2738] hover:border-indigo-500/40 rounded-md p-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-medium">
                  <span>Strong-match jobs</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{strongMatchJobsCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">Score ≥ 80%</div>
              </div>

              <div
                onClick={() => navigateTo('jobs')}
                className="bg-[#090d14] hover:bg-[#0c121d] border border-[#1e2738] hover:border-indigo-500/40 rounded-md p-4 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase font-medium">
                  <span>Applications sent</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-2xl font-bold text-indigo-300 font-mono mt-1">{applicationsSentCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">Tracked on sheet ledger</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* UPCOMING EVENTS SECTION (Snapshot 6: Four Calendar States) */}
      <section className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#182030]">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Upcoming events</span>
            </h3>
            <p className="text-xs text-slate-400">Calendar schedule & time allocations</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setCalendarState('events')}
              className={`px-2 py-1 rounded ${
                calendarState === 'events' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setCalendarState('loading')}
              className={`px-2 py-1 rounded ${
                calendarState === 'loading' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              6(a) Loading
            </button>
            <button
              onClick={() => setCalendarState('empty')}
              className={`px-2 py-1 rounded ${
                calendarState === 'empty' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              6(b) Empty
            </button>
            <button
              onClick={() => setCalendarState('unavailable')}
              className={`px-2 py-1 rounded ${
                calendarState === 'unavailable' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              6(c) Unavail
            </button>
            <button
              onClick={() => setCalendarState('failed')}
              className={`px-2 py-1 rounded ${
                calendarState === 'failed' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              6(d) Fail
            </button>
          </div>
        </div>

        {/* 6a: Loading */}
        {calendarState === 'loading' && (
          <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5">
            <div className="msg-neutral">
              Loading upcoming events…
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-mono">
              Snapshot 6(a): In-flight synchronization
            </div>
          </div>
        )}

        {/* 6b: Empty */}
        {calendarState === 'empty' && (
          <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5">
            <div className="msg-neutral">
              No upcoming events in the next 7 days.
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-mono">
              Snapshot 6(b): Clean schedule queue
            </div>
          </div>
        )}

        {/* 6c: Unavailable */}
        {calendarState === 'unavailable' && (
          <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5 space-y-3">
            <div className="msg-error">
              Calendar is not available right now.
            </div>
            <div>
              <button
                onClick={() => setCalendarState('events')}
                className="btn-secondary text-xs"
              >
                Retry
              </button>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Snapshot 6(c): Calendar service transient refusal
            </div>
          </div>
        )}

        {/* 6d: Failed */}
        {calendarState === 'failed' && (
          <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5 space-y-3">
            <div className="msg-error">
              Could not reach the calendar service.
            </div>
            <div>
              <button
                onClick={() => setCalendarState('events')}
                className="btn-secondary text-xs"
              >
                Retry
              </button>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Snapshot 6(d): Calendar network route failure
            </div>
          </div>
        )}

        {/* Normal Calendar Event Listing */}
        {calendarState === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#111622] border border-[#222c3d] rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="text-indigo-400 font-semibold">{evt.date}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#182030] text-slate-300 border border-[#28354c]">
                      {evt.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 mb-1">{evt.title}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{evt.time}</span>
                  </div>
                </div>
                {evt.location && (
                  <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-[#1e2638]">
                    {evt.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* QUICK OPERATIONS DOCK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => navigateTo('tasks')}
          className="bg-[#0f131c] hover:bg-[#131926] border border-[#1e2638] rounded-xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-indigo-400 uppercase">Tasks Subsystem</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <p className="text-sm font-semibold text-slate-200">Manage tasks, priorities, and deadlines</p>
          <p className="text-xs text-slate-500 mt-1">Includes row-scoped mutation locks and validation specs</p>
        </div>

        <div
          onClick={() => navigateTo('jobs')}
          className="bg-[#0f131c] hover:bg-[#131926] border border-[#1e2638] rounded-xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase">Jobs & Pipeline</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-sm font-semibold text-slate-200">Stored job queue & application tracking</p>
          <p className="text-xs text-slate-500 mt-1">Review matches, resolve conflict states, track history</p>
        </div>

        <div
          onClick={() => navigateTo('budget')}
          className="bg-[#0f131c] hover:bg-[#131926] border border-[#1e2638] rounded-xl p-5 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-amber-400 uppercase">AI Scoring Engine</span>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>
          <p className="text-sm font-semibold text-slate-200">Budget constraints & Gemini evaluation</p>
          <p className="text-xs text-slate-500 mt-1">Monthly cap ($1.00), rate limiting, and quarantine checks</p>
        </div>
      </div>
    </div>
  );
};
