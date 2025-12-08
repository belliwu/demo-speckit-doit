# 快速入門：Doit Dashboard

## 前置需求

- Node.js 20+
- npm / yarn / pnpm

## 設定步驟

1.  **安裝依賴套件**:

    ```bash
    npm install
    # 安裝 Next.js, React, Tailwind, shadcn/ui 相關依賴
    ```

2.  **初始化 shadcn/ui** (若尚未初始化):

    ```bash
    npx shadcn@latest init
    ```

3.  **新增元件**:
    ```bash
    npx shadcn@latest add button card input calendar popover checkbox dialog scroll-area
    ```

## 執行專案

1.  **啟動開發伺服器**:
    ```bash
    npm run dev
    ```
2.  **開啟瀏覽器**:
    前往 `http://localhost:3000`

## 使用說明

- **新增目標**: 點擊「新增目標 (Add Goal)」，輸入標題與日期。
- **完成目標**: 勾選目標上的核取方塊。
- **刪除目標**: 點擊垃圾桶圖示。
- **檢視**: 即將到期的目標會以粉彩色系高亮顯示。
