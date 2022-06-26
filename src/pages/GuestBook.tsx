import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { auth, signIn, signOut } from '../firebase';

export const GuestBook: React.FC = () => {
  return (
    <>
      <Header />
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
            <h1 className='text-5xl font-bold text-primary-content'>
              Guest book
            </h1>
            <p className='py-6 text-slate-200'>
              Who was here? Sign in to see and to sign your name
            </p>
            {!auth.currentUser ? (
              <>
                <button className='btn btn-primary' onClick={signIn('github')}>
                  SIGN IN with Github
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={signIn('google')}
                >
                  SIGN IN with Google
                </button>
              </>
            ) : (
              <>
                <h1>GUEST BOOK</h1> <button onClick={signOut}>SIGN OUT</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
