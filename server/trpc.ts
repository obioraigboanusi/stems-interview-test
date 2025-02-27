import { Context } from './context';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const middleware = t.middleware;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 */
export const protectedProcedure = t.procedure.use(isAuthed);
