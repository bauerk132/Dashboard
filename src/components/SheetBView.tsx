import React, { useState } from 'react';

export const SheetBView: React.FC = () => {
  const [selectedSnapshot, setSelectedSnapshot] = useState<number | 'all'>('all');
  const [expandedRecoverable, setExpandedRecoverable] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Spec Sheet Header */}
      <div className="border-b border-[#1e2638] pb-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1">
          SHEET B — Jobs: queue and application states
        </div>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight font-editorial">
          Sovereign Operations Architecture
        </h2>
        <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-3">
          <span>Single-Operator Terminal Spec v2.4 GAS</span>
          <span>·</span>
          <span>Target: 1440×900 display canvas</span>
          <span>·</span>
          <span className="text-indigo-400">13 Discrete Verified States</span>
        </div>
      </div>

      {/* Quick Jump */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono bg-[#0d121c] p-2 rounded-lg border border-[#1e283a]">
        <span className="text-slate-500 text-[11px] px-2">Jump to:</span>
        <button
          onClick={() => setSelectedSnapshot('all')}
          className={`px-2 py-1 rounded ${
            selectedSnapshot === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-300'
          }`}
        >
          All 13 Snapshots
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedSnapshot(num)}
            className={`px-2 py-1 rounded ${
              selectedSnapshot === num ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-300'
            }`}
          >
            #{num}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {/* SNAPSHOT 1 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 1) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 1 · Queue Not Loaded (Initial Dormant State)
              </span>
              <span className="text-xs text-slate-400 font-mono">Dormant</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar hidden; "Refresh queue" button enabled; neutral feedback message.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Stored job queue</span>
                <button className="btn-secondary">Refresh queue</button>
              </div>
              <div className="msg-neutral">
                Open this view to load stored job records.
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 2 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 2) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 2 · Queue Loading (In-Flight Fetch)
              </span>
              <span className="text-xs text-indigo-400 font-mono animate-pulse">In-Flight</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar hidden; "Refresh queue" disabled at 55% opacity; neutral feedback message; no spinners.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Stored job queue</span>
                <button disabled className="btn-secondary btn-disabled">
                  Refresh queue
                </button>
              </div>
              <div className="msg-neutral">
                Loading stored job records…
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 3 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 3) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 3 · Queue Refreshing (Background Sync, Never Blank)
              </span>
              <span className="text-xs text-slate-400 font-mono">Syncing</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar visible; "Refreshing…" text next to disabled button; existing job card remains visible at 60% opacity.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#182030] pb-3">
                <span className="text-sm font-semibold text-slate-200">Stored job queue</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Refreshing…</span>
                  <button disabled className="btn-secondary btn-disabled">
                    Refresh queue
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200">
                    All active jobs
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>Sort by</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200">
                    Match score
                  </div>
                </div>
              </div>

              <div className="opacity-60 bg-[#111622] border border-[#1e2738] rounded p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Help Desk Technician</span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded uppercase font-mono">
                    New
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Northside Logistics · Chicago, IL (Hybrid) · $26.00 - $31.00 / hr
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 4 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 4) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 4 · Queue Error (Fatal Queue Failure)
              </span>
              <span className="text-xs text-rose-400 font-mono">Fatal</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar hidden; left 4px red bar error message; secondary "Retry" button below.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="text-sm font-semibold text-slate-200">Stored job queue</div>
              <div className="msg-error">
                The stored job queue is unavailable right now.
              </div>
              <div>
                <button className="btn-secondary">Retry</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 5 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 5) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 5 · Empty (No Stored Records)
              </span>
              <span className="text-xs text-slate-400 font-mono">Zero Records</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar visible; neutral message; zero job cards rendered.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#182030] pb-3">
                <span className="text-sm font-semibold text-slate-200">Stored job queue</span>
                <button className="btn-secondary">Refresh queue</button>
              </div>

              <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200">
                    All active jobs
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>Sort by</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200">
                    Match score
                  </div>
                </div>
              </div>

              <div className="msg-neutral">
                No active stored jobs are ready to review.
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 6 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 6) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 6 · Filtered Empty (Filter Mismatch)
              </span>
              <span className="text-xs text-amber-400 font-mono">Mismatch</span>
            </div>
            <p className="text-xs text-slate-400">
              Toolbar visible with Show="New today"; neutral message; closed disclosure row below ("Rejected jobs (2) — recoverable").
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#182030] pb-3">
                <span className="text-sm font-semibold text-slate-200">Stored job queue</span>
                <button className="btn-secondary">Refresh queue</button>
              </div>

              <div className="flex items-center justify-between text-xs py-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200 font-semibold">
                    New today
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>Sort by</span>
                  <div className="px-2 py-1 bg-[#161f30] border border-[#27354a] rounded text-slate-200">
                    Match score
                  </div>
                </div>
              </div>

              <div className="msg-neutral">
                No active stored jobs match this filter.
              </div>

              <div
                onClick={() => setExpandedRecoverable(!expandedRecoverable)}
                className="border border-[#1f283a] bg-[#0e131e] rounded px-3 py-2 flex items-center justify-between text-xs text-slate-300 cursor-pointer"
              >
                <span>Rejected jobs (2) — recoverable</span>
                <span className="font-mono text-slate-500">
                  {expandedRecoverable ? '[ ▴ ]' : '[ ▾ ]'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 7 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 7) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 7 · Malformed Rows Expanded (Data Integrity Guard)
              </span>
              <span className="text-xs text-amber-400 font-mono">Integrity Notice</span>
            </div>
            <p className="text-xs text-slate-400">
              Open WARNING row: 4px left amber bar; diagnostic row reference ("Sheet row 14: missing title.").
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5">
              <div className="msg-warn">
                <div className="flex items-center justify-between font-bold text-sm text-amber-400">
                  <span>1 malformed stored record(s) skipped</span>
                  <span className="font-mono text-xs">[ ▴ ]</span>
                </div>
                <div className="mt-2 text-xs text-amber-300/90 pl-2">
                  • Sheet row 14: missing title.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 8 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 8) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 8 · Job Card Pending (Card-Scoped Action Lock)
              </span>
              <span className="text-xs text-indigo-400 font-mono">Card Lock</span>
            </div>
            <p className="text-xs text-slate-400">
              Top card ("IT Support Specialist") action and note buttons disabled at 55% opacity. Bottom card ("Operations Coordinator") completely unaffected.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              {/* Locked top card */}
              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">IT Support Specialist</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 uppercase font-mono">
                    Saved
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Riverbend Community Clinic · Lakeside, ST · Hybrid · $45,000–52,000
                </div>
                <div className="flex items-center gap-2">
                  <button disabled className="btn-secondary text-xs btn-disabled">
                    Ready to apply
                  </button>
                  <button disabled className="btn-danger text-xs btn-disabled">
                    Reject
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    disabled
                    type="text"
                    value=""
                    placeholder="Add note..."
                    className="bg-[#090d14] border border-[#1e2738] rounded px-3 py-1.5 text-xs text-slate-400 flex-1 input-disabled"
                  />
                  <button disabled className="btn-secondary text-xs btn-disabled">
                    Save note
                  </button>
                </div>
              </div>

              {/* Unaffected bottom card */}
              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Operations Coordinator</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#182030] text-slate-300 uppercase font-mono">
                    Reviewed
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Maple &amp; Finch Supply · Anytown, ST · Not remote
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-xs">Save</button>
                  <button className="btn-danger text-xs">Reject</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 9 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 9) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 9 · Application Conflict (Optimistic Lock State)
              </span>
              <span className="text-xs text-rose-400 font-mono">Version Conflict</span>
            </div>
            <p className="text-xs text-slate-400">
              Form pre-save conflict; error message placed directly above "Save details"; "Save details" and "Purge record from sheet" remain enabled.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 text-sm">
                    Help Desk Technician · Application Record
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-sky-950 text-sky-300 border border-sky-800">
                    Applied
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 text-[11px]">Contact name</span>
                      <div className="p-1.5 bg-[#090d14] border border-[#1e2738] rounded text-slate-200">
                        Jordan Lee
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Contact email</span>
                      <div className="p-1.5 bg-[#090d14] border border-[#1e2738] rounded text-slate-200">
                        recruiting@northside.example
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Follow-up date</span>
                    <div className="p-1.5 bg-[#090d14] border border-[#1e2738] rounded text-slate-200">
                      Sep 20, 2026
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Notes</span>
                    <div className="p-1.5 bg-[#090d14] border border-[#1e2738] rounded text-slate-200">
                      Applied through the company careers page.
                    </div>
                  </div>

                  <div className="msg-error">
                    This application changed before the request completed. Refresh and try again.
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button className="btn-primary text-xs">Save details</button>
                    <button className="btn-danger text-xs">Purge record from sheet</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 10 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 10) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 10 · Duplicate Application (Duplicate Guard Violation)
              </span>
              <span className="text-xs text-rose-400 font-mono">Duplicate Block</span>
            </div>
            <p className="text-xs text-slate-400">
              Create form open; notice box; error message directly above "Save application record"; button enabled.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                <div className="text-xs text-slate-400 bg-[#090d14] p-2.5 rounded border border-[#1e2738]">
                  Marking Applied records an application you submitted outside this dashboard. This dashboard never submits applications to employers.
                </div>

                <div className="msg-error">
                  An active application already exists for this job.
                </div>

                <button className="btn-primary w-full text-xs">
                  Save application record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 11 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 11) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 11 · Final-Status Application (Terminal Status Locked)
              </span>
              <span className="text-xs text-slate-400 font-mono">Terminal Status</span>
            </div>
            <p className="text-xs text-slate-400">
              Status Withdrawn; button row holds only secondary "Edit details"; closed disclosure below ("View application history [ ▾ ]").
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 text-sm">Application Record</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">
                    Withdrawn
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div>Status: Withdrawn</div>
                  <div>Applied: Sep 13, 2026</div>
                  <div>Contact: Jordan Lee (recruiting@northside.example)</div>
                </div>

                <div>
                  <button className="btn-secondary text-xs">Edit details</button>
                </div>

                <div className="border-t border-[#182030] pt-2 text-xs text-slate-400 flex items-center justify-between">
                  <span>View application history</span>
                  <span className="font-mono">[ ▾ ]</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 12 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 12) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 12 · Application History (Two Sub-Snapshots)
              </span>
              <span className="text-xs text-indigo-400 font-mono">Audit Trail</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 12a */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  12(a) Empty History:
                </div>
                <div className="msg-neutral text-xs">
                  No recorded application activity yet.
                </div>
              </div>

              {/* 12b */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  12(b) Partial History + Malformed Records:
                </div>
                <div className="bg-[#111622] border border-[#1e2738] rounded p-3 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between border-b border-[#182030] pb-1 text-[11px]">
                    <span className="text-slate-200">create_application: → Applied</span>
                    <span className="text-slate-500">Sep 13, 2026, 9:40 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">update_application</span>
                    <span className="text-slate-500">Sep 13, 2026, 9:52 AM</span>
                  </div>
                </div>

                <div className="msg-error text-xs">
                  2 malformed history record(s) were skipped.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 13 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 13) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 13 · Job Action Error (Execution Rollback)
              </span>
              <span className="text-xs text-rose-400 font-mono">Action Rollback</span>
            </div>
            <p className="text-xs text-slate-400">
              Error placed above list; underlying cards stay normal & enabled.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="msg-error">
                That job action could not be completed.
              </div>

              <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-2">
                <div className="font-semibold text-slate-200">Help Desk Technician</div>
                <div className="text-xs text-slate-400 font-mono">
                  Northside Logistics · Chicago, IL (Hybrid) · $26.00 - $31.00 / hr
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button className="btn-secondary text-xs">Mark reviewed</button>
                  <button className="btn-secondary text-xs">Save</button>
                  <button className="btn-danger text-xs">Reject</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
