import { useEffect, useState } from 'react';

export const TerminalJoke = () => {
  const [randomJoke, setRandomJoke] = useState('');
  useEffect(() => {
    const getJoke = async () => {
      try {
        const raw = await fetch('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json',
          },
        });
        const result = await raw.json();
        setRandomJoke(result.joke);
      } catch (e) {
        console.error(e);
      }
    };
    getJoke();
  }, []);
  return (
    <div className='  w-full flex flex-col justify-center items-center px-2 pb-4'>
      <p className='text-4xl text-primary-content py-4 font-extrabold'>
        JOKE TIME!
      </p>
      <div className='rounded-2xl h-40 max-w-full w-96 bg-base-200 text-neutral-content flex justify-center items-center'>
        <div className='card-body items-center text-center '>
          <p className='text-6xl absolute opacity-10'>😂</p>
          <p className='card-description'>{randomJoke}</p>
        </div>
      </div>
    </div>
  );
};
