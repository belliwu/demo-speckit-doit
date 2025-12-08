"use client";

import { Goal as PrismaGoal } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoalCard } from "./goal-card";

interface GoalColumnProps {
  title: string;
  goals: PrismaGoal[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GoalColumn({
  title,
  goals,
  emptyMessage,
  onToggle,
  onDelete,
}: GoalColumnProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {goals.length} 個目標
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-0 pb-4">
        <ScrollArea className="h-[calc(100vh-250px)]">
          {goals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-3">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground max-w-[200px]">
                {emptyMessage}
              </p>
            </div>
          ) : (
            <div className="space-y-3 pr-4">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
