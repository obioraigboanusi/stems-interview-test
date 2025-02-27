-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_raceId_fkey";

-- DropForeignKey
ALTER TABLE "UserLikes" DROP CONSTRAINT "UserLikes_trackId_fkey";

-- AlterTable
ALTER TABLE "Track" ALTER COLUMN "raceId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserLikes" ALTER COLUMN "trackId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikes" ADD CONSTRAINT "UserLikes_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
