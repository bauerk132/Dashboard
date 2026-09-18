import React, { useState } from 'react';
import {
  ActiveTab,
  SystemConnectionStatus,
  TodayViewState,
  CalendarViewState,
  TaskItem,
  JobItem,
  BudgetState,
  CalendarEvent,
} from './types';
import { initialTasks, initialJobs, initialBudget, initialEvents } from './data/initialData';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { TasksView } from './components/TasksView';
import { JobsView } from './components/JobsView';
import { BudgetView } from './components/BudgetView';
import { SheetAView } from './components/SheetAView';
import { SheetBView } from './components/SheetBView';
import { SheetCView } from './components/SheetCView';
import { StateInspectorModal } from './components/StateInspectorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [connectionStatus, setConnectionStatus] = useState<SystemConnectionStatus>('connected');
  const [todayState, setTodayState] = useState<TodayViewState>('normal');
  const [calendarState, setCalendarState] = useState<CalendarViewState>('events');
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [budget, setBudget] = useState<BudgetState>(initialBudget);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  // Cross-view navigation helper
  const navigateTo = (tab: 'tasks' | 'jobs' | 'budget') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#cbd5e1] flex flex-col font-sans selection:bg-indigo-900 selection:text-indigo-100">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        connectionStatus={connectionStatus}
        openInspector={() => setIsInspectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
        {activeTab === 'home' && (
          <HomeView
            connectionStatus={connectionStatus}
            setConnectionStatus={setConnectionStatus}
            todayState={todayState}
            setTodayState={setTodayState}
            calendarState={calendarState}
            setCalendarState={setCalendarState}
            tasks={tasks}
            jobs={jobs}
            events={events}
            navigateTo={navigateTo}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView tasks={tasks} setTasks={setTasks} />
        )}

        {activeTab === 'jobs' && (
          <JobsView
            jobs={jobs}
            setJobs={setJobs}
            onScoreJob={(jobId) => {
              setActiveTab('budget');
            }}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetView
            budget={budget}
            setBudget={setBudget}
            jobs={jobs}
            setJobs={setJobs}
          />
        )}

        {activeTab === 'sheet_c' && <SheetCView />}
        {activeTab === 'sheet_b' && <SheetBView />}
        {activeTab === 'sheet_a' && <SheetAView />}
      </main>

      {/* State Simulation Modal Sandbox */}
      <StateInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        connectionStatus={connectionStatus}
        setConnectionStatus={setConnectionStatus}
        todayState={todayState}
        setTodayState={setTodayState}
        calendarState={calendarState}
        setCalendarState={setCalendarState}
        budget={budget}
        setBudget={setBudget}
      />

      {/* Sovereign Footer */}
      <footer className="border-t border-[#1a2333] bg-[#07090e] px-4 py-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">SOVEREIGN ARCHITECTURE</span>
            <span>·</span>
            <span>Single-Operator Terminal Spec v2.4 GAS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-indigo-400">Sheet A: 12 States</span>
            <span className="text-indigo-400">Sheet B: 13 States</span>
            <span className="text-indigo-400">Sheet C: 10 States</span>
            <button
              onClick={() => setIsInspectorOpen(true)}
              className="text-slate-400 hover:text-indigo-300 underline"
            >
              Open State Inspector
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
