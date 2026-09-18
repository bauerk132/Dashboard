import React, { useState } from 'react';
import { JobItem, JobStatus, AIScoringState } from '../types';
import {
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  AlertCircle,
  FileText,
  UserCheck,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface JobsViewProps {
  jobs: JobItem[];
  setJobs: React.Dispatch<React.SetStateAction<JobItem[]>>;
  onScoreJob?: (jobId: string) => void;
}

export type QueueSimMode =
  | 'normal'
  | '1_not_loaded'
  | '2_loading'
  | '3_refreshing'
  | '4_error'
  | '5_empty'
  | '6_filtered_empty'
  | '7_malformed_expanded'
  | '8_card_pending'
  | '9_application_conflict'
  | '10_duplicate_app'
  | '11_terminal_status'
  | '12a_history_empty'
  | '12b_history_malformed'
  | '13_action_error';

export const JobsView: React.FC<JobsViewProps> = ({ jobs, setJobs, onScoreJob }) => {
  const [simMode, setSimMode] = useState<QueueSimMode>('normal');
  const [filter, setFilter] = useState<string>('all_active');
  const [sortBy, setSortBy] = useState<string>('match_score');
  const [actionError, setActionError] = useState<string | null>(null);

  // Per-job expanded panels state
  const [expandedAiPanels, setExpandedAiPanels] = useState<Record<string, boolean>>({});
  const [expandedAppPanels, setExpandedAppPanels] = useState<Record<string, boolean>>({
    'job-1': true, // default open for Help Desk Technician demonstration
  });
  const [expandedHistoryPanels, setExpandedHistoryPanels] = useState<Record<string, boolean>>({});
  const [expandedRecoverable, setExpandedRecoverable] = useState<boolean>(false);
  const [expandedMalformed, setExpandedMalformed] = useState<boolean>(true);

  // Form states for application conflict simulation
  const [conflictTriggered, setConflictTriggered] = useState<boolean>(false);
  const [duplicateTriggered, setDuplicateTriggered] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<Record<string, string>>({});

  const toggleAiPanel = (id: string) => {
    setExpandedAiPanels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAppPanel = (id: string) => {
    setExpandedAppPanels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHistoryPanel = (id: string) => {
    setExpandedHistoryPanels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Job card status transition
  const handleUpdateStatus = (id: string, newStatus: JobStatus) => {
    // Put card in pending state (Snapshot 8 simulation)
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isPending: true } : j))
    );

    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id ? { ...j, status: newStatus, isPending: false } : j
        )
      );
    }, 700);
  };

  // Save note on job card
  const handleSaveNote = (id: string) => {
    const text = newNoteText[id] || '';
    if (!text.trim()) return;

    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isPending: true } : j))
    );

    setTimeout(() => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id ? { ...j, notes: text, isPending: false } : j
        )
      );
      setNewNoteText((prev) => ({ ...prev, [id]: '' }));
    }, 600);
  };

  // Filter jobs
  const activeJobs = jobs.filter((j) => {
    if (simMode === '5_empty') return false;
    if (simMode === '6_filtered_empty') return false;

    if (filter === 'all_active') return j.status !== 'rejected';
    if (filter === 'new_today') return j.status === 'new';
    if (filter === 'reviewed') return j.status === 'reviewed';
    if (filter === 'saved') return j.status === 'saved';
    if (filter === 'applied') return j.status === 'applied';
    if (filter === 'rejected') return j.status === 'rejected';
    return true;
  });

  const rejectedJobs = jobs.filter((j) => j.status === 'rejected');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header with spec metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2638] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Pipeline Subsystem
            </span>
            <span className="text-slate-500 font-mono text-xs">· Sheet B Specification Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Stored Job Queue & Applications</h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimistic lock detection, duplicate guard validation, audit timeline, and queue states.
          </p>
        </div>

        {/* State Simulation Bar for Sheet B */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0e131d] p-1.5 rounded-lg border border-[#1e283a] text-xs font-mono">
          <span className="text-slate-500 text-[11px] px-1.5">State:</span>
          <button
            onClick={() => {
              setSimMode('normal');
              setActionError(null);
              setConflictTriggered(false);
              setDuplicateTriggered(false);
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === 'normal'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setSimMode('1_not_loaded')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '1_not_loaded'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 1: Queue Not Loaded"
          >
            1 Dormant
          </button>
          <button
            onClick={() => setSimMode('2_loading')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '2_loading'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 2: Queue Loading"
          >
            2 Loading
          </button>
          <button
            onClick={() => setSimMode('3_refreshing')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '3_refreshing'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 3: Queue Refreshing (Never Blank)"
          >
            3 Refreshing
          </button>
          <button
            onClick={() => setSimMode('4_error')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '4_error'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 4: Queue Fatal Error"
          >
            4 Error
          </button>
          <button
            onClick={() => setSimMode('6_filtered_empty')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '6_filtered_empty'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 6: Filtered Empty (New today)"
          >
            6 Filter Mismatch
          </button>
          <button
            onClick={() => setSimMode('8_card_pending')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '8_card_pending'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 8: Job Card Pending (Top card locked 55%)"
          >
            8 Card Lock
          </button>
          <button
            onClick={() => {
              setSimMode('9_application_conflict');
              setConflictTriggered(true);
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '9_application_conflict'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 9: Application Conflict"
          >
            9 Conflict
          </button>
          <button
            onClick={() => {
              setSimMode('10_duplicate_app');
              setDuplicateTriggered(true);
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '10_duplicate_app'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 10: Duplicate Application"
          >
            10 Duplicate
          </button>
          <button
            onClick={() => setSimMode('11_terminal_status')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '11_terminal_status'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 11: Final Status Withdrawn"
          >
            11 Terminal
          </button>
          <button
            onClick={() => {
              setSimMode('13_action_error');
              setActionError('That job action could not be completed.');
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '13_action_error'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 13: Job Action Error"
          >
            13 Action Err
          </button>
        </div>
      </div>

      {/* STORED JOB QUEUE CARD CONTAINER */}
      <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm space-y-4">
        {/* Card Header Frame */}
        <div className="flex items-center justify-between pb-3 border-b border-[#182030]">
          <div>
            <h3 className="text-base font-semibold text-slate-100">Stored job queue</h3>
            <span className="text-[11px] text-slate-500 font-mono">
              {simMode === '1_not_loaded' && 'Snapshot 1 · Initial Dormant State'}
              {simMode === '2_loading' && 'Snapshot 2 · In-Flight Fetch'}
              {simMode === '3_refreshing' && 'Snapshot 3 · Background Sync (Never Blank)'}
              {simMode === '4_error' && 'Snapshot 4 · Fatal Queue Failure'}
              {simMode === '6_filtered_empty' && 'Snapshot 6 · Filter Mismatch'}
              {simMode === 'normal' && 'Active Single-Operator Queue'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {simMode === '3_refreshing' && (
              <span className="text-xs text-slate-400 font-mono animate-pulse">
                Refreshing…
              </span>
            )}
            <button
              onClick={() => {
                if (simMode === '1_not_loaded') setSimMode('normal');
                else if (simMode === '4_error') setSimMode('normal');
                else {
                  setSimMode('3_refreshing');
                  setTimeout(() => setSimMode('normal'), 1200);
                }
              }}
              disabled={simMode === '2_loading' || simMode === '3_refreshing'}
              className={`btn-secondary ${
                simMode === '2_loading' || simMode === '3_refreshing' ? 'btn-disabled' : ''
              }`}
            >
              Refresh queue
            </button>
          </div>
        </div>

        {/* SNAPSHOT 1: Queue Not Loaded (Toolbar hidden) */}
        {simMode === '1_not_loaded' && (
          <div className="pt-3 space-y-3">
            <div className="msg-neutral">
              Open this view to load stored job records.
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Toolbar hidden · Minimal lazy-load footprint
            </p>
          </div>
        )}

        {/* SNAPSHOT 2: Queue Loading (Toolbar hidden, no spinners) */}
        {simMode === '2_loading' && (
          <div className="pt-3 space-y-3">
            <div className="msg-neutral">
              Loading stored job records…
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Toolbar hidden · "Refresh queue" disabled at 55% · No spinners
            </p>
          </div>
        )}

        {/* SNAPSHOT 4: Queue Fatal Error (Toolbar hidden, left 4px red bar) */}
        {simMode === '4_error' && (
          <div className="pt-3 space-y-4">
            <div className="msg-error">
              The stored job queue is unavailable right now.
            </div>
            <div>
              <button
                onClick={() => setSimMode('normal')}
                className="btn-secondary"
              >
                Retry
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Toolbar hidden · Left 4px red bar · Secondary "Retry" below
            </p>
          </div>
        )}

        {/* TOOLBAR & LISTING (Visible for normal, refreshing, empty, filtered, malformed, card states) */}
        {simMode !== '1_not_loaded' && simMode !== '2_loading' && simMode !== '4_error' && (
          <>
            {/* Filter & Sort Toolbar */}
            <div className="py-2.5 flex flex-wrap items-center justify-between text-xs border-b border-[#182030] gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">Show</span>
                <select
                  value={simMode === '6_filtered_empty' ? 'new_today' : filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    if (simMode === '6_filtered_empty') setSimMode('normal');
                  }}
                  className="px-2.5 py-1 rounded bg-[#0e131d] border border-[#27354a] text-slate-200 font-medium text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="all_active">All active jobs</option>
                  <option value="new_today">New today</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="rejected">Rejected (recoverable)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono text-[11px]">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1 rounded bg-[#0e131d] border border-[#27354a] text-slate-200 font-medium text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="match_score">Match score</option>
                  <option value="company">Company name</option>
                  <option value="salary">Compensation</option>
                </select>
              </div>
            </div>

            {/* SNAPSHOT 13: Job Action Error above list */}
            {(actionError || simMode === '13_action_error') && (
              <div className="space-y-2 pt-2">
                <div className="msg-error flex items-center justify-between">
                  <span>That job action could not be completed.</span>
                  <button
                    onClick={() => {
                      setActionError(null);
                      if (simMode === '13_action_error') setSimMode('normal');
                    }}
                    className="text-xs underline text-rose-300 hover:text-rose-100"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Error placed above list · Underlying cards stay normal & enabled
                </p>
              </div>
            )}

            {/* SNAPSHOT 5: Completely Empty */}
            {simMode === '5_empty' && (
              <div className="pt-4 space-y-3">
                <div className="msg-neutral">
                  No active stored jobs are ready to review.
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Toolbar visible · Clean empty feedback message
                </p>
              </div>
            )}

            {/* SNAPSHOT 6: Filtered Empty with Recoverable Disclosure Row */}
            {simMode === '6_filtered_empty' && (
              <div className="pt-4 space-y-4">
                <div className="msg-neutral">
                  No active stored jobs match this filter.
                </div>
                {/* Closed disclosure row still shows */}
                <div
                  onClick={() => setExpandedRecoverable(!expandedRecoverable)}
                  className="border border-[#1f283a] bg-[#0e131e] hover:bg-[#131b29] rounded px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-300 cursor-pointer transition-colors"
                >
                  <span>Rejected jobs ({rejectedJobs.length}) — recoverable</span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {expandedRecoverable ? '[ ▴ ]' : '[ ▾ ]'}
                  </span>
                </div>

                {expandedRecoverable && (
                  <div className="space-y-2 pl-2">
                    {rejectedJobs.map((rj) => (
                      <div
                        key={rj.id}
                        className="bg-[#0b0e14] border border-[#1e2638] rounded p-3 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-slate-300">{rj.title}</div>
                          <div className="text-slate-500 text-[11px]">{rj.company} · {rj.salary}</div>
                        </div>
                        <button
                          onClick={() => handleUpdateStatus(rj.id, 'new')}
                          className="btn-secondary text-[11px] py-1 px-2.5"
                        >
                          Recover to New
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-slate-500 font-mono">
                  Show="New today" · Recoverable disclosure row preserved
                </p>
              </div>
            )}

            {/* ACTIVE JOB CARDS LISTING */}
            {simMode !== '5_empty' && simMode !== '6_filtered_empty' && (
              <div
                className={`space-y-4 pt-2 transition-opacity ${
                  simMode === '3_refreshing' ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {activeJobs.map((job, index) => {
                  const isPendingCard =
                    job.isPending || (simMode === '8_card_pending' && index === 0);
                  const isAppPanelOpen = expandedAppPanels[job.id];
                  const isAiPanelOpen = expandedAiPanels[job.id];
                  const isHistoryOpen = expandedHistoryPanels[job.id];

                  return (
                    <div
                      key={job.id}
                      className={`bg-[#111622] border rounded-lg p-4 sm:p-5 space-y-3.5 transition-all ${
                        isPendingCard
                          ? 'border-indigo-500/50 shadow-sm'
                          : 'border-[#1e2738]'
                      }`}
                    >
                      {/* Job Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="font-semibold text-slate-100 text-sm sm:text-base">
                            {job.title}
                          </h4>
                          {/* Status badge */}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                              job.status === 'new'
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                : job.status === 'saved'
                                ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                : job.status === 'reviewed'
                                ? 'bg-[#182030] text-slate-300 border border-[#28354c]'
                                : job.status === 'applied'
                                ? 'bg-sky-950 text-sky-300 border border-sky-800'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {job.status}
                          </span>

                          {job.matchScore > 0 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/70 text-emerald-300 border border-emerald-800">
                              {job.matchScore}% match
                            </span>
                          )}
                        </div>

                        {job.sourceUrl && (
                          <a
                            href={job.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-mono inline-flex items-center gap-1"
                          >
                            <span>Open source listing</span>
                            <span className="font-mono">[ ↗ ]</span>
                          </a>
                        )}
                      </div>

                      {/* Job Meta line */}
                      <div className="text-slate-400 text-xs font-mono">
                        {job.company} · {job.location} · {job.workStyle} · {job.salary}
                      </div>

                      {/* ACTION ROW (Snapshot 8: Card-scoped action lock) */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {job.status === 'new' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'reviewed')}
                              disabled={isPendingCard}
                              className={`btn-secondary text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Mark reviewed
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'saved')}
                              disabled={isPendingCard}
                              className={`btn-secondary text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'rejected')}
                              disabled={isPendingCard}
                              className={`btn-danger text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {job.status === 'saved' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'applied')}
                              disabled={isPendingCard}
                              className={`btn-secondary text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Ready to apply
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'rejected')}
                              disabled={isPendingCard}
                              className={`btn-danger text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {job.status === 'reviewed' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'saved')}
                              disabled={isPendingCard}
                              className={`btn-secondary text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(job.id, 'rejected')}
                              disabled={isPendingCard}
                              className={`btn-danger text-xs py-1.5 px-3.5 ${
                                isPendingCard ? 'btn-disabled' : ''
                              }`}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {job.status === 'applied' && (
                          <div className="text-xs text-sky-400 font-mono">
                            Application ledger active
                          </div>
                        )}
                      </div>

                      {/* NOTE FORM (Snapshot 8: Disabled button when pending) */}
                      <div className="pt-2 border-t border-[#182030] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                          type="text"
                          placeholder={job.notes || 'Add note text here...'}
                          value={newNoteText[job.id] || ''}
                          disabled={isPendingCard}
                          onChange={(e) =>
                            setNewNoteText({ ...newNoteText, [job.id]: e.target.value })
                          }
                          className="bg-[#0b0f19] border border-[#27354a] rounded px-3 py-1.5 text-xs text-slate-200 flex-1 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() => handleSaveNote(job.id)}
                          disabled={isPendingCard || !newNoteText[job.id]?.trim()}
                          className={`btn-secondary text-xs shrink-0 ${
                            isPendingCard ? 'btn-disabled' : ''
                          }`}
                        >
                          Save note
                        </button>
                      </div>

                      {/* DISCLOSURE PANELS */}
                      <div className="pt-2 space-y-2 text-xs font-mono">
                        {/* 1. AI Match & Scoring Disclosure Panel (Sheet A Integration) */}
                        <div className="border-t border-[#182030] pt-2">
                          <button
                            onClick={() => toggleAiPanel(job.id)}
                            className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 py-1"
                          >
                            <span className="font-semibold">AI Match &amp; Scoring</span>
                            <span>{isAiPanelOpen ? '[ ▴ ]' : '[ ▾ ]'}</span>
                          </button>

                          {isAiPanelOpen && (
                            <div className="mt-2 bg-[#090d14] border border-[#1e2738] rounded p-3 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs">Evaluation state:</span>
                                {job.aiState === 'unscored' && (
                                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                                    Unscored
                                  </span>
                                )}
                                {job.aiState === 'stale' && (
                                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[11px]">
                                    Stale · {job.matchScore}% match
                                  </span>
                                )}
                                {job.aiState === 'quarantined' && (
                                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[11px]">
                                    Quarantined
                                  </span>
                                )}
                                {job.aiState === 'scored' && (
                                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px]">
                                    Verified · {job.matchScore}% match
                                  </span>
                                )}
                              </div>

                              {job.aiState === 'unscored' && (
                                <p className="text-slate-400 text-[11px]">
                                  This job has not been evaluated with AI scoring yet.
                                </p>
                              )}

                              {job.aiState === 'stale' && (
                                <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded text-amber-300 text-[11px]">
                                  {job.staleReason ||
                                    'Stale score — target profile, prompt, or model has changed since this job was evaluated. Needs rescoring.'}
                                </div>
                              )}

                              {job.aiState === 'quarantined' && (
                                <p className="text-rose-300 text-[11px]">
                                  {job.quarantineReason ||
                                    'AI score was quarantined due to validation rules. Record needs rescoring.'}
                                </p>
                              )}

                              {job.aiState === 'scored' && (
                                <div className="text-slate-300 text-[11px] space-y-1">
                                  <div>
                                    <strong className="text-slate-200">Strengths:</strong> Systems administration, incident response, network triage.
                                  </div>
                                  <div>
                                    <strong className="text-slate-200">Growth areas:</strong> Cloud native deployment pipelines.
                                  </div>
                                </div>
                              )}

                              <div className="pt-2 border-t border-[#182030] flex items-center justify-between">
                                <span className="text-[10px] text-slate-500">Gemini 2.5 Flash Verified</span>
                                <button
                                  onClick={() => {
                                    if (onScoreJob) onScoreJob(job.id);
                                    else {
                                      setJobs((prev) =>
                                        prev.map((j) =>
                                          j.id === job.id
                                            ? { ...j, aiState: 'scored', matchScore: 92 }
                                            : j
                                        )
                                      );
                                    }
                                  }}
                                  className="btn-secondary text-[11px] py-1 px-2.5"
                                >
                                  Rescore job
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 2. Application Tracking Disclosure Panel (Snapshots 9, 10, 11, 12) */}
                        <div className="border-t border-[#182030] pt-2">
                          <button
                            onClick={() => toggleAppPanel(job.id)}
                            className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 py-1"
                          >
                            <span className="font-semibold">Application tracking</span>
                            <span>{isAppPanelOpen ? '[ ▴ ]' : '[ ▾ ]'}</span>
                          </button>

                          {isAppPanelOpen && (
                            <div className="mt-2 space-y-4">
                              {/* SNAPSHOT 11: Final-Status Application (Withdrawn) */}
                              {(job.applicationRecord?.status === 'withdrawn' ||
                                simMode === '11_terminal_status') && (
                                <div className="bg-[#0b0f19] border border-[#27354a] rounded-lg p-4 space-y-3">
                                  <div className="flex items-center justify-between border-b border-[#182030] pb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-slate-200 text-xs">
                                        Application Record
                                      </span>
                                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                                        Withdrawn
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-1 text-xs text-slate-300">
                                    <div>
                                      <strong className="text-slate-200">Status:</strong> Withdrawn
                                    </div>
                                    <div>
                                      <strong className="text-slate-200">Applied:</strong> Sep 13, 2026
                                    </div>
                                    <div>
                                      <strong className="text-slate-200">Contact:</strong> Jordan Lee (recruiting@northside.example)
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-[#182030]">
                                    <button className="btn-secondary text-xs py-1.5 px-3">
                                      Edit details
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* SNAPSHOT 9: Application Conflict & Active Record */}
                              {job.applicationRecord &&
                                job.applicationRecord.status !== 'withdrawn' &&
                                simMode !== '11_terminal_status' &&
                                simMode !== '10_duplicate_app' && (
                                  <div className="bg-[#0b0f19] border border-[#27354a] rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between border-b border-[#182030] pb-2">
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold text-slate-200 text-xs">
                                          Application Record
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-sky-900/60 text-sky-300 border border-sky-700">
                                          Applied
                                        </span>
                                      </div>
                                      <button className="btn-secondary text-xs py-1 px-3">
                                        Cancel edit
                                      </button>
                                    </div>

                                    {/* Edit form */}
                                    <div className="space-y-2.5 text-xs">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        <div>
                                          <label className="block text-[11px] text-slate-400 mb-1">
                                            Contact name
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={job.applicationRecord.contactName}
                                            className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200 text-xs"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[11px] text-slate-400 mb-1">
                                            Contact email
                                          </label>
                                          <input
                                            type="text"
                                            defaultValue={job.applicationRecord.contactEmail}
                                            className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200 text-xs"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          Follow-up date
                                        </label>
                                        <input
                                          type="text"
                                          defaultValue={job.applicationRecord.followUpDate}
                                          className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200 text-xs"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          Notes
                                        </label>
                                        <textarea
                                          defaultValue={job.applicationRecord.notes}
                                          className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200 text-xs h-14 resize-none"
                                        />
                                      </div>

                                      {/* Snapshot 9: Conflict Error Banner directly above Save details */}
                                      {(conflictTriggered || simMode === '9_application_conflict') && (
                                        <div className="msg-error mt-2">
                                          This application changed before the request completed. Refresh and try again.
                                        </div>
                                      )}

                                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#182030]">
                                        <button
                                          onClick={() => {
                                            setConflictTriggered(false);
                                            if (simMode === '9_application_conflict')
                                              setSimMode('normal');
                                          }}
                                          className="btn-primary text-xs"
                                        >
                                          Save details
                                        </button>
                                        <button
                                          onClick={() => {
                                            setJobs((prev) =>
                                              prev.map((j) =>
                                                j.id === job.id
                                                  ? { ...j, applicationRecord: undefined }
                                                  : j
                                              )
                                            );
                                          }}
                                          className="btn-danger text-xs py-1.5"
                                        >
                                          Purge record from sheet
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              {/* SNAPSHOT 10: Duplicate Application Recording Modal/Form */}
                              {(!job.applicationRecord || simMode === '10_duplicate_app') && (
                                <div className="bg-[#0b0f19] border border-[#27354a] rounded-lg p-4 space-y-3">
                                  <div className="flex items-center justify-between border-b border-[#182030] pb-2 text-xs">
                                    <span className="text-slate-400">
                                      No application recorded for this job yet.
                                    </span>
                                    <button className="btn-secondary text-xs py-1 px-2.5">
                                      Cancel recording
                                    </button>
                                  </div>

                                  <div className="bg-[#07090e] border border-[#1e2738] p-2.5 rounded text-[11px] text-slate-400">
                                    Marking Applied records an application you submitted outside this dashboard. This dashboard never submits applications to employers.
                                  </div>

                                  <div className="space-y-2.5 text-xs">
                                    <div>
                                      <label className="block text-[11px] text-slate-400 mb-1">
                                        Application status
                                      </label>
                                      <div className="bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200">
                                        Applied (recorded submission elsewhere)
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          Applied date
                                        </label>
                                        <input
                                          type="text"
                                          defaultValue="Sep 13, 2026"
                                          className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[11px] text-slate-400 mb-1">
                                          Contact name
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="e.g., Sarah Vance (Recruiter)"
                                          className="w-full bg-[#141a29] border border-[#27354a] rounded px-2.5 py-1.5 text-slate-200"
                                        />
                                      </div>
                                    </div>

                                    {/* Snapshot 10 Duplicate Error Banner directly above Save application record */}
                                    {(duplicateTriggered || simMode === '10_duplicate_app') && (
                                      <div className="msg-error mt-2">
                                        An active application already exists for this job.
                                      </div>
                                    )}

                                    <div className="pt-2">
                                      <button
                                        onClick={() => {
                                          setDuplicateTriggered(true);
                                        }}
                                        className="btn-primary w-full text-xs"
                                      >
                                        Save application record
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* SNAPSHOT 12: Application History Disclosure (12a & 12b) */}
                              <div className="border-t border-[#182030] pt-2">
                                <button
                                  onClick={() => toggleHistoryPanel(job.id)}
                                  className="w-full flex items-center justify-between text-slate-400 hover:text-slate-200 py-1 text-xs"
                                >
                                  <span>View application history</span>
                                  <span>{isHistoryOpen ? '[ ▴ ]' : '[ ▾ ]'}</span>
                                </button>

                                {isHistoryOpen && (
                                  <div className="mt-2 space-y-2.5">
                                    {job.applicationRecord?.history &&
                                    job.applicationRecord.history.length > 0 ? (
                                      <>
                                        <div className="space-y-1.5 text-xs font-mono bg-[#0b0f19] p-3 rounded border border-[#1e2738]">
                                          {job.applicationRecord.history.map((h) => (
                                            <div
                                              key={h.id}
                                              className="flex items-center justify-between border-b border-[#182030]/60 pb-1 text-[11px]"
                                            >
                                              <span className="text-slate-200 font-semibold">{h.action}</span>
                                              <span className="text-slate-500">{h.timestamp}</span>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Snapshot 12(b): 2 malformed history records skipped banner */}
                                        {(job.applicationRecord.malformedHistoryCount ||
                                          simMode === '12b_history_malformed') && (
                                          <div className="msg-error text-xs">
                                            2 malformed history record(s) were skipped.
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      /* Snapshot 12(a): Empty History */
                                      <div className="msg-neutral text-xs">
                                        No recorded application activity yet.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SNAPSHOT 7: Malformed Rows Warning Expanded (Data Integrity Guard) */}
            <div className="pt-4 border-t border-[#182030]">
              <div className="py-1 text-[11px] text-slate-500 font-mono">
                Bottom of queue list view:
              </div>
              <div className="msg-warn">
                <div
                  onClick={() => setExpandedMalformed(!expandedMalformed)}
                  className="flex items-center justify-between font-bold text-sm text-amber-400 cursor-pointer"
                >
                  <span>1 malformed stored record(s) skipped</span>
                  <span className="font-mono text-xs">
                    {expandedMalformed ? '[ ▴ ]' : '[ ▾ ]'}
                  </span>
                </div>
                {expandedMalformed && (
                  <div className="mt-2 text-xs text-amber-300/90 pl-2">
                    • Sheet row 14: missing title.
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-2">
                Open WARNING row · 4px left amber bar · Diagnostic row reference
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
