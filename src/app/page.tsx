import { GoalDashboard } from "@/components/dashboard/goal-dashboard";
import {
  getCurrentGoals,
  getCompletedGoals,
} from "@/services/goals/goal-service";

export default async function Home() {
  const [currentGoals, completedGoals] = await Promise.all([
    getCurrentGoals(),
    getCompletedGoals(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8 h-screen">
      <GoalDashboard
        currentGoals={currentGoals}
        completedGoals={completedGoals}
      />
    </main>
  );
}
