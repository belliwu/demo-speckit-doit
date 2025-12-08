-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "endDate" DATETIME NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME
);

-- CreateIndex
CREATE INDEX "Goal_isCompleted_idx" ON "Goal"("isCompleted");

-- CreateIndex
CREATE INDEX "Goal_createdAt_idx" ON "Goal"("createdAt");

-- CreateIndex
CREATE INDEX "Goal_completedAt_idx" ON "Goal"("completedAt");
