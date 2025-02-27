-- AlterTable
ALTER TABLE "UserLikes" ADD COLUMN     "raceId" TEXT;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "UserLikes_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
