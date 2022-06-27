import React, { FC, useEffect, useMemo, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Spacer } from '../components/Spacer';
import { auth, signOut, db } from '../firebase';
import {
  useAuthState,
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { collection, addDoc } from 'firebase/firestore';

const TOPICS = ['computer', 'gaming', 'music', 'wallpaper', 'cars', 'racing'];

const getRandomTopic = () => TOPICS[Math.floor(Math.random() * TOPICS.length)];

const range = (num: number) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(1);
  }
  return result;
};

const Star = ({
  disabled = false,
  onClick,
  className,
  checked = true,
  isLarge = false,
}: {
  disabled?: boolean;
  onClick?(): void;
  className?: string;
  checked?: boolean;
  isLarge?: boolean;
}) => (
  <button
    className={
      disabled
        ? 'btn-disabled text-primary ' + className
        : 'btn btn-ghost ' + className
    }
    disabled={disabled}
    onClick={onClick}
  >
    <svg
      stroke='currentColor'
      fill={checked ? '#ebe500' : 'current'}
      className='inline-block'
      strokeWidth='0'
      viewBox='0 0 1024 1024'
      height={isLarge ? '2.5em' : '1.5em'}
      width={isLarge ? '2.5em' : '1.5em'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'></path>
    </svg>
  </button>
);

export const GuestBook: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [hasSigned, setHasSigned] = useState(true);

  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [value, loadingSignatures, errorSignature] = useCollection(
    collection(db, 'guest-book-signatures')
  );

  useEffect(() => {
    setHasSigned(
      !!value?.docs.some((doc) => doc.data().user.uid === user?.uid)
    );
  }, [value]);

  const randomTopic = useMemo(() => {
    return getRandomTopic();
  }, []);

  async function handleSignOut() {
    await signOut();
  }

  const handleAssignStars = (index: number) => () => {
    setRating(index + 1);
  };

  async function handleSignGuestBook() {
    setHasSigned(true);
    try {
      await addDoc(collection(db, 'guest-book-signatures'), {
        user: {
          uid: user?.uid,
          photoURL: user?.photoURL,
          displayName: user?.displayName,
        },
        message,
        rating,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  if (loadingAuth || loadingSignatures) return <div>Loading...</div>;

  return (
    <>
      <Header
        avatarSrc={user?.photoURL || undefined}
        onLogOut={handleSignOut}
        name={user?.displayName}
      />
      {!user ? (
        <div className='hero min-h-screen bg-base-200'>
          <h1 className='text-5xl font-bold text-primary-content'>
            Guest book
          </h1>
          <div className='hero-content text-center'>
            <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
              <>
                <p className='py-6 text-slate-200'>
                  Who was here? Sign in to see and to sign your name
                </p>

                <div>
                  <GithubLogInButton />
                  <GoogleLogInButton />
                </div>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className='pt-20 min-h-screen bg-base-200 flex flex-col items-center'>
          <Spacer height={24} />
          <h1 className='text-5xl font-bold text-primary-content'>
            Guest book
          </h1>
          <Spacer height={24} />
          <p>Cheers 🍺</p>
          {!!value?.docs.some((doc) => doc.data().user.uid === user?.uid) && (
            <>
              <Spacer height={24} />
              <div className='max-w-3xl w-full flex flex-col items-center relative'>
                <textarea
                  className='textarea textarea-info max-w-3xl bg-base-200 h-36 text-lg text-primary-content p-2'
                  style={{ width: 'calc(100% - 2em)', resize: 'none' }}
                  placeholder='Leave a message at the beep. BEEP!'
                  autoFocus
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className='absolute bottom-4'>
                  {range(5).map((_, i) => (
                    <Star
                      className={i + 1 > rating ? 'opacity-30' : ''}
                      onClick={handleAssignStars(i)}
                    />
                  ))}
                </div>
              </div>
              <Spacer height={24} />
              <button
                className='btn btn-wide btn-info'
                onClick={handleSignGuestBook}
              >
                Submit
              </button>
            </>
          )}
          <Spacer height={48} />
          {value?.docs.map((msg, i) => (
            <>
              <div
                className='card card-side bg-base-100 shadow-xl max-w-3xl md:min-h-60 sm:min-h-10'
                style={{ width: 'calc(100% - 2em)' }}
              >
                <figure>
                  <img
                    src={`https://source.unsplash.com/random/400x400?sig=${
                      i + 1
                    }/?${randomTopic}`}
                    alt='random image'
                    className='h-full hidden sm:inline-block w-60'
                  />
                </figure>
                <div className='card-body px-10'>
                  {msg.data()?.message ? (
                    <p className='card-title text-primary-content'>
                      {msg.data().message}
                    </p>
                  ) : (
                    <>
                      <p></p>
                      <div>
                        {range(msg.data()?.rating).map(() => (
                          <Star disabled isLarge />
                        ))}
                      </div>
                      <Spacer height={4} />
                    </>
                  )}
                  <div className='card-actions justify-between items-center'>
                    {msg.data().message ? (
                      <div>
                        {range(msg.data()?.rating).map(() => (
                          <Star disabled />
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}
                    <div
                      className='tooltip'
                      data-tip={msg.data()?.user?.displayName || 'Anonymous'}
                    >
                      <img
                        src={msg.data()?.user?.photoURL}
                        className='w-14 rounded-full'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Spacer height={36} />
            </>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

const GithubLogInButton: FC = () => {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth);
  function handleSignIn() {
    signInWithGithub();
  }
  return (
    <button className='btn btn-primary' onClick={handleSignIn}>
      SIGN IN with Github
    </button>
  );
};

const GoogleLogInButton: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  function handleSignIn() {
    signInWithGoogle();
  }
  return (
    <button className='btn btn-secondary' onClick={handleSignIn}>
      SIGN IN with Google
    </button>
  );
};

const getRandomImage = () => 'https://picsum.photos/400/400';
