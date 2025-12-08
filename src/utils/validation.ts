import { GOAL_CONSTANTS } from "@/config/constants";

/**
 * 驗證目標標題
 * @param title 標題字串
 * @returns 驗證結果 { valid: boolean, error?: string }
 */
export function validateTitle(title: string): {
  valid: boolean;
  error?: string;
} {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: "標題不能為空" };
  }

  if (title.length > GOAL_CONSTANTS.MAX_TITLE_LENGTH) {
    return {
      valid: false,
      error: `標題長度不能超過 ${GOAL_CONSTANTS.MAX_TITLE_LENGTH} 字元`,
    };
  }

  return { valid: true };
}

/**
 * 驗證結束日期
 * @param endDate Date 物件
 * @returns 驗證結果 { valid: boolean, error?: string }
 */
export function validateEndDate(endDate: Date): {
  valid: boolean;
  error?: string;
} {
  if (!endDate || !(endDate instanceof Date) || isNaN(endDate.getTime())) {
    return { valid: false, error: "請選擇有效的日期" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (endDate < today) {
    return { valid: false, error: "結束日期不能早於今天" };
  }

  return { valid: true };
}

/**
 * 驗證建立目標的輸入資料
 * @param title 標題
 * @param endDate 結束日期
 * @returns 驗證結果 { valid: boolean, errors: string[] }
 */
export function validateCreateGoal(
  title: string,
  endDate: Date
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const titleValidation = validateTitle(title);
  if (!titleValidation.valid && titleValidation.error) {
    errors.push(titleValidation.error);
  }

  const dateValidation = validateEndDate(endDate);
  if (!dateValidation.valid && dateValidation.error) {
    errors.push(dateValidation.error);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
