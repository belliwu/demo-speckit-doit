import { prisma } from "../prisma-client";
import { CreateGoalInput, UpdateGoalInput } from "@/types/goal";

/**
 * 目標資料存取層 (Repository Pattern)
 * 封裝所有與資料庫的互動邏輯
 */
export class GoalRepository {
  /**
   * 取得所有目標
   */
  async findAll() {
    return await prisma.goal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * 取得目前進行中的目標
   */
  async findCurrent() {
    return await prisma.goal.findMany({
      where: {
        isCompleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * 取得已完成的目標
   */
  async findCompleted() {
    return await prisma.goal.findMany({
      where: {
        isCompleted: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    });
  }

  /**
   * 根據 ID 取得單一目標
   */
  async findById(id: string) {
    return await prisma.goal.findUnique({
      where: { id },
    });
  }

  /**
   * 建立新目標
   */
  async create(input: CreateGoalInput) {
    return await prisma.goal.create({
      data: {
        title: input.title,
        endDate: input.endDate,
      },
    });
  }

  /**
   * 更新目標
   */
  async update(id: string, input: UpdateGoalInput) {
    return await prisma.goal.update({
      where: { id },
      data: input,
    });
  }

  /**
   * 刪除目標
   */
  async delete(id: string) {
    return await prisma.goal.delete({
      where: { id },
    });
  }

  /**
   * 切換目標完成狀態
   */
  async toggleCompletion(id: string) {
    const goal = await this.findById(id);
    if (!goal) throw new Error("Goal not found");

    return await this.update(id, {
      isCompleted: !goal.isCompleted,
      completedAt: !goal.isCompleted ? new Date() : null,
    });
  }
}

// 匯出單例實例
export const goalRepository = new GoalRepository();
