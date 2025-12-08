# 研究報告：初始頁面設定 (Doit Dashboard)

**功能**: `001-doit-dashboard`
**日期**: 2025-12-08

## 1. 未知事項與釐清

### 1.1 Tailwind CSS v4 設定

- **問題**: 如何使用 Tailwind v4 的新 `@theme` 指令設定「粉彩色系」？
- **發現**: Tailwind v4 將設定移至 CSS 中。
- **決定**: 在 `app/globals.css` 的 `@theme` 區塊中使用 CSS 變數定義粉彩主題顏色。
  - 主色 (Primary): 粉藍/粉紫
  - 次要色 (Secondary): 粉紅/粉橘
  - 強調色 (Accent): 粉綠 (用於完成狀態)
  - 破壞性顏色 (Destructive): 粉紅 (用於刪除)
  - 背景色 (Background): 極淺的粉色/米白色

### 1.2 Prisma + better-sqlite3 整合

- **問題**: 如何在 Next.js App Router 中整合 Prisma 與 SQLite？
- **發現**: Prisma 支援 SQLite，better-sqlite3 提供同步 API，適合本地應用。
- **決定**:
  - 使用 Prisma 作為 ORM，簡化資料庫操作。
  - 採用 better-sqlite3 驅動（非 node-sqlite3），效能更佳。
  - 資料庫檔案存放位置：`prisma/dev.db`。
  - 在 `src/data/prisma-client.ts` 建立單例 Prisma Client。
  - Server Components 直接存取資料庫，Client Components 透過 Server Actions。

### 1.3 shadcn/ui 元件選擇

- **問題**: 需要哪些元件？
- **決定**:
  - `Card`: 用於兩欄佈局 (目前/已完成)。
  - `Button`: 用於「新增目標」與操作按鈕。
  - `Input`: 用於目標標題輸入。
  - `Calendar` + `Popover`: 用於日期選擇器 (標準 shadcn 模式)。
  - `Checkbox`: 用於標記完成。
  - `Dialog`: 用於「新增目標」模態視窗。
  - `ScrollArea`: 用於長列表 (選用，但建議加入)。

## 2. 技術選型

| 類別          | 選擇                    | 理由                                  |
| :------------ | :---------------------- | :------------------------------------ |
| **框架**      | Next.js 15 (App Router) | 使用者與憲法要求。                    |
| **樣式**      | Tailwind CSS v4         | 使用者要求。                          |
| **UI 函式庫** | shadcn/ui               | 使用者要求。                          |
| **圖示**      | lucide-react            | shadcn/ui 的標準配備。                |
| **ORM**       | Prisma 5.x              | 類型安全，遷移管理，開發體驗佳。      |
| **資料庫**    | better-sqlite3          | 本地 SQLite，同步 API，零設定。       |
| **日期處理**  | date-fns                | 輕量級，與 shadcn Calendar 配合良好。 |
| **日期處理**  | date-fns                | 輕量級，與 shadcn Calendar 配合良好。 |

## 3. 實作策略

1.  **環境設定**: 建立 `.env` 檔案，設定資料庫路徑。
2.  **資料庫設定**: 初始化 Prisma，定義 Schema，執行遷移。
3.  **資料層**: 建立 Prisma Client 與 Repository 模式。
4.  **服務層**: 實作 `goal-service.ts` 處理業務邏輯。
5.  **UI 元件**: 產生 shadcn/ui 元件，設定 Tailwind v4 主題。
6.  **功能整合**: 建立 `useGoals` Hook 連接服務層與 UI。
7.  **頁面組合**: 在 `app/page.tsx` 組裝完整儀表板。

## 4. 資料庫遷移策略

- 使用 Prisma Migrate 管理資料庫 Schema 變更。
- 開發環境：`prisma migrate dev`
- 重置資料庫：`prisma migrate reset`
- 產生 Prisma Client：`prisma generate`
