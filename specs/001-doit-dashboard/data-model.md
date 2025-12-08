# 資料模型：初始頁面設定 (Doit Dashboard)

**功能**: `001-doit-dashboard`

## 實體 (Entities)

### Goal (目標)

代表使用者要追蹤的目標項目。

| 欄位          | 類型      | 必填 | 說明                                |
| :------------ | :-------- | :--- | :---------------------------------- |
| `id`          | `string`  | 是   | UUID 或基於時間戳記的唯一識別碼。   |
| `title`       | `string`  | 是   | 目標的名稱/描述。                   |
| `endDate`     | `string`  | 是   | ISO 8601 日期字串 (YYYY-MM-DD)。    |
| `isCompleted` | `boolean` | 是   | 目標狀態。預設值：`false`。         |
| `createdAt`   | `number`  | 是   | 建立時間戳記 (ms)。用於排序。       |
| `completedAt` | `number`  | 否   | 完成時間戳記 (ms)。標記完成時記錄。 |

## 資料庫 Schema (Prisma)

```prisma
model Goal {
  id          String   @id @default(cuid())
  title       String
  endDate     DateTime
  isCompleted Boolean  @default(false)
  createdAt   DateTime @default(now())
  completedAt DateTime?
}
```

## 儲存層

### 資料庫

- **類型**: SQLite (better-sqlite3)
- **檔案位置**: `prisma/dev.db`
- **ORM**: Prisma Client

### 資料存取模式

- **Repository Pattern**: 封裝資料存取邏輯
- **Prisma Client**: 單例模式，避免多實例

### 排序規則

1.  **目前目標 (Current Goals)**:
    - 篩選: `!isCompleted`
    - 排序: `createdAt` (遞減) - 最新建立的在最上面。
2.  **已完成目標 (Completed Goals)**:
    - 篩選: `isCompleted`
    - 排序: `completedAt` (遞減) - 最近完成的在最上面。

### 驗證規則

- `title`: 非空字串，最大長度 100 字元。
- `endDate`: 必須是今天或未來的日期 (建立時)。
