import React, { FC, useMemo, useState } from 'react';
import {
  useAuthState,
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Spacer } from '../components/Spacer';
import { auth, db } from '../firebase';

import { addDoc, collection } from 'firebase/firestore';

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
    className={disabled ? className : 'btn btn-ghost ' + className}
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

  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [value, loadingSignatures, errorSignature] = useCollection(
    collection(db, 'guest-book-signatures')
  );

  const randomTopic = useMemo(() => {
    return getRandomTopic();
  }, []);

  const handleAssignStars = (index: number) => () => {
    setRating(index + 1);
  };

  async function handleSignGuestBook() {
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

  if (loadingAuth || loadingSignatures)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        Loading...
      </div>
    );

  return (
    <>
      {!user ? (
        <div className='hero min-h-screen'>
          <div className='hero-content text-center'>
            <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
              <h1 className='text-5xl font-bold text-primary-content'>
                Guest book
              </h1>
              <>
                <p className='py-6 text-slate-200'>
                  Who was here? Sign in to see and to sign your name
                </p>

                <div className='flex flex-col'>
                  <GithubLogInButton />
                  <Spacer height={14} />
                  <GoogleLogInButton />
                </div>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className='pt-20 min-h-screen bg-base-200 flex flex-col items-center w-full'>
          <Spacer height={24} />
          <h1 className='text-5xl font-bold text-primary-content'>
            Guest book
          </h1>
          <Spacer height={24} />
          <p>Cheers 🍺</p>
          {!value?.docs.some((doc) => doc.data().user.uid === user?.uid) && (
            <>
              <Spacer height={24} />
              <div className='max-w-2xl w-full flex flex-col items-center relative'>
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
                className='card card-side bg-base-100 shadow-xl max-w-2xl md:min-h-16 sm:min-h-10'
                style={{ width: 'calc(100% - 2em)' }}
              >
                <figure>
                  <img
                    src={`https://source.unsplash.com/random/400x400/?${randomTopic}?sig=${
                      i + 1
                    }`}
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
    </>
  );
};

const GithubLogInButton: FC = () => {
  const [signInWithGithub, user, loading, error] = useSignInWithGithub(auth);
  function handleSignIn() {
    signInWithGithub();
  }
  return (
    <button
      className='btn-login relative rounded-md bg-black text-white hover:opacity-90'
      onClick={handleSignIn}
    >
      <span className='absolute left-4'>
        <svg
          stroke='currentColor'
          fill='white'
          stroke-width='0'
          viewBox='0 0 16 16'
          height='1.5em'
          width='1.5em'
          xmlns='http://www.w3.org/2000/svg'
          className='mr-2'
        >
          <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'></path>
        </svg>
      </span>
      Continue with Github
    </button>
  );
};

const GoogleLogInButton: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  function handleSignIn() {
    signInWithGoogle();
  }
  return (
    <button
      className='btn-login relative rounded-md text-white hover:opacity-95'
      style={{ background: '#4285f4', marginLeft: -4 }}
      onClick={handleSignIn}
    >
      <span className='absolute left-4 bg-white rounded-sm p-1'>
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          version='1.1'
          x='0px'
          y='0px'
          viewBox='0 0 48 48'
          enable-background='new 0 0 48 48'
          height='1.5em'
          width='1.5em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#FFC107'
            d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
          ></path>
          <path
            fill='#FF3D00'
            d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
          ></path>
          <path
            fill='#4CAF50'
            d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
          ></path>
          <path
            fill='#1976D2'
            d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
          ></path>
        </svg>
      </span>
      Continue with Google
    </button>
  );
};

const getRandomImage = () => 'https://picsum.photos/400/400';
