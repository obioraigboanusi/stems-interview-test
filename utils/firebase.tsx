import { getApps, initializeApp } from 'firebase/app';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  User,
  getAuth,
  isSignInWithEmailLink,
  onIdTokenChanged,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth';
import nookies from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLO5rzidd006rdaf6o0-sUrwUyOanu3tQ',
  authDomain: 'stems-app-v2.firebaseapp.com',
  projectId: 'stems-app-v2',
  storageBucket: 'stems-app-v2.appspot.com',
  messagingSenderId: '1016993931776',
  appId: '1:1016993931776:web:576604b6be794686be2ee5',
  measurementId: 'G-G2N65K31KT',
};

// Initialize Firebase
const app = getApps().length < 1 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

interface ContextType {
  user: User | null;
  token: string | null;
  sendEmailVerificationLink: (email: string) => Promise<boolean>;
  signInWithLink: (location: string) => Promise<User | null>;
  signout: () => Promise<void>;
  requestOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
}
const authContextDefaultValue: ContextType = {
  user: null,
  token: null,
  sendEmailVerificationLink: () => Promise.reject('not implemented'),
  signInWithLink: () => Promise.reject('not implemented'),
  signout: () => Promise.reject('not implemented'),
  requestOTP: () => Promise.reject('not implemented'),
  verifyOTP: () => Promise.reject('not implemented'),
};

const authContext = createContext<ContextType>(authContextDefaultValue);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default FirebaseAuthProvider;

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `https://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFirebaseAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [token, setToken] = useState<string | null>(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const sendEmailVerificationLink = async (email: string): Promise<boolean> => {
    const url = getBaseUrl();

    return fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        redirect: `${url}/auth/verify-email`,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        localStorage.setItem('emailForLink', email);
        return res.success;
      })
      .catch(() => false);
  };

  const signInWithLink = async (location: string) => {
    if (isSignInWithEmailLink(auth, location)) {
      const email = localStorage.getItem('emailForLink') || '';
      try {
        const user = await signInWithEmailLink(auth, email, location);
        localStorage.removeItem('emailForLink');
        setUser(user.user);
        return user.user;
      } catch (e) {
        console.error(e);
        return null;
      }
    }

    return null;
  };

  const signout = async () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  const setupVerifier = () => {
    const verifier = new RecaptchaVerifier(
      'captchaContainer',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );

    window.recaptchaVerifier = verifier;
    return verifier;
  };

  const requestOTP = async (phoneNumber: string) => {
    setupVerifier();
    const appVerifier: RecaptchaVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      // save auth result
      window.confirmationResult = confirmationResult;
      return true;
    } catch (err) {
      if (window.captchaWidgetId) {
        window.grecaptcha.reset(window.captchaWidgetId);
      } else {
        window.recaptchaVerifier.render().then(function (widgetId: any) {
          window.captchaWidgetId = widgetId;
          window.grecaptcha.reset(widgetId);
        });
      }
      appVerifier.clear();
      return false;
    }
  };

  const verifyOTP = async (code: string) => {
    let confirmationResult: ConfirmationResult = window.confirmationResult;
    return confirmationResult
      .confirm(code)
      .then((result) => {
        setUser(result.user);
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setToken(token);
        nookies.set(undefined, '__session', token, { path: '/' });
      } else {
        setUser(null);
        setToken(null);
        nookies.set(undefined, '__session', '', { path: '/' });
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  // Return the user object and auth methods
  return {
    user,
    token,
    sendEmailVerificationLink,
    signInWithLink,
    signout,
    requestOTP,
    verifyOTP,
  };
}
