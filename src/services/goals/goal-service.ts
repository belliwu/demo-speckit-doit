"use server";

import { goalRepository } from "@/model/repositories/goal-repository";
import { CreateGoalInput } from "@/types/goal";
import { revalidatePath } from "next/cache";

/**
 * 目標服務層
 * 處理業務邏輯和資料操作
 */

/**
 * 取得所有目標
 */
export async function getAllGoals() {
  return await goalRepository.findAll();
}

/**
 * 取得目前進行中的目標
 */
export async function getCurrentGoals() {
  return await goalRepository.findCurrent();
}

/**
 * 取得已完成的目標
 */
export async function getCompletedGoals() {
  return await goalRepository.findCompleted();
}

/**
 * 建立新目標
 */
export async function createGoal(input: CreateGoalInput) {
  const goal = await goalRepository.create(input);
  revalidatePath("/");
  return goal;
}

/**
 * 切換目標完成狀態
 */
export async function toggleGoalCompletion(id: string) {
  const goal = await goalRepository.toggleCompletion(id);
  revalidatePath("/");
  return goal;
}

/**
 * 刪除目標
 */
export async function deleteGoal(id: string) {
  await goalRepository.delete(id);
  revalidatePath("/");
}
