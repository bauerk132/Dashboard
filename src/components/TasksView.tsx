import React, { useState } from 'react';
import { TaskItem, TaskCategory } from '../types';
import { Plus, RefreshCw, AlertCircle, Check, Archive, ArrowUpRight } from 'lucide-react';

interface TasksViewProps {
  tasks: TaskItem[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

export type TaskSimMode =
  | 'normal'
  | '7a_loading'
  | '7b_empty'
  | '8a_load_error'
  | '8b_action_error'
  | '9a_validation_error'
  | '9b_form_saving'
  | '10_row_pending';

export const TasksView: React.FC<TasksViewProps> = ({ tasks, setTasks }) => {
  const [simMode, setSimMode] = useState<TaskSimMode>('normal');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('Sep 18, 2026');
  const [category, setCategory] = useState<TaskCategory>('Personal');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');

  // Handle adding task with exact 9(a) and 9(b) rules
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('A title is required.');
      return;
    }
    setValidationError(null);
    setIsFormSaving(true);

    // Simulate async network persistence lock
    setTimeout(() => {
      const newTask: TaskItem = {
        id: `task-${Date.now()}`,
        title: title.trim(),
        dueDate: dueDate || 'Sep 18, 2026',
        category,
        completed: false,
      };
      setTasks((prev) => [newTask, ...prev]);
      setTitle('');
      setIsFormSaving(false);
    }, 900);
  };

  // Handle Complete with row-level mutation lock (Snapshot 10)
  const handleToggleComplete = (id: string) => {
    // Put row in pending state
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPending: true } : t))
    );

    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: !t.completed,
                completedDate: !t.completed ? 'Today' : undefined,
                isPending: false,
              }
            : t
        )
      );
    }, 800);
  };

  // Handle Archive
  const handleArchive = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPending: true } : t))
    );
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }, 600);
  };

  // Filter tasks based on view tab
  const displayedTasks = tasks.filter((t) => {
    if (t.archived) return false;
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'overdue') return t.isOverdue && !t.completed;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* View Header with spec metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2638] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Execution Ledger
            </span>
            <span className="text-slate-500 font-mono text-xs">· Sheet C Part 2</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Tasks Operations</h2>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic row-level locks, scoped mutations, and form validation specifications.
          </p>
        </div>

        {/* State Simulation Bar for Tasks */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0e131d] p-1.5 rounded-lg border border-[#1e283a] text-xs font-mono">
          <span className="text-slate-500 text-[11px] px-1.5">Simulate:</span>
          <button
            onClick={() => {
              setSimMode('normal');
              setActionError(null);
              setValidationError(null);
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
            onClick={() => setSimMode('7a_loading')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '7a_loading'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            7(a) Loading
          </button>
          <button
            onClick={() => setSimMode('7b_empty')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '7b_empty'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            7(b) Empty
          </button>
          <button
            onClick={() => setSimMode('8a_load_error')}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '8a_load_error'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            8(a) Fatal Load
          </button>
          <button
            onClick={() => {
              setSimMode('8b_action_error');
              setActionError('That action could not be completed.');
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '8b_action_error'
                ? 'bg-rose-700 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            8(b) Action Error
          </button>
          <button
            onClick={() => {
              setSimMode('9a_validation_error');
              setTitle('');
              setValidationError('A title is required.');
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '9a_validation_error'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            9(a) Val Error
          </button>
          <button
            onClick={() => {
              setSimMode('9b_form_saving');
              setTitle('Renew library card');
              setDueDate('Sep 25, 2026');
              setCategory('Admin');
              setIsFormSaving(true);
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '9b_form_saving'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            9(b) Locked
          </button>
          <button
            onClick={() => {
              setSimMode('10_row_pending');
              // Set row 2 pending
              setTasks((prev) =>
                prev.map((t, idx) => (idx === 1 ? { ...t, isPending: true } : t))
              );
            }}
            className={`px-2 py-1 rounded transition-colors ${
              simMode === '10_row_pending'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-[#161f30] text-slate-300 hover:bg-[#1f2c42]'
            }`}
          >
            10 Row Lock
          </button>
        </div>
      </div>

      {/* SNAPSHOT 8(a): Fatal load error */}
      {simMode === '8a_load_error' ? (
        <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#182030] pb-2 text-xs font-mono">
            <span className="font-bold text-slate-300">8(a) Tasks Load Failure</span>
            <span className="text-rose-400">Database Unreachable</span>
          </div>
          <div className="msg-error">
            The dashboard could not load its data.
          </div>
          <div>
            <button
              onClick={() => setSimMode('normal')}
              className="btn-secondary"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 inline" />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ADD TASK FORM (Snapshots 9(a) & 9(b)) */}
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#182030]">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide font-mono">
                Add a task
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">
                {isFormSaving || simMode === '9b_form_saving'
                  ? '9(b) Form Pending (Locked 55%)'
                  : validationError || simMode === '9a_validation_error'
                  ? '9(a) Focus & Error Validation'
                  : 'Interactive Form'}
              </span>
            </div>

            <form onSubmit={handleAddTask}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    placeholder=""
                    value={title}
                    disabled={isFormSaving || simMode === '9b_form_saving'}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    className={`input-field ${
                      validationError || simMode === '9a_validation_error'
                        ? 'input-focus-indigo'
                        : ''
                    } ${
                      isFormSaving || simMode === '9b_form_saving' ? 'input-disabled' : ''
                    }`}
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="form-label">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    disabled={isFormSaving || simMode === '9b_form_saving'}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`input-field ${
                      isFormSaving || simMode === '9b_form_saving' ? 'input-disabled' : ''
                    }`}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={category}
                    disabled={isFormSaving || simMode === '9b_form_saving'}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    className={`input-field bg-[#07090e] ${
                      isFormSaving || simMode === '9b_form_saving' ? 'input-disabled' : ''
                    }`}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Finance">Finance</option>
                    <option value="Job Search">Job Search</option>
                    <option value="Health">Health</option>
                    <option value="Career">Career</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Validation Error Banner 9(a) - spans full width above primary action */}
              {(validationError || simMode === '9a_validation_error') && (
                <div className="msg-error mb-4">
                  A title is required.
                </div>
              )}

              {/* Submit Button (Locked at 55% in 9(b)) */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isFormSaving || simMode === '9b_form_saving'}
                  className={`btn-primary ${
                    isFormSaving || simMode === '9b_form_saving' ? 'btn-disabled' : ''
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 mr-1 inline" />
                  Add task
                </button>

                {simMode === '9b_form_saving' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSimMode('normal');
                      setIsFormSaving(false);
                    }}
                    className="btn-secondary text-xs"
                  >
                    Unlock Form
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TASK LIST CONTAINER */}
          <div className="bg-[#0f131c] border border-[#1e2638] rounded-xl p-5 lg:p-6 shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#182030]">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px] uppercase">Filter:</span>
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filter === 'all'
                      ? 'bg-[#182030] text-indigo-300 border border-[#2c3b52] font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All ({tasks.length})
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filter === 'active'
                      ? 'bg-[#182030] text-indigo-300 border border-[#2c3b52] font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Active ({tasks.filter((t) => !t.completed).length})
                </button>
                <button
                  onClick={() => setFilter('overdue')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filter === 'overdue'
                      ? 'bg-[#241416] text-rose-300 border border-rose-900/60 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overdue ({tasks.filter((t) => t.isOverdue && !t.completed).length})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filter === 'completed'
                      ? 'bg-[#10241b] text-emerald-300 border border-emerald-900/60 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Done ({tasks.filter((t) => t.completed).length})
                </button>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Snapshot 10 Row Action Scoped Lock
              </div>
            </div>

            {/* SNAPSHOT 8(b): Action failure error at top of list */}
            {(actionError || simMode === '8b_action_error') && (
              <div className="space-y-3 mb-4">
                <div className="msg-error flex items-center justify-between">
                  <span>That action could not be completed.</span>
                  <button
                    onClick={() => {
                      setActionError(null);
                      if (simMode === '8b_action_error') setSimMode('normal');
                    }}
                    className="text-xs underline text-rose-300 hover:text-rose-100"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Spec note: Four task rows stay normal and active below (Unchanged).
                </div>
              </div>
            )}

            {/* SNAPSHOT 7(a): Loading State */}
            {simMode === '7a_loading' && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 font-mono">7(a) Loading:</div>
                <div className="msg-neutral">
                  Loading tasks…
                </div>
              </div>
            )}

            {/* SNAPSHOT 7(b): Empty State */}
            {simMode === '7b_empty' && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 font-mono">7(b) Empty:</div>
                <div className="msg-neutral">
                  No tasks yet. Add one above to get started.
                </div>
                <div className="mt-2 text-[11px] text-slate-500 font-mono">
                  Shown below the "Add a task" form card with zero task rows rendered.
                </div>
              </div>
            )}

            {/* NORMAL TASK ROWS (Snapshot 10) */}
            {simMode !== '7a_loading' && simMode !== '7b_empty' && (
              <div className="space-y-2.5">
                {displayedTasks.map((task) => {
                  const isPending = task.isPending;

                  return (
                    <div
                      key={task.id}
                      className={`border rounded-md p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        task.completed
                          ? 'bg-[#0d1017] border-[#1e2638] opacity-60'
                          : isPending
                          ? 'bg-[#141b29] border-[#2c3a50]'
                          : task.isOverdue
                          ? 'bg-[#111622] border-[#222c3d] border-l-4 border-l-red-500'
                          : 'bg-[#111622] border-[#222c3d]'
                      }`}
                    >
                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-medium ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-100'
                          }`}
                        >
                          {task.title}
                        </div>
                        <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2.5 mt-1 font-mono">
                          {task.isOverdue && !task.completed ? (
                            <span className="text-red-400 font-semibold">
                              Overdue: {task.dueDate}
                            </span>
                          ) : task.completed ? (
                            <span className="text-slate-500">
                              Completed {task.completedDate || 'Sep 12'}
                            </span>
                          ) : (
                            <span>Due {task.dueDate}</span>
                          )}

                          <span className="text-slate-600">·</span>
                          <span className="text-slate-400">{task.category}</span>

                          {/* Saving label for pending row */}
                          {isPending && (
                            <span className="text-indigo-400 font-semibold font-mono animate-pulse">
                              (Saving…)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Task Actions (Snapshot 10 scoped locks) */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          disabled={isPending}
                          className={`btn-secondary text-[11px] py-1.5 px-3 ${
                            isPending ? 'btn-disabled' : ''
                          }`}
                        >
                          {task.completed ? 'Uncomplete' : 'Complete'}
                        </button>
                        <button
                          onClick={() => handleArchive(task.id)}
                          disabled={isPending}
                          className={`btn-secondary text-[11px] py-1.5 px-3 ${
                            isPending ? 'btn-disabled' : ''
                          }`}
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
