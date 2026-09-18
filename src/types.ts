export type SystemConnectionStatus = 'checking' | 'connected' | 'failed';

export type TodayViewState = 'normal' | 'loading' | 'error' | 'partial_degraded';

export type CalendarViewState = 'events' | 'loading' | 'empty' | 'unavailable' | 'failed';

export type TaskCategory = 'Finance' | 'Job Search' | 'Health' | 'Career' | 'Admin' | 'Personal';

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  category: TaskCategory;
  completed: boolean;
  completedDate?: string;
  archived?: boolean;
  isOverdue?: boolean;
  isPending?: boolean;
  pendingText?: string;
}

export type JobStatus = 'new' | 'reviewed' | 'saved' | 'applied' | 'withdrawn' | 'rejected';

export type AIScoringState = 'unscored' | 'stale' | 'quarantined' | 'loading' | 'error' | 'scored';

export interface ApplicationHistoryItem {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface ApplicationRecord {
  status: 'applied' | 'interview' | 'rejected' | 'withdrawn' | 'offer';
  appliedDate: string;
  contactName: string;
  contactEmail: string;
  followUpDate: string;
  notes: string;
  history: ApplicationHistoryItem[];
  malformedHistoryCount?: number;
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  workStyle: string;
  status: JobStatus;
  matchScore: number;
  aiState: AIScoringState;
  staleReason?: string;
  quarantineReason?: string;
  isPending?: boolean;
  notes?: string;
  applicationRecord?: ApplicationRecord;
  hasConflict?: boolean;
  isDuplicateDetected?: boolean;
  sourceUrl?: string;
}

export interface BudgetState {
  mode: 'normal' | 'near_limit' | 'exceeded' | 'unavailable';
  monthlyBudget: number;
  currentSpend: number;
  remaining: number;
  callsThisMonth: number;
  isScoringPending?: boolean;
  activeBanner: 'none' | 'success' | 'rate_limit' | 'ledger_blocked';
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  location?: string;
  category?: string;
}

export type ActiveTab = 'home' | 'tasks' | 'jobs' | 'budget' | 'sheet_c' | 'sheet_b' | 'sheet_a';

export type ThemeStyle = 'sovereign_dark' | 'sahara_warm';
