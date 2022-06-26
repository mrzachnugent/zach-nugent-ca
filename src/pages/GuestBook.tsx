import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { auth, ProviderOptions, signIn, signOut } from '../firebase';

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export const GuestBook: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  onAuthStateChanged(auth, function (user) {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const handleSignIn = (provider: ProviderOptions) => async () => {
    const result = await signIn(provider);
    setUser(result.result.user);
  };
  const handleSignOut = async () => {
    const result = await signOut();
    setUser(null);
  };
  return (
    <>
      <Header
        avatarSrc={user?.photoURL || undefined}
        onLogOut={handleSignOut}
      />
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
            <h1 className='text-5xl font-bold text-primary-content'>
              Guest book
            </h1>
            {!user ? (
              <>
                <p className='py-6 text-slate-200'>
                  Who was here? Sign in to see and to sign your name
                </p>

                <button
                  className='btn btn-primary'
                  onClick={handleSignIn('github')}
                >
                  SIGN IN with Github
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={handleSignIn('google')}
                >
                  SIGN IN with Google
                </button>
              </>
            ) : (
              <button className='btn btn-warning mt-6' onClick={handleSignOut}>
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
