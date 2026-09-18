import React, { useState } from 'react';

export const SheetCView: React.FC = () => {
  const [selectedSnapshot, setSelectedSnapshot] = useState<number | 'all'>('all');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Spec Sheet Header */}
      <div className="border-b border-[#1e2638] pb-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1">
          SHEET C — Home and Tasks states
        </div>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight font-editorial">
          Sovereign Operations Architecture
        </h2>
        <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-3">
          <span>Single-Operator Terminal Spec v2.4 GAS</span>
          <span>·</span>
          <span>Target: 1440×900 display canvas</span>
          <span>·</span>
          <span className="text-indigo-400">10 Discrete Verified States</span>
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
          All 10 Snapshots
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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
                Snapshot 1 · Connection Checking (Initial / Reconnecting State)
              </span>
              <span className="text-xs text-slate-400 font-mono">Ping Check</span>
            </div>
            <p className="text-xs text-slate-400">
              Pill with gray dot and exact "Checking connection…" copy.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5">
              <div className="conn-pill conn-pill-checking">
                <span className="pill-dot"></span>
                <span>Checking connection…</span>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 2 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 2) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 2 · Connection Failed (Fatal Connection Error)
              </span>
              <span className="text-xs text-rose-400 font-mono">Failed</span>
            </div>
            <p className="text-xs text-slate-400">
              Red-tinted failure pill with red border, solid red status dot, and "The dashboard could not connect to its database."
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5">
              <div className="conn-pill conn-pill-failed">
                <span className="pill-dot"></span>
                <span>The dashboard could not connect to its database.</span>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 3 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 3) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 3 · Today Loading (In-Flight Fetch)
              </span>
              <span className="text-xs text-indigo-400 font-mono animate-pulse">Loading</span>
            </div>
            <p className="text-xs text-slate-400">
              No date line, no metrics tiles — pure neutral message container with 10px radius: "Loading today’s overview…"
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="text-sm font-semibold text-slate-200">Today</div>
              <div className="msg-neutral">
                Loading today’s overview…
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 4 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 4) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 4 · Today with Job Data Unavailable (Partial Service Degradation)
              </span>
              <span className="text-xs text-amber-400 font-mono">Partial</span>
            </div>
            <p className="text-xs text-slate-400">
              Date line shown: "Today: Sep 14, 2026". Four full tiles: unavailable values match tile styling and are never truncated.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200">Today</span>
                <span className="text-xs text-slate-400 font-mono">Today: Sep 14, 2026</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] rounded p-4">
                  <div className="text-[11px] text-slate-400 uppercase">Open tasks</div>
                  <div className="text-2xl font-bold font-mono text-slate-100 mt-1">6</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] rounded p-4">
                  <div className="text-[11px] text-slate-400 uppercase">Completed tasks</div>
                  <div className="text-2xl font-bold font-mono text-slate-100 mt-1">14</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] rounded p-4">
                  <div className="text-[11px] text-slate-400 uppercase">Strong-match jobs</div>
                  <div className="text-sm font-semibold font-mono text-slate-400 mt-2.5">
                    — (unavailable)
                  </div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] rounded p-4">
                  <div className="text-[11px] text-slate-400 uppercase">Applications sent</div>
                  <div className="text-sm font-semibold font-mono text-slate-400 mt-2.5">
                    — (unavailable)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 5 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 5) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 5 · Today Error (Fatal Load Failure)
              </span>
              <span className="text-xs text-rose-400 font-mono">Outage</span>
            </div>
            <p className="text-xs text-slate-400">
              Left 4px red bar: "The dashboard could not load its data.", secondary "Retry" button directly below.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              <div className="text-sm font-semibold text-slate-200">Today</div>
              <div className="msg-error">
                The dashboard could not load its data.
              </div>
              <div>
                <button className="btn-secondary">Retry</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 6 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 6) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 6 · Upcoming Events (Four Calendar States)
              </span>
              <span className="text-xs text-indigo-400 font-mono">Calendar Matrix</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 6a */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">6(a) Loading:</div>
                <div className="msg-neutral text-xs">
                  Loading upcoming events…
                </div>
              </div>

              {/* 6b */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">6(b) Empty:</div>
                <div className="msg-neutral text-xs">
                  No upcoming events in the next 7 days.
                </div>
              </div>

              {/* 6c */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">6(c) Unavailable:</div>
                <div className="msg-error text-xs">
                  Calendar is not available right now.
                </div>
                <button className="btn-secondary text-xs">Retry</button>
              </div>

              {/* 6d */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">6(d) Failed:</div>
                <div className="msg-error text-xs">
                  Could not reach the calendar service.
                </div>
                <button className="btn-secondary text-xs">Retry</button>
              </div>
            </div>
          </div>
        )}

        {/* PART 2 HEADER */}
        {(selectedSnapshot === 'all' || selectedSnapshot >= 7) && (
          <div className="border-t border-[#1e2638] pt-6">
            <h3 className="text-lg font-bold text-slate-100 font-editorial">
              Part 2 · Tasks View States (Snapshots 7–10)
            </h3>
          </div>
        )}

        {/* SNAPSHOT 7 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 7) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 7 · Tasks Loading and Empty (Two Snapshots)
              </span>
              <span className="text-xs text-slate-400 font-mono">Tasks Initial</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">7(a) Loading:</div>
                <div className="msg-neutral text-xs">
                  Loading tasks…
                </div>
              </div>

              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-2">
                <div className="text-xs font-mono font-semibold text-slate-300">7(b) Empty:</div>
                <div className="msg-neutral text-xs">
                  No tasks yet. Add one above to get started.
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
                Snapshot 8 · Tasks Errors (Two Snapshots)
              </span>
              <span className="text-xs text-rose-400 font-mono">Task Failures</span>
            </div>

            <div className="space-y-4">
              {/* 8a */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  8(a) Load failure:
                </div>
                <div className="msg-error">
                  The dashboard could not load its data.
                </div>
                <div>
                  <button className="btn-secondary text-xs">Retry</button>
                </div>
              </div>

              {/* 8b */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  8(b) Action failure (error at top of list):
                </div>
                <div className="msg-error">
                  That action could not be completed.
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Four task rows stay normal and active below (Unchanged).
                </div>
                <div className="space-y-2">
                  <div className="bg-[#111622] border border-[#222c3d] p-3 rounded text-xs flex items-center justify-between">
                    <span>Submit quarterly invoice to client</span>
                    <span className="text-slate-400 font-mono">Due Sep 10, 2026</span>
                  </div>
                  <div className="bg-[#111622] border border-[#222c3d] p-3 rounded text-xs flex items-center justify-between">
                    <span>Follow up with Northside Logistics</span>
                    <span className="text-slate-400 font-mono">Due Sep 16, 2026</span>
                  </div>
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
                Snapshot 9 · Add-Task Validation and Saving (Two Snapshots)
              </span>
              <span className="text-xs text-indigo-400 font-mono">Form Lifecycle</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 9(a) */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  9(a) Add-Task Validation Error:
                </div>
                <div>
                  <span className="form-label">Title</span>
                  <input
                    type="text"
                    value=""
                    readOnly
                    className="input-field input-focus-indigo"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="form-label">Due Date</span>
                    <input
                      type="text"
                      value="Sep 18, 2026"
                      readOnly
                      className="input-field"
                    />
                  </div>
                  <div>
                    <span className="form-label">Category</span>
                    <input
                      type="text"
                      value="Personal"
                      readOnly
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="msg-error text-xs">
                  A title is required.
                </div>
                <button className="btn-primary text-xs">Add task</button>
              </div>

              {/* 9(b) */}
              <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-300">
                  9(b) Add-Task Saving:
                </div>
                <div>
                  <span className="form-label">Title</span>
                  <input
                    type="text"
                    value="Renew library card"
                    disabled
                    readOnly
                    className="input-field input-disabled"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="form-label">Due Date</span>
                    <input
                      type="text"
                      value="Sep 25, 2026"
                      disabled
                      readOnly
                      className="input-field input-disabled"
                    />
                  </div>
                  <div>
                    <span className="form-label">Category</span>
                    <input
                      type="text"
                      value="Admin"
                      disabled
                      readOnly
                      className="input-field input-disabled"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  All 3 form fields and "Add task" button locked at 55% opacity.
                </p>
                <button disabled className="btn-primary text-xs btn-disabled">
                  Add task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 10 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 10) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 10 · Task Row Pending (Row Action Scoped Lock)
              </span>
              <span className="text-xs text-indigo-400 font-mono">Row Lock Matrix</span>
            </div>
            <p className="text-xs text-slate-400">
              Only row 2 is locked; rows 1, 3, and 4 maintain independent state and interactive controls.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-3">
              {/* Row 1: Overdue */}
              <div className="bg-[#111622] border border-[#222c3d] border-l-4 border-l-red-500 rounded p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-100">Submit quarterly invoice to client</div>
                  <div className="text-[11px] text-red-400 font-mono mt-0.5">
                    Overdue: Sep 10, 2026 · Finance
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-xs">Complete</button>
                  <button className="btn-secondary text-xs">Archive</button>
                </div>
              </div>

              {/* Row 2: Pending saving */}
              <div className="bg-[#141b29] border border-[#2c3a50] rounded p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-100">Follow up with Northside Logistics</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                    <span>Due Sep 16, 2026 · Job Search</span>
                    <span className="text-indigo-400 font-semibold font-mono animate-pulse">
                      (Saving…)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button disabled className="btn-secondary text-xs btn-disabled">
                    Complete
                  </button>
                  <button disabled className="btn-secondary text-xs btn-disabled">
                    Archive
                  </button>
                </div>
              </div>

              {/* Row 3: Normal */}
              <div className="bg-[#111622] border border-[#222c3d] rounded p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-100">Schedule annual dental checkup</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Due Sep 22, 2026 · Health
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-xs">Complete</button>
                  <button className="btn-secondary text-xs">Archive</button>
                </div>
              </div>

              {/* Row 4: Done */}
              <div className="bg-[#0d1017] border border-[#1e2638] opacity-60 rounded p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-400 line-through">
                    Update resume with recent certifications
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    Completed Sep 12 · Career
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-secondary text-xs">Uncomplete</button>
                  <button className="btn-secondary text-xs">Archive</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
