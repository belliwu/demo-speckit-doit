import { GOAL_CONSTANTS } from "@/config/constants";
import {
  differenceInDays,
  format,
  isAfter,
  isBefore,
  startOfToday,
} from "date-fns";
import { zhTW } from "date-fns/locale";

/**
 * 計算距離結束日期的剩餘天數
 * @param endDate ISO 日期字串或 Date 物件
 * @returns 剩餘天數 (包含當天,負數表示已過期)
 */
export function getDaysRemaining(endDate: string | Date): number {
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const today = startOfToday();
  return differenceInDays(end, today);
}

/**
 * 檢查目標是否即將到期 (3天內)
 * @param endDate ISO 日期字串或 Date 物件
 * @returns 是否即將到期
 */
export function isExpiringSoon(endDate: string | Date): boolean {
  const daysRemaining = getDaysRemaining(endDate);
  return (
    daysRemaining >= 0 && daysRemaining <= GOAL_CONSTANTS.EXPIRING_SOON_DAYS
  );
}

/**
 * 檢查目標是否已過期
 * @param endDate ISO 日期字串或 Date 物件
 * @returns 是否已過期
 */
export function isExpired(endDate: string | Date): boolean {
  const daysRemaining = getDaysRemaining(endDate);
  return daysRemaining < 0;
}

/**
 * 格式化日期為繁體中文
 * @param date Date 物件或 ISO 字串
 * @param formatStr 格式字串 (預設: 'yyyy年MM月dd日')
 * @returns 格式化後的日期字串
 */
export function formatDate(
  date: Date | string,
  formatStr: string = "yyyy年MM月dd日"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: zhTW });
}

/**
 * 格式化日期為簡短格式
 * @param date Date 物件或 ISO 字串
 * @returns 格式化後的日期字串 (MM/dd)
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MM/dd");
}

/**
 * 驗證日期是否為今天或未來
 * @param date Date 物件
 * @returns 是否有效
 */
export function isFutureOrToday(date: Date): boolean {
  const today = startOfToday();
  return !isBefore(date, today);
}
