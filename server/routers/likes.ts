import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const likesRouter = router({
  update: protectedProcedure
    .input(
      z.object({
        track: z.string(),
        likeStatus: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user, prisma } = ctx;
      try {
        const likeStatus = await prisma.userLikes.upsert({
          where: {
            userId_trackId: {
              trackId: input.track,
              userId: user.uid,
            },
          },
          update: {
            active: input.likeStatus,
            timestamp: new Date().toISOString(),
          },
          create: {
            userId: user.uid,
            trackId: input.track,
            active: input.likeStatus,
          },
          select: {
            userId: true,
            trackId: true,
            active: true,
            timestamp: true,
          },
        });

        if (likeStatus) {
          const track = await prisma.track.update({
            where: { uid: input.track },
            data: {
              points: { increment: likeStatus.active ? 10 : -10 },
            },
          });
        }
        return likeStatus;
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not complete transaction. Please try again later",
        });
      }
    }),
});
