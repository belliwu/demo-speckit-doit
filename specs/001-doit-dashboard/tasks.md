# 任務清單：初始頁面設定 (Doit Dashboard)

**輸入**: 來自 `/specs/001-doit-dashboard/` 的設計文件
**前置需求**: plan.md (必填), spec.md (使用者故事必填), research.md, data-model.md, contracts/

**測試**: 根據憲法要求,此專案已明確豁免測試。因此本任務清單不包含測試任務。

**組織方式**: 任務依使用者故事分組,以實現每個故事的獨立實作與測試。

## 格式說明: `- [ ] [ID] [P?] [Story?] 描述`

- **[P]**: 可平行執行 (不同檔案、無相依性)
- **[Story]**: 任務所屬的使用者故事 (例如: US1, US2, US3)
- 描述中包含確切的檔案路徑

---

## 階段 1: 環境與基礎設定 (Setup)

**目的**: 專案初始化與基本架構建立

- [x] T001 建立 `.env` 檔案,設定資料庫路徑 `DATABASE_URL="file:./prisma/dev.db"`
- [x] T002 [P] 安裝 Prisma 相關套件: `npm install prisma @prisma/client`
- [x] T003 [P] 安裝 better-sqlite3 套件: `npm install better-sqlite3`
- [x] T004 [P] 安裝 date-fns 套件: `npm install date-fns`
- [x] T005 [P] 初始化 shadcn/ui (若尚未初始化): `npx shadcn@latest init`
- [x] T006 [P] 安裝 shadcn/ui 元件: `npx shadcn@latest add button card input calendar popover checkbox dialog scroll-area`
- [x] T007 在 `app/globals.css` 中設定 Tailwind v4 @theme 粉彩色系主題變數

---

## 階段 2: 資料層建置 (Foundational - 阻塞性前置條件)

**目的**: 核心基礎設施,所有使用者故事實作前必須完成

**⚠️ 關鍵**: 此階段完成前,任何使用者故事都無法開始實作

- [x] T008 驗證 `prisma/schema.prisma` 已正確定義 Goal 模型 (id, title, endDate, isCompleted, createdAt, completedAt)
- [x] T009 執行 Prisma 遷移: `npx prisma migrate dev --name init`
- [x] T010 產生 Prisma Client: `npx prisma generate`
- [x] T011 [P] 在 `src/data/prisma-client.ts` 建立 Prisma Client 單例模式
- [x] T012 [P] 在 `src/config/database.ts` 驗證資料庫設定檔已建立
- [x] T013 [P] 在 `src/config/constants.ts` 驗證常數定義檔已建立 (MAX_TITLE_LENGTH, EXPIRING_SOON_DAYS, TOAST_DURATION)
- [x] T014 [P] 在 `src/types/goal.ts` 建立 Goal 與 UseGoalsReturn 介面定義
- [x] T015 在 `src/data/repositories/goal-repository.ts` 實作 Goal Repository (findAll, findById, create, update, delete)

**檢查點**: 資料層就緒 - 使用者故事實作現在可以開始進行

---

## 階段 3: 使用者故事 1 - 檢視目標儀表板 (優先級: P1) 🎯 MVP

**目標**: 實作兩欄式佈局,顯示目前目標與已完成目標,包含剩餘天數計算

**獨立測試**: 透過建立測試資料並載入頁面,驗證兩欄式佈局正確顯示目前目標 (含剩餘天數) 與已完成目標 (含刪除線與完成日期)

### 使用者故事 1 實作

- [x] T016 [P] [US1] 在 `src/utils/date-utils.ts` 建立日期工具函式 (getDaysRemaining, isExpiringSoon, formatDate)
- [x] T017 [P] [US1] 在 `src/utils/validation.ts` 建立驗證函式 (validateTitle, validateEndDate)
- [x] T018 [US1] 在 `src/services/goals/goal-service.ts` 實作目標業務邏輯 (getAllGoals, getCurrentGoals, getCompletedGoals)
- [x] T019 [P] [US1] 在 `src/components/ui/` 驗證 shadcn/ui Card 元件已安裝
- [x] T020 [P] [US1] 在 `src/components/ui/` 驗證 shadcn/ui ScrollArea 元件已安裝
- [x] T021 [US1] 在 `src/components/dashboard/goal-card.tsx` 建立個別目標卡片元件 (顯示標題、剩餘天數、完成狀態)
- [x] T022 [US1] 在 `src/components/dashboard/goal-column.tsx` 建立欄位容器元件 (目前目標/已完成目標)
- [x] T023 [US1] 在 `src/components/dashboard/goal-dashboard.tsx` 建立主儀表板容器元件 (整合兩欄佈局)
- [x] T024 [US1] 在 `src/hooks/use-goals.ts` 建立 useGoals Hook (整合服務層與狀態管理)
- [x] T025 [US1] 在 `src/app/page.tsx` 整合 goal-dashboard 元件,完成主頁面佈局

**檢查點**: 此時使用者故事 1 應完全可運作且可獨立測試

---

## 階段 4: 使用者故事 2 - 新增目標 (優先級: P1) 🎯 MVP

**目標**: 實作新增目標功能,包含模態視窗、表單驗證與資料儲存

**獨立測試**: 點擊「新增目標」按鈕,驗證模態視窗開啟,輸入標題與日期後儲存,確認新目標出現在目前目標欄位

### 使用者故事 2 實作

- [x] T026 [P] [US2] 在 `src/components/ui/` 驗證 shadcn/ui Dialog 元件已安裝
- [x] T027 [P] [US2] 在 `src/components/ui/` 驗證 shadcn/ui Input 元件已安裝
- [x] T028 [P] [US2] 在 `src/components/ui/` 驗證 shadcn/ui Calendar 與 Popover 元件已安裝
- [x] T029 [P] [US2] 在 `src/components/ui/` 驗證 shadcn/ui Button 元件已安裝
- [x] T030 [US2] 在 `src/services/goals/goal-service.ts` 新增 createGoal 方法
- [x] T031 [US2] 在 `src/components/dashboard/add-goal-modal.tsx` 建立新增目標模態元件 (包含表單與驗證邏輯)
- [x] T032 [US2] 在 `src/hooks/use-goals.ts` 新增 addGoal 函式
- [x] T033 [US2] 在 `src/components/dashboard/goal-dashboard.tsx` 整合「新增目標」按鈕與模態視窗
- [x] T034 [US2] 在 `src/components/dashboard/add-goal-modal.tsx` 實作表單驗證 (標題非空、日期非過去)

**檢查點**: 此時使用者故事 1 與 2 都應獨立運作

---

## 階段 5: 使用者故事 3 - 完成目標 (優先級: P2)

**目標**: 實作標記目標為完成的功能,將目標從目前欄位移至已完成欄位

**獨立測試**: 勾選目前目標的核取方塊,驗證目標立即移動到已完成欄位,並顯示刪除線與完成日期

### 使用者故事 3 實作

- [x] T035 [P] [US3] 在 `src/components/ui/` 驗證 shadcn/ui Checkbox 元件已安裝
- [x] T036 [US3] 在 `src/services/goals/goal-service.ts` 新增 toggleGoalCompletion 方法
- [x] T037 [US3] 在 `src/hooks/use-goals.ts` 新增 toggleGoal 函式
- [x] T038 [US3] 在 `src/components/dashboard/goal-card.tsx` 新增核取方塊互動與完成狀態視覺樣式 (刪除線、完成日期顯示)
- [x] T039 [US3] 在 `src/components/dashboard/goal-column.tsx` 確保完成目標即時更新欄位顯示

**檢查點**: 此時使用者故事 1、2 與 3 都應獨立運作

---

## 階段 6: 使用者故事 4 - 即將到期目標警告 (優先級: P2)

**目標**: 實作即將到期目標 (3 天內) 的視覺高亮提示功能

**獨立測試**: 建立不同到期日的目標,驗證 3 天內到期的目標以特殊顏色/圖示高亮顯示

### 使用者故事 4 實作

- [x] T040 [US4] 在 `src/utils/date-utils.ts` 驗證 isExpiringSoon 函式已實作 (檢查是否 <= 3 天)
- [x] T041 [US4] 在 `src/components/dashboard/goal-card.tsx` 新增即將到期的視覺高亮樣式 (粉彩色系警告色、圖示)
- [x] T042 [US4] 在 `src/components/dashboard/goal-card.tsx` 整合 isExpiringSoon 邏輯,條件式套用高亮樣式

**檢查點**: 所有 P1 與 P2 使用者故事應完全運作

---

## 階段 7: 使用者故事 5 - 刪除目標 (優先級: P3)

**目標**: 實作永久刪除目標的功能 (適用於目前與已完成目標)

**獨立測試**: 點擊目標的刪除按鈕/圖示,驗證目標從列表中立即消失且不可復原

### 使用者故事 5 實作

- [x] T043 [US5] 在 `src/services/goals/goal-service.ts` 新增 deleteGoal 方法
- [x] T044 [US5] 在 `src/hooks/use-goals.ts` 新增 deleteGoal 函式
- [x] T045 [US5] 在 `src/components/dashboard/goal-card.tsx` 新增刪除按鈕 (使用 lucide-react 垃圾桶圖示)
- [x] T046 [US5] 在 `src/components/dashboard/goal-card.tsx` 整合刪除確認互動 (選用: 可加入確認對話框)

**檢查點**: 所有使用者故事應完全可獨立運作

---

## 階段 8: 優化與跨功能關注 (Polish & Cross-Cutting Concerns)

**目的**: 影響多個使用者故事的改進項目

- [x] T047 [P] 在 `src/components/dashboard/goal-column.tsx` 新增空狀態顯示 (當無目標時顯示友善訊息)
- [x] T048 [P] 在 `src/components/dashboard/goal-card.tsx` 優化響應式設計 (行動裝置顯示)
- [x] T049 [P] 在 `app/globals.css` 微調粉彩色系主題,確保視覺一致性
- [x] T050 在 `src/components/dashboard/add-goal-modal.tsx` 新增錯誤訊息顯示與使用者回饋
- [ ] T051 [P] 程式碼審查與重構 (移除重複程式碼、優化效能)
- [ ] T052 驗證 `specs/001-doit-dashboard/quickstart.md` 的所有步驟可正常執行
- [ ] T053 [P] 新增 JSDoc 註解到所有公開函式與元件
- [ ] T054 最終測試: 驗證所有使用者故事的驗收情境

---

## 相依性與執行順序

### 階段相依性

- **環境設定 (階段 1)**: 無相依性 - 可立即開始
- **資料層建置 (階段 2)**: 相依於階段 1 完成 - **阻塞所有使用者故事**
- **使用者故事 (階段 3-7)**: 所有相依於階段 2 完成
  - 使用者故事可平行進行 (若有足夠人力)
  - 或依優先順序循序執行 (P1 → P2 → P3)
- **優化 (階段 8)**: 相依於所有期望的使用者故事完成

### 使用者故事相依性

- **使用者故事 1 (P1)**: 階段 2 完成後即可開始 - 無其他故事相依性
- **使用者故事 2 (P1)**: 階段 2 完成後即可開始 - 與 US1 整合但應可獨立測試
- **使用者故事 3 (P2)**: 階段 2 完成後即可開始 - 可能與 US1 整合但應可獨立測試
- **使用者故事 4 (P2)**: 階段 2 完成後即可開始 - 可能與 US1 整合但應可獨立測試
- **使用者故事 5 (P3)**: 階段 2 完成後即可開始 - 可能與 US1/US2 整合但應可獨立測試

### 故事內執行順序

- 工具函式優先於服務層
- 服務層優先於元件
- 基礎元件優先於容器元件
- 核心實作優先於整合
- 故事完成後再進入下一個優先級

### 平行執行機會

- 階段 1 所有標記 [P] 的任務可平行執行
- 階段 2 所有標記 [P] 的任務可平行執行 (在階段 2 內)
- 階段 2 完成後,所有使用者故事可平行開始 (若團隊人力允許)
- 每個使用者故事內,標記 [P] 的任務可平行執行
- 不同使用者故事可由不同團隊成員平行處理

---

## 平行執行範例: 使用者故事 1

```bash
# 同時啟動使用者故事 1 的所有工具函式:
Task T016: "在 src/utils/date-utils.ts 建立日期工具函式"
Task T017: "在 src/utils/validation.ts 建立驗證函式"

# 驗證 UI 元件 (可同時進行):
Task T019: "驗證 shadcn/ui Card 元件"
Task T020: "驗證 shadcn/ui ScrollArea 元件"
```

---

## 實作策略

### MVP 優先 (僅使用者故事 1 + 2)

1. 完成階段 1: 環境設定
2. 完成階段 2: 資料層建置 (**關鍵 - 阻塞所有故事**)
3. 完成階段 3: 使用者故事 1 (檢視儀表板)
4. 完成階段 4: 使用者故事 2 (新增目標)
5. **停止並驗證**: 獨立測試 US1 + US2
6. 若就緒則部署/展示

### 漸進式交付

1. 完成環境設定 + 資料層建置 → 基礎就緒
2. 新增使用者故事 1 → 獨立測試 → 部署/展示 (基礎 MVP!)
3. 新增使用者故事 2 → 獨立測試 → 部署/展示 (完整 MVP!)
4. 新增使用者故事 3 → 獨立測試 → 部署/展示
5. 新增使用者故事 4 → 獨立測試 → 部署/展示
6. 新增使用者故事 5 → 獨立測試 → 部署/展示
7. 每個故事都增加價值且不破壞先前故事

### 平行團隊策略

若有多位開發者:

1. 團隊共同完成環境設定 + 資料層建置
2. 資料層建置完成後:
   - 開發者 A: 使用者故事 1 + 2 (P1 - MVP 核心)
   - 開發者 B: 使用者故事 3 + 4 (P2)
   - 開發者 C: 使用者故事 5 (P3)
3. 各故事獨立完成並整合

---

## 注意事項

- [P] 任務 = 不同檔案、無相依性
- [Story] 標籤將任務對應到特定使用者故事以便追蹤
- 每個使用者故事應可獨立完成與測試
- 在每個檢查點停止以獨立驗證故事
- 避免: 模糊任務、同檔案衝突、破壞獨立性的跨故事相依性
- 每個任務或邏輯群組完成後提交程式碼
