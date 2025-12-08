/**
 * 目標實體定義
 */
export interface Goal {
  id: string;
  title: string;
  endDate: string; // ISO 日期字串
  isCompleted: boolean;
  createdAt: number; // 時間戳記
  completedAt?: number; // 時間戳記
}

/**
 * 目標服務介面 (Hook)
 */
export interface UseGoalsReturn {
  goals: Goal[];
  addGoal: (title: string, endDate: Date) => void;
  toggleGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  getDaysRemaining: (endDate: string) => number;
  isExpiringSoon: (endDate: string) => boolean;
}
