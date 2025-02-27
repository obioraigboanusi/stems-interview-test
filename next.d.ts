import { PrismaClient } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';
import type { AppProps } from 'next/app';
import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next/types';
import { ReactNode } from 'react';

declare module 'next/types' {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };

  type NextLayoutPage<P = {}> = NextComponentType<NextPageContext, any, P> & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType;
  };
}

declare global {
  namespace globalThis {
    var prisma: PrismaClient;
    var supabase: SupabaseClient;
  }
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    captchaWidgetId: any;
    grecaptcha: any;
    tracks: any;
    trackPeaks: any;
    trackDurations: any;
  }
}
