import { FC, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  GithubLogInButton,
  GoogleLogInButton,
  Spacer,
  Star,
  Terminal,
} from '../components';
import { auth, db } from '../firebase';

import { addDoc, collection } from 'firebase/firestore';
import { BiError } from 'react-icons/bi';
import { SiSpinrilla } from 'react-icons/si';
import { range, uuid } from '../utils';

export const GuestBook: FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [value, loadingSignatures, errorSignature] = useCollection(
    collection(db, 'guest-book-signatures')
  );

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
        <SiSpinrilla className='animate-spin' size={35} />
      </div>
    );

  if (errorAuth || errorSignature)
    return (
      <div className='min-h-screen flex justify-center items-center flex-col'>
        <BiError className='animate-pulse text-red-500' size={35} />
        <span className='text-red-500'>ERROR:</span>
        {errorAuth && <p>Cannot login at this time.</p>}
        {errorAuth && <p>Cannot display guest book signatures at this time.</p>}
      </div>
    );

  return (
    <>
      {!user ? (
        <LoginSection />
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
                  ref={textAreaRef}
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
                      checked={i + 1 <= rating}
                      onClick={handleAssignStars(i)}
                      key={uuid()}
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
            <div
              className='card card-side bg-base-100 shadow-xl max-w-lg md:min-h-16 sm:min-h-10 mb-12'
              style={{ width: 'calc(100% - 2em)' }}
              key={msg.id}
            >
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
                        <Star disabled isLarge key={uuid()} />
                      ))}
                    </div>
                    <Spacer height={4} />
                  </>
                )}
                <div className='card-actions justify-between items-center'>
                  {msg.data().message ? (
                    <div>
                      {range(msg.data()?.rating).map(() => (
                        <Star disabled key={uuid()} />
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
          ))}
        </div>
      )}
      <Terminal />
    </>
  );
};

const LoginSection = () => {
  return (
    <div className='hero min-h-screen'>
      <div className='hero-content text-center'>
        <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
          <h1 className='text-5xl font-bold text-primary-content'>
            Guest book
          </h1>
          <>
            <p className='py-6 text-slate-200'>
              Who was here? Sign in to see and contribute
              <p className='text-xs'>(if you want 🫢)</p>
            </p>

            <Spacer height={12} />
            <div className='flex flex-col'>
              <GithubLogInButton />
              <Spacer height={20} />
              <GoogleLogInButton />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
