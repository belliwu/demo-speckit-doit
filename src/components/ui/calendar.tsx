"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { zhTW } from "date-fns/locale";

import { cn } from "@/utils/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={zhTW}
      weekStartsOn={1} // 以星期一為一週開始
      showOutsideDays={showOutsideDays}
      // 外框大小與卡片感
      className={cn(
        "rounded-2xl border bg-card p-4 shadow-lg text-base",
        className
      )}
      classNames={{
        // 只調整排版間距，不動 table 結構
        months: "flex flex-col space-y-4",
        month: "space-y-2",

        // 標題列（2025年12月）
        caption: "flex items-center justify-center relative mb-2",
        caption_label: "text-base font-semibold",

        // 上一月 / 下一月 按鈕
        nav: "flex items-center gap-1",
        nav_button:
          "inline-flex h-8 w-8 items-center justify-center rounded-full border border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",

        // ⭐ 關鍵：保留 table 佈局，只加上細部樣式，完全不改 display
        table: "border-collapse",
        head_row: "", // 讓 <tr> 維持 table-row
        head_cell:
          "pb-1 text-xs text-muted-foreground text-center font-medium tracking-wide",

        row: "", // 讓 <tr> 維持 table-row
        cell: "p-0 text-center align-middle",

        // 日期按鈕：圓形、hover 有背景色
        day:
          "mx-auto h-8 w-8 rounded-full text-sm " +
          "hover:bg-accent hover:text-accent-foreground " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",

        // 今日：加框線
        day_today: "border border-primary",

        // 已選取日期
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",

        // 月外日期 / disabled 狀態
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",

        // 隱藏的日期
        day_hidden: "invisible",
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
