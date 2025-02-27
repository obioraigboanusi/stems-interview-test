import * as trpc from '@trpc/server';
import { publicProcedure, router } from './trpc';
import { likesRouter } from './routers/likes';
import { raceRouter } from './routers/races';
import { artistSubmissionsRouter } from './routers/artistsSubmissions';
import { tracksRouter } from './routers/tracks';
import { usersRouter } from './routers/users';
// import { claimRouter } from './routers/claim';

export const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  users: usersRouter,
  likes: likesRouter,
  tracks: tracksRouter,
  race: raceRouter,
  artistSubmissions: artistSubmissionsRouter,
  // claims: claimRouter
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
