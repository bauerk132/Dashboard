import React from 'react';
import { ActiveTab, SystemConnectionStatus } from '../types';
import { Terminal, Layers, Sliders, CheckSquare, Briefcase, Cpu, Eye } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  connectionStatus: SystemConnectionStatus;
  openInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  connectionStatus,
  openInspector,
}) => {
  return (
    <header className="border-b border-[#1e283a] bg-[#07090e]/95 backdrop-blur sticky top-0 z-30 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & System spec identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#141b29] border border-[#27354a] flex items-center justify-center text-indigo-400 font-mono text-sm font-bold shadow-sm">
            <Terminal className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#101726] border border-[#233147] text-indigo-300">
                SOVEREIGN OPS
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                SPEC v2.4 GAS
              </span>
              {connectionStatus === 'connected' && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online
                </span>
              )}
              {connectionStatus === 'checking' && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  Checking...
                </span>
              )}
              {connectionStatus === 'failed' && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-rose-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  DB Disconnected
                </span>
              )}
            </div>
            <h1 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-2 mt-0.5">
              <span>Life Dashboard</span>
              <span className="text-slate-500 font-normal text-xs">· Single-Operator Architecture</span>
            </h1>
          </div>
        </div>

        {/* Primary Functional Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <nav className="flex items-center bg-[#0d121c] p-1 rounded-lg border border-[#1e283a] text-xs font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'tasks'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs & Queue</span>
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'budget'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Scoring & Budget</span>
            </button>
          </nav>

          {/* Matrix Specs Switcher */}
          <div className="flex items-center bg-[#0d121c] p-1 rounded-lg border border-[#1e283a] text-xs font-mono">
            <span className="px-2 text-[11px] text-slate-500 uppercase tracking-wider hidden lg:inline">
              Specs:
            </span>
            <button
              onClick={() => setActiveTab('sheet_c')}
              className={`px-2.5 py-1.5 rounded transition-colors ${
                activeTab === 'sheet_c'
                  ? 'bg-[#1e293b] text-indigo-300 font-semibold border border-[#3b4b66]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
              title="Sheet C: Home and Tasks States (10 Scenarios)"
            >
              Sheet C
            </button>
            <button
              onClick={() => setActiveTab('sheet_b')}
              className={`px-2.5 py-1.5 rounded transition-colors ${
                activeTab === 'sheet_b'
                  ? 'bg-[#1e293b] text-indigo-300 font-semibold border border-[#3b4b66]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
              title="Sheet B: Jobs Queue & Application States (13 Scenarios)"
            >
              Sheet B
            </button>
            <button
              onClick={() => setActiveTab('sheet_a')}
              className={`px-2.5 py-1.5 rounded transition-colors ${
                activeTab === 'sheet_a'
                  ? 'bg-[#1e293b] text-indigo-300 font-semibold border border-[#3b4b66]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161f30]'
              }`}
              title="Sheet A: AI Scoring and Budget States (12 Scenarios)"
            >
              Sheet A
            </button>
          </div>

          {/* State Simulator Drawer Trigger */}
          <button
            onClick={openInspector}
            className="px-3 py-1.5 rounded-lg bg-[#141d2d] border border-[#27384f] text-slate-200 hover:text-indigo-300 hover:border-indigo-500/50 transition-colors text-xs font-mono flex items-center gap-1.5 shadow-sm"
            title="Open State Simulator to trigger test scenarios"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Simulate States</span>
          </button>
        </div>
      </div>
    </header>
  );
};
