import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Spacer } from '../components/Spacer';
import { auth, ProviderOptions, signIn, signOut, db } from '../firebase';

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  getDoc,
  getDocs,
  where,
} from 'firebase/firestore';

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
}: {
  disabled?: boolean;
  onClick?(): void;
  className?: string;
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
      fill='white'
      className='inline-block'
      strokeWidth='0'
      viewBox='0 0 1024 1024'
      height='1.5em'
      width='1.5em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z'></path>
    </svg>
  </button>
);
const MOCK = [
  {
    user: {
      displayName: 'Zach',
      photoUrl: 'https://api.lorem.space/image/album?w=400&h=400',
    },
    message: 'Sup dude',
    rating: 5,
    timestamp: new Date(),
  },
];

export const GuestBook: React.FC = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [signatures, setSignatures] = useState<any[]>([]);
  const [hasSigned, setHasSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(collection(db, 'guest-book-signatures'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (signatures.some((e) => doc.data().uid === e.uid)) return;
        setSignatures((prev) => [...prev, doc.data()]);
      });
    });

    async function getData() {
      setLoading(true);
      try {
        const hasSignedRef = collection(db, 'guest-book-signatures');
        const q = query(
          hasSignedRef,
          where('user', '==', {
            uid: user?.uid,
            photoURL: user?.photoURL,
            displayName: user?.displayName,
          })
        );
        const querySnapshotHasSigned = await getDocs(q);
        querySnapshotHasSigned.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setHasSigned(user?.uid === doc.data().user.uid);
        });
        // const querySnapshot = await getDocs(
        //   collection(db, 'guest-book-signatures')
        // );
        // querySnapshot.forEach((doc) => {
        //   setSignatures((prev) => [...prev, doc]);
        // });
      } catch (error) {
        console.error('An error occured while initial data fetching', error);
      } finally {
        setLoading(false);
      }
    }
    getData();

    return () => {
      unsubscribe();
      unsub();
    };
  }, [user]);

  const handleSignIn = (provider: ProviderOptions) => async () => {
    const result = await signIn(provider);
    setUser(result.result.user);
  };
  async function handleSignOut() {
    await signOut();
    setUser(null);
  }

  const handleAssignStars = (index: number) => () => {
    setRating(index + 1);
  };

  async function handleSignGuestBook() {
    console.log({
      signature: {
        user,
        message,
        rating,
      },
      user: {
        ...user,
        hasAlreadySigned: true,
      },
    });
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

  if (loading) return <div>Loading...</div>;
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
            </div>
          </div>
        </div>
      ) : (
        <div className='py-20 min-h-screen bg-base-200 flex flex-col items-center'>
          <Spacer height={24} />
          <h1 className='text-5xl font-bold text-primary-content'>
            Guest book
          </h1>
          <Spacer height={24} />
          <p>Cheers 🍺</p>
          {!hasSigned && (
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
          {signatures.map((msg) => (
            <div
              className='card card-side bg-base-100 shadow-xl max-w-3xl h-full'
              style={{ width: 'calc(100% - 2em)' }}
            >
              <figure>
                <img
                  src='https://api.lorem.space/image/car?w=400&h=400'
                  alt='random image'
                  className='h-full hidden sm:inline-block w-60'
                />
              </figure>
              <div className='card-body px-10'>
                <p className='card-title text-primary-content'>
                  {msg?.message}
                </p>
                <p></p>
                <div className='card-actions justify-between items-center'>
                  <div>
                    {range(msg?.rating).map(() => (
                      <Star disabled />
                    ))}
                  </div>
                  <div className='tooltip' data-tip={msg?.user?.displayName}>
                    <img
                      src={msg?.user?.photoURL}
                      className='w-10 rounded-full'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};
