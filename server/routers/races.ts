import { publicProcedure, router } from '@server/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const raceRouter = router({
  getRace: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    try {
      const race = await prisma.race.findUnique({
        where: {
          uid: input,
        },
        select: {
          description: true,
          uid: true,
          published: true,
          launches_on: true,
          name: true,
          isExpired: true,
          RaceSocials: {
            select: {
              imageUrl: true,
              instagramUrl: true,
              twitterUrl: true,
              spotifyUrl: true,
            },
          },
          RaceResults: {
            select: {
              NftImageUrl: true,
              streamUrl: true,
              soundUrl: true,
              openSeaUrl: true,
              releasedSong: {
                select: {
                  name: true,
                  songUrl: true,
                  uid: true,
                  artist: true,
                },
              },
            },
          },
        },
      });

      const launches_on = race?.launches_on?.getTime();

      return {
        ...race,
        launches_on,
      };
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not complete transaction. Please try again later',
      });
    }
  }),
});
