import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, publicProcedure, router } from '@server/trpc';

export const usersRouter = router({
  createUser: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        walletAddress: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user, prisma } = ctx;
      try {
        const prismaUser = await prisma.user.findUnique({
          where: {
            username: input.username,
          },
          select: {
            auth_id: true,
          },
        });

        if (prismaUser) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Username is already in use. Please select another.',
          });
        }

        await prisma.user.upsert({
          where: {
            auth_id: user.uid,
          },
          create: {
            auth_id: user.uid,
            username: input.username,
            phone: user.phoneNumber,
          },
          update: {
            username: input.username,
          },
        });
      } catch (e) {
        console.log('Error creating a user: ', e);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Could not complete the request at this time. Please try again later',
        });
      }
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, user } = ctx;

    try {
      const prismaUser = await prisma.user.findUnique({
        where: {
          auth_id: user.uid,
        },
        select: {
          username: true,
          phone: true
        },
      });

      return prismaUser;
    } catch (e) {
      console.log('Error fetching user: ', e);
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Could not find user.',
      });
    }
  }),
});
