import React, { useState } from 'react';
import { BudgetState, JobItem } from '../types';
import { Cpu, DollarSign, AlertTriangle, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface BudgetViewProps {
  budget: BudgetState;
  setBudget: React.Dispatch<React.SetStateAction<BudgetState>>;
  jobs: JobItem[];
  setJobs: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

export type BudgetSimMode =
  | 'normal'
  | '1_normal'
  | '2_near_limit'
  | '3_exceeded'
  | '4_unavailable'
  | '5_pending'
  | '6_success'
  | '7_rate_limit'
  | '8_ledger_blocked';

export const BudgetView: React.FC<BudgetViewProps> = ({
  budget,
  setBudget,
  jobs,
  setJobs,
}) => {
  const [simMode, setSimMode] = useState<BudgetSimMode>('normal');
  const [jobEvalMode, setJobEvalMode] = useState<'9_unscored' | '10_stale' | '11_quarantined' | '12a_loading' | '12b_error'>('10_stale');

  // Trigger live scoring execution
  const handleScoreNext = () => {
    // Put into pending state (Snapshot 5)
    setBudget((prev) => ({
      ...prev,
      isScoringPending: true,
      activeBanner: 'none',
    }));

    setTimeout(() => {
      // Find unscored or stale job
      const targetJob = jobs.find((j) => j.aiState === 'unscored' || j.aiState === 'stale') || jobs[0];

      if (targetJob) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === targetJob.id
              ? { ...j, aiState: 'scored', matchScore: Math.floor(Math.random() * 15) + 82 }
              : j
          )
        );
      }

      setBudget((prev) => ({
        ...prev,
        isScoringPending: false,
        currentSpend: Number((prev.currentSpend + 0.01).toFixed(2)),
        remaining: Number((prev.remaining - 0.01).toFixed(2)),
        callsThisMonth: prev.callsThisMonth + 1,
        activeBanner: 'success',
      }));
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header with spec metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2638] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              AI Operations Engine
            </span>
            <span className="text-slate-500 font-mono text-xs">· Sheet A Specification Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">AI Scoring & Budget Controls</h2>
          <p className="text-xs text-slate-400 mt-1">
            Strict $1.00 monthly cost boundaries, provider rate limit backoffs, and ledger verification.
          </p>
        </div>

        {/* State Simulation Bar for Sheet A */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0e131d] p-1.5 rounded-lg border border-[#1e283a] text-xs font-mono">
          <span className="text-slate-500 text-[11px] px-1.5">Preset:</span>
          <button
            onClick={() => {
              setSimMode('1_normal');
              setBudget({
                mode: 'normal',
                monthlyBudget: 1.0,
                currentSpend: 0.04,
                remaining: 0.96,
                callsThisMonth: 37,
                isScoringPending: false,
                activeBanner: 'none',
              });
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '1_normal' || simMode === 'normal'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 1: Budget Normal ($0.04 spent)"
          >
            1 Normal
          </button>
          <button
            onClick={() => {
              setSimMode('2_near_limit');
              setBudget({
                mode: 'near_limit',
                monthlyBudget: 1.0,
                currentSpend: 0.91,
                remaining: 0.09,
                callsThisMonth: 212,
                isScoringPending: false,
                activeBanner: 'none',
              });
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '2_near_limit'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 2: Budget Near Limit ($0.91 spent)"
          >
            2 Near Limit
          </button>
          <button
            onClick={() => {
              setSimMode('3_exceeded');
              setBudget({
                mode: 'exceeded',
                monthlyBudget: 1.0,
                currentSpend: 1.0,
                remaining: 0.0,
                callsThisMonth: 233,
                isScoringPending: false,
                activeBanner: 'none',
              });
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '3_exceeded'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 3: Budget Exceeded ($1.00 spent, Disabled)"
          >
            3 Exceeded
          </button>
          <button
            onClick={() => {
              setSimMode('4_unavailable');
              setBudget({
                mode: 'unavailable',
                monthlyBudget: 0,
                currentSpend: 0,
                remaining: 0,
                callsThisMonth: 0,
                isScoringPending: false,
                activeBanner: 'none',
              });
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '4_unavailable'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 4: Budget Unavailable"
          >
            4 Unavail
          </button>
          <button
            onClick={() => {
              setSimMode('5_pending');
              setBudget((prev) => ({
                ...prev,
                isScoringPending: true,
                activeBanner: 'none',
              }));
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '5_pending'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 5: Scoring Pending (In-Flight)"
          >
            5 Pending
          </button>
          <button
            onClick={() => {
              setSimMode('6_success');
              setBudget((prev) => ({
                ...prev,
                isScoringPending: false,
                activeBanner: 'success',
              }));
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '6_success'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 6: Success Banner"
          >
            6 Success
          </button>
          <button
            onClick={() => {
              setSimMode('7_rate_limit');
              setBudget((prev) => ({
                ...prev,
                isScoringPending: false,
                activeBanner: 'rate_limit',
              }));
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '7_rate_limit'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 7: HTTP 429 Rate Limit"
          >
            7 429 Rate
          </button>
          <button
            onClick={() => {
              setSimMode('8_ledger_blocked');
              setBudget((prev) => ({
                ...prev,
                isScoringPending: false,
                activeBanner: 'ledger_blocked',
              }));
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '8_ledger_blocked'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
            title="Snapshot 8: Ledger Blocked Integrity Check"
          >
            8 Integrity
          </button>
        </div>
      </div>

      {/* PART 1 · OVERALL BUDGET AND RUN CONTROLS (Snapshots 1–8) */}
      <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#182030]">
          <div>
            <h3 className="text-base font-semibold text-slate-100">AI Scoring & Budget Controls</h3>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Strict client-side quota guardrail preventing unmetered billing
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#161f30] text-indigo-300 border border-[#28354c] text-xs font-mono font-semibold">
            Model: Gemini 2.5 Flash
          </span>
        </div>

        {/* In-Flight Running Banner (Snapshot 5) */}
        {(budget.isScoringPending || simMode === '5_pending') && (
          <div className="msg-neutral flex items-center justify-between">
            <span>Scoring next eligible job... Running</span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
          </div>
        )}

        {/* Active Feedback Banners (Snapshots 6, 7, 8) */}
        {budget.activeBanner === 'success' && (
          <div className="msg-neutral">
            Scoring run completed: 1 attempted, 1 scored, 0 cached, 0 quarantined, 0 failed.
          </div>
        )}

        {budget.activeBanner === 'rate_limit' && (
          <div className="msg-warn">
            Scoring stopped early: provider rate limit reached (HTTP 429). The system will back off automatically. Remaining jobs were left unscored.
          </div>
        )}

        {budget.activeBanner === 'ledger_blocked' && (
          <div className="msg-error">
            Scoring blocked: the scoring ledger failed an integrity check. No calls were made to the AI provider. Inspect the ledger sheet before continuing.
          </div>
        )}

        {/* Budget Metric Tiles Container */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-opacity ${
            budget.isScoringPending || simMode === '5_pending' ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {/* Monthly Budget */}
          <div className="bg-[#090d14] border border-[#1e2738] rounded-lg p-4">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Monthly AI budget</div>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-1">
              {budget.mode === 'unavailable' ? '--' : `$${budget.monthlyBudget.toFixed(2)}`}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Hard cap: $1.00</div>
          </div>

          {/* Current Spend */}
          <div className="bg-[#090d14] border border-[#1e2738] rounded-lg p-4">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Current spend</div>
            <div
              className={`text-2xl font-bold font-mono mt-1 ${
                budget.mode === 'unavailable'
                  ? 'text-slate-400'
                  : budget.currentSpend >= 1.0
                  ? 'text-rose-400'
                  : budget.currentSpend >= 0.8
                  ? 'text-amber-400'
                  : 'text-slate-100'
              }`}
            >
              {budget.mode === 'unavailable' ? '--' : `$${budget.currentSpend.toFixed(2)}`}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Metered locally</div>
          </div>

          {/* Remaining */}
          <div className="bg-[#090d14] border border-[#1e2738] rounded-lg p-4">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Remaining</div>
            <div
              className={`text-2xl font-bold font-mono mt-1 ${
                budget.mode === 'unavailable'
                  ? 'text-slate-400'
                  : budget.remaining <= 0.05
                  ? 'text-rose-400'
                  : budget.remaining <= 0.2
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {budget.mode === 'unavailable' ? '--' : `$${budget.remaining.toFixed(2)}`}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Safe runway</div>
          </div>

          {/* Calls This Month */}
          <div className="bg-[#090d14] border border-[#1e2738] rounded-lg p-4">
            <div className="text-[11px] text-slate-400 uppercase font-mono">Calls this month</div>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-1">
              {budget.mode === 'unavailable' ? '--' : budget.callsThisMonth}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">Tokens cached 82%</div>
          </div>
        </div>

        {/* WARNING CALLOUTS (Directly above the action button) */}
        {/* Snapshot 2: Near limit warning callout */}
        {(budget.mode === 'near_limit' || simMode === '2_near_limit') && (
          <div className="msg-warn">
            AI scoring budget is near its monthly limit ($0.09 remaining). Future runs will pause once the budget is exhausted.
          </div>
        )}

        {/* Snapshot 3: Budget Exceeded warning */}
        {(budget.mode === 'exceeded' || simMode === '3_exceeded') && (
          <div className="msg-warn">
            AI scoring is paused because the monthly budget limit has been reached. Increase the budget cap or wait for the next billing cycle.
          </div>
        )}

        {/* Snapshot 4: Budget Unavailable error */}
        {(budget.mode === 'unavailable' || simMode === '4_unavailable') && (
          <div className="msg-error">
            AI budget data is not available right now.
          </div>
        )}

        {/* PRIMARY ACTION BUTTON */}
        <div className="pt-2 flex items-center gap-3">
          {(() => {
            const isDisabled =
              budget.isScoringPending ||
              simMode === '5_pending' ||
              budget.mode === 'exceeded' ||
              simMode === '3_exceeded' ||
              budget.mode === 'unavailable' ||
              simMode === '4_unavailable' ||
              budget.activeBanner === 'ledger_blocked' ||
              simMode === '8_ledger_blocked';

            const buttonLabel =
              budget.isScoringPending || simMode === '5_pending'
                ? 'Scoring in progress…'
                : 'Score next eligible job';

            return (
              <button
                onClick={handleScoreNext}
                disabled={isDisabled}
                className={`btn-primary text-xs py-2.5 px-4 ${
                  isDisabled ? 'btn-disabled' : ''
                }`}
              >
                <Cpu className="w-3.5 h-3.5 mr-1.5 inline" />
                {buttonLabel}
              </button>
            );
          })()}

          {budget.mode === 'exceeded' && (
            <span className="text-xs text-rose-400 font-mono">
              Action locked by policy
            </span>
          )}
        </div>
      </div>

      {/* PART 2 · PER-JOB PANEL STATES INSPECTION (Snapshots 9–12) */}
      <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#182030] gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-100">Per-Job Scoring Panel States</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live inspection of Snapshots 9, 10, 11, and 12 (Loading & Error)
            </p>
          </div>

          {/* Preset buttons */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => setJobEvalMode('9_unscored')}
              className={`px-2 py-1 rounded ${
                jobEvalMode === '9_unscored' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              9 Unscored
            </button>
            <button
              onClick={() => setJobEvalMode('10_stale')}
              className={`px-2 py-1 rounded ${
                jobEvalMode === '10_stale' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              10 Stale (84%)
            </button>
            <button
              onClick={() => setJobEvalMode('11_quarantined')}
              className={`px-2 py-1 rounded ${
                jobEvalMode === '11_quarantined' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              11 Quarantined
            </button>
            <button
              onClick={() => setJobEvalMode('12a_loading')}
              className={`px-2 py-1 rounded ${
                jobEvalMode === '12a_loading' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              12(a) Loading
            </button>
            <button
              onClick={() => setJobEvalMode('12b_error')}
              className={`px-2 py-1 rounded ${
                jobEvalMode === '12b_error' ? 'bg-indigo-600 text-white' : 'bg-[#182030] text-slate-400'
              }`}
            >
              12(b) Error
            </button>
          </div>
        </div>

        {/* Panel Rendering according to mode */}
        <div className="bg-[#111622] border border-[#222c3d] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1e2738] pb-2">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Target Role
              </span>
              <h4 className="text-sm font-bold text-slate-100">
                IT Support Specialist · Riverbend Community Clinic
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {jobEvalMode === '9_unscored' && 'Snapshot 9 · Unscored'}
              {jobEvalMode === '10_stale' && 'Snapshot 10 · Stale Score'}
              {jobEvalMode === '11_quarantined' && 'Snapshot 11 · Quarantined'}
              {jobEvalMode === '12a_loading' && 'Snapshot 12(a) · In-Flight Evaluation'}
              {jobEvalMode === '12b_error' && 'Snapshot 12(b) · Service Outage'}
            </span>
          </div>

          {/* 9: Unscored */}
          {jobEvalMode === '9_unscored' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Evaluation state:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]">
                  Unscored
                </span>
              </div>
              <p className="text-xs text-slate-300">
                This job has not been evaluated with AI scoring yet.
              </p>
              <div>
                <button
                  onClick={() => setJobEvalMode('10_stale')}
                  className="btn-primary text-xs"
                >
                  Score this job
                </button>
              </div>
            </div>
          )}

          {/* 10: Stale Score */}
          {jobEvalMode === '10_stale' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Evaluation state:</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[11px]">
                  Stale (84% match)
                </span>
              </div>
              <div className="msg-warn">
                Target profile, prompt, or model has changed since this job was evaluated. Needs rescoring.
              </div>
              <div>
                <button
                  onClick={() => setJobEvalMode('12a_loading')}
                  className="btn-secondary text-xs"
                >
                  Rescore this job
                </button>
              </div>
            </div>
          )}

          {/* 11: Quarantined */}
          {jobEvalMode === '11_quarantined' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Evaluation state:</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-[11px]">
                  Quarantined
                </span>
              </div>
              <div className="msg-error">
                AI score was quarantined due to validation rules. Record needs rescoring.
              </div>
              <div>
                <button
                  onClick={() => setJobEvalMode('12a_loading')}
                  className="btn-secondary text-xs"
                >
                  Rescore this job
                </button>
              </div>
            </div>
          )}

          {/* 12(a): Loading */}
          {jobEvalMode === '12a_loading' && (
            <div className="space-y-3">
              <div className="msg-neutral">
                Evaluating match against target profile…
              </div>
              <div>
                <button disabled className="btn-secondary text-xs btn-disabled">
                  Rescore this job
                </button>
              </div>
            </div>
          )}

          {/* 12(b): Error */}
          {jobEvalMode === '12b_error' && (
            <div className="space-y-3">
              <div className="msg-error">
                AI scoring service is not available right now.
              </div>
              <div>
                <button
                  onClick={() => setJobEvalMode('10_stale')}
                  className="btn-secondary text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1 inline" />
                  Retry scoring
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
