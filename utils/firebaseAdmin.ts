import {
  initializeApp,
  AppOptions,
  getApps,
  App,
  applicationDefault,
  cert,
} from 'firebase-admin/app';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { NextApiRequest } from 'next/types';
import nookies from 'nookies';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
};

const firebaseAdminConfig: AppOptions = {
  credential: cert(serviceAccount),
};

let app: App;

if (getApps().length < 1) {
  app = initializeApp(firebaseAdminConfig);
}

app = getApps()[0];
export default app;
export const auth = getAuth(app);

export const getUser = async (req: Partial<NextApiRequest>) => {
  let user: UserRecord | undefined = undefined;
  const cookies = nookies.get({ req });

  if (!cookies.__session) {
    return undefined;
  }

  try {
    const token = await auth.verifyIdToken(cookies.__session);
    const firebaseUser = await auth.getUser(token.uid);
    user = firebaseUser;
    return user;
  } catch (err) {}

  return undefined;
};
