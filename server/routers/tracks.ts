import { Track } from "@prisma/client";
import { TrackService } from "@server/services/tracks";
import { protectedProcedure, publicProcedure, router } from "@server/trpc";
import trpc, { TRPCError } from "@trpc/server";
import { z } from "zod";

export type RaceTrack = {
  name: string;
  songUrl: string;
  id: string;
  artist: string;
  liked: boolean;
  isInspiration: boolean;
  isDemo?: boolean;
  percentage?: number;
  isWinning?: boolean;
};
export const tracksRouter = router({
  getTracks: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { prisma, user } = ctx;

    try {
      const race = await prisma.race.findUnique({
        where: {
          uid: input,
        },
        select: {
          isExpired: true,
        },
      });
      if (!race?.isExpired) {
        const tracksQuery: any = await prisma.race.findFirst({
          where: {
            uid: input,
          },
          select: {
            isExpired: true,
            Track: {
              select: {
                name: true,
                songUrl: true,
                uid: true,
                artist: true,
                isInspiration: true,
                isWinning: true,
                uploaded_at: true,
                points: true,
                UserLikes: {
                  where: {
                    userId: user?.uid,
                    active: true,
                  },
                  select: {
                    active: true,
                  },
                  take: 1,
                },
              },
            },
          },
        });
        return TrackService.refineTracks(tracksQuery?.Track);
      } else {
        const votersCount = (
          await prisma.userLikes.groupBy({
            by: ["userId"],
            where: {
              raceId: input,
              OR: [{ hidden: true }, { active: true }],
            },
            _count: {
              userId: true,
            },
          })
        )?.length;

        const tracksQuery: any = await prisma.race.findFirst({
          where: {
            uid: input,
          },
          select: {
            isExpired: true,
            Track: {
              select: {
                name: true,
                uploaded_at: true,
                songUrl: true,
                uid: true,
                artist: true,
                isInspiration: true,
                isWinning: true,
                points: true,
                UserLikes: {
                  where: {
                    OR: [{ active: true }],
                  },
                  select: {
                    active: true,
                    userId: true,
                  },
                },
              },
            },
          },
        });

        return tracksQuery.Track.map((track: any) => {
          return {
            name: track.name,
            url: track.songUrl,
            id: track.uid,
            artist: track.artist ?? "",
            isInspiration: track.isInspiration,
            isWinning: track.isWinning,
            points: track.points,
            uploaded_at: track.uploaded_at,
            liked:
              track?.UserLikes?.find((like: any) => like.userId == user?.uid)
                ?.active ?? false,
            percentage: Math.round(
              ((track.UserLikes?.length || 0) / (votersCount || 1)) * 100
            ),
          };
        })?.sort((a: any, b: any) => {
          if (a.isInspiration && !b.isInspiration) {
            return -1; // a should come before b
          } else if (!a.isInspiration && b.isInspiration) {
            return 1; // a should come after b
          } else if (a.isInspiration && b.isInspiration) {
            return a.isWinning ? -1 : 1; // a should come before b
          } else {
            return b.percentage - a.percentage;
          }
        });
      }
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not complete transaction. Please try again later",
      });
    }
  }),
  getArtistSubmissionsTracks: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const { prisma, user } = ctx;

      try {
        const tracksQuery: any = await prisma.artistSubmissions.findFirst({
          where: {
            uid: input,
          },
          // select: {
          //   Track: {
          //     select: {
          //       name: true,
          //       songUrl: true,
          //       uid: true,
          //       artist: true,
          //       isInspiration: true,
          //       isDemo: true,
          //       points: true,
          //       uploaded_at: true,
          //       UserLikes: {
          //         where: {
          //           userId: user?.uid,
          //           active: true,
          //         },
          //         select: {
          //           active: true,
          //         },
          //         take: 1,
          //       },
          //     },
          //     orderBy: {
          //       points: "desc",
          //     },
          //   },
          // },
        });

        return TrackService.refineTracks(tracksQuery?.Track);
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
  submitTrack: protectedProcedure
    .input(
      z.object({
        raceId: z.string().optional(),
        artistSubmissionId: z.string().optional(),
        artist: z.string().optional(),
        collaborators: z
          .array(
            z.object({
              name: z.string(),
              phoneNumber: z.string().min(10).max(14),
            })
          )
          .optional(),
        name: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      try {
        if (!input.raceId && !input.artistSubmissionId)
          throw new TRPCError({ code: "BAD_REQUEST" });
        const track: any = await prisma.track.create({
          data: {
            name: input.name,
            artist: input.artist,
            raceId: input.raceId,
            artistSubmissionId: input.artistSubmissionId,
            userId: ctx.user.uid,
            songUrl: input.url,
            collaborators: {
              create: input.collaborators,
            },
          },
          include: {
            collaborators: true,
          },
        });

        return {
          id: track.uid,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
  createOffer: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        description: z.string().optional(),
        name: z.string(),
        phoneNumber: z.string().min(10).max(14),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      try {
        const offer: any = await prisma.offer.create({
          data: {
            trackId: input.trackId,
            name: input.name,
            phoneNumber: input.phoneNumber,
            description: input.description,
            userId: input.userId,
          },
        });
        await prisma.track.update({
          where: {
            uid: input.trackId,
          },
          data: {
            offers: {
              connectOrCreate: {
                where: { id: offer.id },
                create: {
                  name: input.name,
                  phoneNumber: input.phoneNumber,
                  description: input.description,
                  userId: input.userId,
                },
              },
            },
          },
          include: {
            offers: true,
          },
        });

        await prisma.track.update({
          where: {
            uid: input.trackId,
          },
          data: {
            offers: {
              connectOrCreate: {
                where: { id: offer.id },
                create: {
                  name: input.name,
                  phoneNumber: input.phoneNumber,
                  description: input.description,
                  userId: input.userId,
                },
              },
            },
          },
          include: {
            offers: true,
          },
        });

        return {
          id: offer.id,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
  share: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      try {
        const userShare = await prisma.userShares.findFirst({
          where: {
            trackId: input.trackId,
            userId: user?.uid,
          },
        });
        if (!userShare) {
          let newUserShare = await prisma.userShares.create({
            data: {
              trackId: input.trackId,
              userId: user?.uid,
            },
          });

          await prisma.track.update({
            where: {
              uid: input.trackId,
            },
            data: {
              UserShares: {
                connect: {
                  id: newUserShare.id,
                },
              },
              points: {
                increment: 50,
              },
            },
          });
        }
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
  updatePlayedTime: protectedProcedure
    .input(
      z.object({
        trackId: z.string(),
        playedTime: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      try {
        const track = await prisma.track.findUnique({
          where: { uid: input.trackId },
          select: { playedTime: true },
        });
        let remainedSeconds = (track?.playedTime || 0) % 10;

        let points = Math.floor((remainedSeconds + input.playedTime) / 10);
        let userPlaytime = await prisma.userPlayTime.upsert({
          where: {
            userId_trackId: {
              trackId: input.trackId,
              userId: user.uid,
            },
          },
          create: {
            trackId: input.trackId,
            userId: user.uid,
            playTime: input.playedTime,
          },
          update: {
            playTime: { increment: input.playedTime },
          },
        });
    
        await prisma.track.update({
          where: {
            uid: input.trackId,
          },
          data: {
            playedTime: { increment: input.playedTime },
            UserPlayTime: {
              connect: {
                id: userPlaytime.id,
              },
            },
            points: {
              increment: points,
            },
          },
        });
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
});
