/*
  Warnings:

  - A unique constraint covering the columns `[userId,trackId]` on the table `UserLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLikes_userId_trackId_key" ON "UserLikes"("userId", "trackId");
