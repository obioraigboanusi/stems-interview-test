import '~/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PrivyProvider } from '@privy-io/react-auth';
import FirebaseAuthProvider from '@utils/firebase';
import { trpc } from '@utils/trpc';
import type { AppLayoutProps, AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App({ Component, pageProps }: AppLayoutProps) {
  useEffect(() => {
    localStorage.setItem('redirect', window.location.pathname);
  }, []);
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <>
      <Head>
        <title>Stems | Creating Music Reimagined</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <FirebaseAuthProvider>
        <PrivyProvider appId={'clehx6q490012me099y255rei'}>
          {getLayout(<Component {...pageProps} />)}
        </PrivyProvider>
      </FirebaseAuthProvider>
      <Toaster />
    </>
  );
}

export default trpc.withTRPC(App);
