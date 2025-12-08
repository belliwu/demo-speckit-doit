/**
 * 資料庫設定
 * 集中管理資料庫連線參數
 */

export const databaseConfig = {
  /**
   * SQLite 資料庫檔案路徑
   */
  databaseUrl: process.env.DATABASE_URL || "file:./prisma/dev.db",

  /**
   * Prisma 日誌等級
   */
  logLevel:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
} as const;
