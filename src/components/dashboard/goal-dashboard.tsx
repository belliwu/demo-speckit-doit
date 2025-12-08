"use client";

import { Goal as PrismaGoal } from "@prisma/client";
import { GoalColumn } from "./goal-column";
import { AddGoalModal } from "./add-goal-modal";
import {
  toggleGoalCompletion,
  deleteGoal,
} from "@/services/goals/goal-service";
import { useRouter } from "next/navigation";

interface GoalDashboardProps {
  currentGoals: PrismaGoal[];
  completedGoals: PrismaGoal[];
}

export function GoalDashboard({
  currentGoals,
  completedGoals,
}: GoalDashboardProps) {
  const router = useRouter();

  const handleToggle = async (id: string) => {
    try {
      await toggleGoalCompletion(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to toggle goal:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("確定要刪除這個目標嗎？此操作無法復原。")) {
      try {
        await deleteGoal(id);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete goal:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 標題與新增按鈕 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doit</h1>
          <p className="text-muted-foreground mt-1">追蹤你的目標，掌握每一天</p>
        </div>
        <AddGoalModal />
      </div>

      {/* 兩欄式佈局 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <GoalColumn
          title="目前目標"
          goals={currentGoals}
          emptyMessage="目前沒有進行中的目標，點擊上方按鈕新增一個吧！"
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <GoalColumn
          title="已完成目標"
          goals={completedGoals}
          emptyMessage="尚未完成任何目標，加油！"
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
