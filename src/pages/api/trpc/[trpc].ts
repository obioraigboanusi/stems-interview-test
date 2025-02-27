// import * as trpcNext from '@trpc/server/adapters/next';
// import { appRouter } from '@server/_app';
// import { createContext } from '@server/context';
// // export API handler
// // @see https://trpc.io/docs/api-handler
// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: createContext,
// });

import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@server/_app";
import { createContext } from "@server/context";
import type { NextApiRequest, NextApiResponse } from 'next/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  try {
    await createNextApiHandler({
      router: appRouter,
      createContext,
      onError: ({ error, type, path, input, ctx, req }) => {
        console.error('tRPC error:', { error, type, path, input });
      },
    })(req, res);
  } catch (error) {
    console.error('Unhandled error in tRPC handler:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) });
  }
};

export default handler;
