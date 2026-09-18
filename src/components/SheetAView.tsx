import React, { useState } from 'react';

export const SheetAView: React.FC = () => {
  const [selectedSnapshot, setSelectedSnapshot] = useState<number | 'all'>('all');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-sans">
      {/* Spec Sheet Header matching exact reference */}
      <div className="border-b border-[#1e2638] pb-4">
        <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1">
          SHEET A — Jobs: scoring and budget states
        </div>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight font-editorial">
          Sovereign Operations Architecture
        </h2>
        <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-3">
          <span>Single-Operator Terminal Spec v2.4 GAS</span>
          <span>·</span>
          <span>Target: 1440×900 display canvas</span>
          <span>·</span>
          <span className="text-indigo-400">12 Discrete Verified States</span>
        </div>
      </div>

      {/* Snapshot quick jump */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono bg-[#0d121c] p-2 rounded-lg border border-[#1e283a]">
        <span className="text-slate-500 text-[11px] px-2">Jump to:</span>
        <button
          onClick={() => setSelectedSnapshot('all')}
          className={`px-2 py-1 rounded ${
            selectedSnapshot === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-300'
          }`}
        >
          All 12 Snapshots
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
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
                Snapshot 1 · Budget Normal (Enabled Calm State)
              </span>
              <span className="text-xs text-emerald-400 font-mono">Calm / Ready</span>
            </div>
            <p className="text-xs text-slate-400">
              Monthly budget cap $1.00; current spend $0.04; remaining $0.96; calls this month: 37. Button enabled; no callout or warning block.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$0.04</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">$0.96</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-100">37</div>
                </div>
              </div>
              <div>
                <button className="btn-primary">Score next eligible job</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 2 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 2) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 2 · Budget Near Limit (Amber Callout)
              </span>
              <span className="text-xs text-amber-400 font-mono">Warning threshold</span>
            </div>
            <p className="text-xs text-slate-400">
              Current spend $0.91; remaining $0.09. Amber callout block directly above the button; button remains enabled.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-amber-400">$0.91</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-amber-400">$0.09</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-100">212</div>
                </div>
              </div>

              <div className="msg-warn">
                AI scoring budget is near its monthly limit ($0.09 remaining). Future runs will pause once the budget is exhausted.
              </div>

              <div>
                <button className="btn-primary">Score next eligible job</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 3 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 3) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 3 · Budget Exceeded (Paused CTA Disabled)
              </span>
              <span className="text-xs text-rose-400 font-mono">Quota Locked</span>
            </div>
            <p className="text-xs text-slate-400">
              Current spend $1.00; remaining $0.00. Warning block; button disabled at 55% opacity.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-rose-400">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-rose-400">$0.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-100">233</div>
                </div>
              </div>

              <div className="msg-warn">
                AI scoring is paused because the monthly budget limit has been reached. Increase the budget cap or wait for the next billing cycle.
              </div>

              <div>
                <button disabled className="btn-primary btn-disabled">
                  Score next eligible job
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 4 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 4) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 4 · Budget Unavailable (Error State)
              </span>
              <span className="text-xs text-rose-400 font-mono">Fatal</span>
            </div>
            <p className="text-xs text-slate-400">
              Spend metrics unavailable (--). Error message block directly above; button disabled at 55% opacity.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-400">--</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-slate-400">--</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-slate-400">--</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-400">--</div>
                </div>
              </div>

              <div className="msg-error">
                AI budget data is not available right now.
              </div>

              <div>
                <button disabled className="btn-primary btn-disabled">
                  Score next eligible job
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 5 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 5) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 5 · Scoring Pending (In-Flight Evaluation)
              </span>
              <span className="text-xs text-indigo-400 font-mono animate-pulse">Running</span>
            </div>
            <p className="text-xs text-slate-400">
              Running banner shown; active button disabled at 55% with label "Scoring in progress…"; control area slightly dimmed.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="msg-neutral">
                Scoring next eligible job... Running
              </div>
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 opacity-60">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$0.04</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">$0.96</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-100">37</div>
                </div>
              </div>
              <div>
                <button disabled className="btn-primary btn-disabled">
                  Scoring in progress…
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 6 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 6) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 6 · Scoring Success Banner (Post-Run Feedback)
              </span>
              <span className="text-xs text-emerald-400 font-mono">Completed</span>
            </div>
            <p className="text-xs text-slate-400">
              Neutral banner placed above the button; button enabled.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$1.00</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
                  <div className="text-xl font-bold font-mono text-slate-100">$0.05</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">$0.95</div>
                </div>
                <div className="bg-[#111622] border border-[#1e2738] p-3 rounded">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
                  <div className="text-xl font-bold font-mono text-slate-100">38</div>
                </div>
              </div>

              <div className="msg-neutral">
                Scoring run completed: 1 attempted, 1 scored, 0 cached, 0 quarantined, 0 failed.
              </div>

              <div>
                <button className="btn-primary">Score next eligible job</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 7 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 7) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 7 · Scoring Stopped — Provider Rate Limit (429 Backoff)
              </span>
              <span className="text-xs text-amber-400 font-mono">HTTP 429</span>
            </div>
            <p className="text-xs text-slate-400">
              Warning banner above the button; automatic backoff initiated; remaining jobs left unscored.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="msg-warn">
                Scoring stopped early: provider rate limit reached (HTTP 429). The system will back off automatically. Remaining jobs were left unscored.
              </div>
              <div>
                <button className="btn-primary">Score next eligible job</button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOT 8 */}
        {(selectedSnapshot === 'all' || selectedSnapshot === 8) && (
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
            <div className="border-b border-[#182030] pb-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Snapshot 8 · Ledger Blocked — Integrity Check (Security Lock)
              </span>
              <span className="text-xs text-rose-400 font-mono">Integrity Failure</span>
            </div>
            <p className="text-xs text-slate-400">
              Error banner; scoring blocked before any AI call was made; button disabled at 55% opacity.
            </p>

            <div className="bg-[#07090e] border border-[#27354a] rounded-lg p-5 space-y-4">
              <div className="text-sm font-semibold text-slate-200">AI Scoring &amp; Budget Controls</div>
              <div className="msg-error">
                Scoring blocked: the scoring ledger failed an integrity check. No calls were made to the AI provider. Inspect the ledger sheet before continuing.
              </div>
              <div>
                <button disabled className="btn-primary btn-disabled">
                  Score next eligible job
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SNAPSHOTS 9, 10, 11, 12 */}
        {(selectedSnapshot === 'all' || selectedSnapshot >= 9) && (
          <div className="space-y-6">
            <div className="border-t border-[#1e2638] pt-6">
              <h3 className="text-lg font-bold text-slate-100 font-editorial">
                Part 2 · Per-Job Panel States (Snapshots 9–12)
              </h3>
            </div>

            {/* Snapshot 9 */}
            {(selectedSnapshot === 'all' || selectedSnapshot === 9) && (
              <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-slate-300">
                  Snapshot 9 · Per-Job Panel — Unscored
                </div>
                <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Evaluation state:</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      Unscored
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    This job has not been evaluated with AI scoring yet.
                  </p>
                  <button className="btn-primary text-xs">Score this job</button>
                </div>
              </div>
            )}

            {/* Snapshot 10 */}
            {(selectedSnapshot === 'all' || selectedSnapshot === 10) && (
              <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-slate-300">
                  Snapshot 10 · Per-Job Panel — Stale Score (84% Match)
                </div>
                <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Evaluation state:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px]">
                      Stale (84% match)
                    </span>
                  </div>
                  <div className="msg-warn">
                    Target profile, prompt, or model has changed since this job was evaluated. Needs rescoring.
                  </div>
                  <button className="btn-secondary text-xs">Rescore this job</button>
                </div>
              </div>
            )}

            {/* Snapshot 11 */}
            {(selectedSnapshot === 'all' || selectedSnapshot === 11) && (
              <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase text-slate-300">
                  Snapshot 11 · Per-Job Panel — Quarantined
                </div>
                <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Evaluation state:</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-[11px]">
                      Quarantined
                    </span>
                  </div>
                  <div className="msg-error">
                    AI score was quarantined due to validation rules. Record needs rescoring.
                  </div>
                  <button className="btn-secondary text-xs">Rescore this job</button>
                </div>
              </div>
            )}

            {/* Snapshot 12 */}
            {(selectedSnapshot === 'all' || selectedSnapshot === 12) && (
              <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 space-y-4">
                <div className="text-xs font-mono font-bold uppercase text-slate-300">
                  Snapshot 12 · Per-Job Panel — Loading &amp; Error (Two Sub-Snapshots)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 12(a) */}
                  <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                    <div className="text-xs font-mono font-semibold text-slate-300">
                      12(a) Loading:
                    </div>
                    <div className="msg-neutral">
                      Evaluating match against target profile…
                    </div>
                    <button disabled className="btn-secondary text-xs btn-disabled">
                      Rescore this job
                    </button>
                  </div>

                  {/* 12(b) */}
                  <div className="bg-[#111622] border border-[#222c3d] rounded p-4 space-y-3">
                    <div className="text-xs font-mono font-semibold text-slate-300">
                      12(b) Error:
                    </div>
                    <div className="msg-error">
                      AI scoring service is not available right now.
                    </div>
                    <button className="btn-secondary text-xs">
                      Retry scoring
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
