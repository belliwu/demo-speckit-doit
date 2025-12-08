/**
 * 應用程式常數定義
 */

export const APP_NAME = "Doit" as const;

export const GOAL_CONSTANTS = {
  /**
   * 標題最大長度
   */
  MAX_TITLE_LENGTH: 100,

  /**
   * 即將到期天數閾值 (包含當天)
   */
  EXPIRING_SOON_DAYS: 3,
} as const;

export const UI_CONSTANTS = {
  /**
   * Toast 訊息顯示時長 (毫秒)
   */
  TOAST_DURATION: 3000,
} as const;
