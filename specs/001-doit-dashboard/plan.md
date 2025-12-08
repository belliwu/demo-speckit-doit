# 實作計畫：初始頁面設定 (Doit Dashboard)

**分支**: `001-doit-dashboard` | **日期**: 2025-12-08 | **規格**: [specs/001-doit-dashboard/spec.md](spec.md)
**輸入**: 來自 `/specs/001-doit-dashboard/spec.md` 的功能規格

## 摘要

實作初始的「Doit」儀表板，採用兩欄式佈局來追蹤目前與已完成的目標。功能包含透過模態視窗新增目標、標記完成、刪除目標，以及針對即將到期目標的視覺高亮提示。應用程式將使用 Next.js、Tailwind CSS v4 (粉彩主題)、shadcn/ui，並使用 LocalStorage 進行資料持久化。

## 技術背景

**語言/版本**: TypeScript 5.x, Node.js 20+
**主要依賴**: Next.js 15 (App Router), React 19, Tailwind CSS 4, shadcn/ui, lucide-react, date-fns
**ORM**: Prisma 5.x
**資料庫**: better-sqlite3 (本地 SQLite)
**儲存**: SQLite 資料庫 (透過 Prisma ORM)
**測試**: **無 (NONE)** (使用者明確要求豁免)
**目標平台**: Web (現代瀏覽器)
**專案類型**: Web 應用程式
**效能目標**: UI 互動回應 <100ms, 資料庫查詢 <50ms
**限制**: 本地資料庫, 粉彩顏色主題

## 憲法檢查 (Constitution Check)

_閘門：必須在 Phase 0 研究前通過。Phase 1 設計後需重新檢查。_

- **[失敗 - 已豁免] 原則一：完整測試覆蓋**: 使用者明確要求「無單元測試、整合測試及 E2E 測試」。這違反了憲法，但根據使用者指令予以接受。
- **[通過] 原則二：清楚代碼與註解**: 將會遵循。
- **[通過] 原則三：簡潔使用者體驗**: 兩欄式佈局，模態輸入。
- **[通過] 原則四：響應式設計**: Tailwind 行動優先。
- **[通過] 原則五：最小依賴與耦合**: 使用標準技術棧 (shadcn/ui)。
- **[通過] 原則六：模組化架構**: 基於元件的設計。
- **[通過] 原則七：技術棧一致性**: Next.js, React, Tailwind, shadcn/ui。

## 專案結構

### 文件 (本功能)

```text
specs/001-doit-dashboard/
├── plan.md              # 本檔案
├── research.md          # Phase 0 產出
├── data-model.md        # Phase 1 產出
├── quickstart.md        # Phase 1 產出
├── contracts/           # Phase 1 產出 (Types)
└── tasks.md             # Phase 2 產出
```

### 原始碼 (儲存庫根目錄)

```text
專案根目錄/
├── .env                      # 環境變數設定
├── prisma/
│   └── schema.prisma         # Prisma ORM 資料模型
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主儀表板頁面
│   │   ├── globals.css       # Tailwind v4 主題變數
│   │   └── layout.tsx
│   ├── components/           # UI 層 (Presentation Layer)
│   │   ├── ui/               # shadcn/ui 基礎元件
│   │   └── dashboard/        # 儀表板功能模組
│   │       ├── goal-dashboard.tsx    # 主容器
│   │       ├── goal-column.tsx       # 欄位元件
│   │       ├── goal-card.tsx         # 個別目標項目
│   │       └── add-goal-modal.tsx    # 建立對話框
│   ├── services/             # 服務層 (Service Layer)
│   │   └── goals/
│   │       └── goal-service.ts       # 目標業務邏輯
│   ├── data/                 # 資料存取層 (Data Access Layer)
│   │   ├── prisma-client.ts  # Prisma Client 實例
│   │   └── repositories/
│   │       └── goal-repository.ts    # 目標資料存取
│   ├── hooks/                # React Hooks
│   │   └── use-goals.ts      # 目標狀態管理 Hook
│   ├── utils/                # 工具層 (Utility Layer)
│   │   ├── date-utils.ts     # 日期處理函式
│   │   └── validation.ts     # 驗證邏輯
│   ├── types/                # 型別定義
│   │   └── goal.ts           # Goal 介面定義
│   └── config/               # 系統設定檔
│       ├── database.ts       # 資料庫設定
│       └── constants.ts      # 常數定義
└── prisma/migrations/        # 資料庫遷移記錄
```

**結構決定**: 採用分層架構，簡化元件路徑為 `components/dashboard`，整合 Prisma ORM 與 better-sqlite3 作為資料庫方案。

## 複雜度追蹤

> **僅在憲法檢查有違規且需正當理由時填寫**

| 違規事項          | 為何需要                   | 拒絕更簡單替代方案的原因 |
| ----------------- | -------------------------- | ------------------------ |
| 無測試 (No Tests) | 使用者透過提示參數明確要求 | 不適用 (N/A)             |
