-- CreateTable
CREATE TABLE "RaceSocials" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT,
    "spotifyUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "raceId" TEXT NOT NULL,

    CONSTRAINT "RaceSocials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RaceSocials_raceId_key" ON "RaceSocials"("raceId");

-- AddForeignKey
ALTER TABLE "RaceSocials" ADD CONSTRAINT "RaceSocials_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
