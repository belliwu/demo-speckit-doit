"use client";

import { Goal as PrismaGoal } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, CheckCircle2 } from "lucide-react";
import {
  getDaysRemaining,
  isExpiringSoon,
  isExpired,
  formatDate,
} from "@/utils/date-utils";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: PrismaGoal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GoalCard({ goal, onToggle, onDelete }: GoalCardProps) {
  const daysRemaining = getDaysRemaining(goal.endDate);
  const isExpiring = isExpiringSoon(goal.endDate);
  const hasExpired = isExpired(goal.endDate);
  const isUrgent = isExpiring || hasExpired;

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        isUrgent &&
          !goal.isCompleted &&
          "border-destructive/50 bg-destructive/5",
        goal.isCompleted && "opacity-75"
      )}
    >
      <div className="flex items-start gap-3">
        {/* 完成核取方塊 */}
        <div className="mt-1">
          <Checkbox
            checked={goal.isCompleted}
            onCheckedChange={() => onToggle(goal.id)}
            className={cn(
              "transition-colors",
              goal.isCompleted && "bg-accent border-accent"
            )}
          />
        </div>

        {/* 目標內容 */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "text-sm font-medium leading-relaxed break-words",
              goal.isCompleted && "line-through text-muted-foreground"
            )}
          >
            {goal.title}
          </h3>

          {/* 日期資訊 */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {!goal.isCompleted ? (
              <>
                {/* 剩餘天數 */}
                <div
                  className={cn(
                    "flex items-center gap-1",
                    isUrgent && "text-destructive font-medium"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  <span>
                    {hasExpired
                      ? `已過期 ${Math.abs(daysRemaining)} 天`
                      : daysRemaining === 0
                      ? "今天到期"
                      : `剩餘 ${daysRemaining} 天`}
                  </span>
                </div>
                {/* 結束日期 */}
                <span className="text-muted-foreground">
                  截止: {formatDate(goal.endDate, "MM/dd")}
                </span>
              </>
            ) : (
              <>
                {/* 已完成標記 */}
                <div className="flex items-center gap-1 text-accent">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>已完成</span>
                </div>
                {/* 完成日期 */}
                {goal.completedAt && (
                  <span className="text-muted-foreground">
                    {formatDate(goal.completedAt, "MM/dd")}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* 刪除按鈕 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(goal.id)}
          className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
          title="刪除目標"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* 即將到期警告標記 */}
      {isUrgent && !goal.isCompleted && (
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-destructive animate-pulse" />
      )}
    </div>
  );
}
