/**
 * 目標實體型別定義
 */
export interface Goal {
  id: string;
  title: string;
  endDate: string; // ISO 日期字串
  isCompleted: boolean;
  createdAt: number; // 時間戳記 (ms)
  completedAt?: number; // 時間戳記 (ms)
}

/**
 * 建立目標的輸入資料
 */
export interface CreateGoalInput {
  title: string;
  endDate: Date;
}

/**
 * 更新目標的輸入資料
 */
export interface UpdateGoalInput {
  title?: string;
  endDate?: Date;
  isCompleted?: boolean;
  completedAt?: Date | null;
}
