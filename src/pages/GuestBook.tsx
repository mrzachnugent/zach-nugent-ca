import React from 'react';
import { auth, signIn, signOut } from '../firebase';

export const GuestBook: React.FC = () => {
  if (!auth.currentUser) {
    return (
      <>
        <button className='btn btn-primary' onClick={signIn('github')}>
          SIGN IN with Github
        </button>
        <button className='btn btn-secondary' onClick={signIn('google')}>
          SIGN IN with Google
        </button>
      </>
    );
  }
  return (
    <>
      <h1>GUEST BOOK</h1> <button onClick={signOut}>SIGN OUT</button>
    </>
  );
};
