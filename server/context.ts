import { PrismaClient } from '@prisma/client';
import { initTRPC, type inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { auth } from '@utils/firebaseAdmin';
import { UserRecord } from 'firebase-admin/auth';
import nookies from 'nookies';

const cookieKey = process.env.SUPABASE_COOKIE_KEY!;

export const prisma = new PrismaClient();

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = 'hello';

  const { req } = opts;
  let user: UserRecord | undefined = undefined;

  try {
    const cookies = nookies.get({ req });
    const token = await auth.verifyIdToken(cookies.__session);
    const firebaseUser = await auth.getUser(token.uid);
    user = firebaseUser;
  } catch (err) {
    console.log('Error found in context', err);
  }

  return {
    session,
    prisma,
    user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
