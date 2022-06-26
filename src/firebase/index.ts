// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as signFirebaseUserOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Analytics Firebase
const analytics = getAnalytics(app);
// Authenticatoni Firebase
export const auth = getAuth(app);

const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

export type ProviderOptions = keyof typeof providers;

export const signIn = async (provider: ProviderOptions) => {
  try {
    const result = await signInWithPopup(auth, providers[provider]);
    const credential =
      provider === 'github'
        ? GithubAuthProvider.credentialFromResult(result)
        : provider === 'google'
        ? GoogleAuthProvider.credentialFromResult(result)
        : undefined;
    const token = credential?.accessToken;
    const user = result.user;

    return {
      result: {
        user,
        token,
        credential,
      },
      error: {
        code: null,
        message: null,
      },
    };
  } catch (error) {
    if (!(error instanceof FirebaseError))
      return {
        result: {
          user: null,
          token: null,
          credential: null,
        },
        error: {
          code: '69420',
          message: 'Unknown error has occured',
        },
      };

    return {
      result: {
        user: null,
        token: null,
        credential:
          provider === 'github'
            ? GithubAuthProvider.credentialFromError(error)
            : provider === 'google'
            ? GoogleAuthProvider.credentialFromError(error)
            : null,
      },
      error: {
        code: error.code,
        message: error.message,
      },
    };
  }
};

export const signOut = () => signFirebaseUserOut(auth);
