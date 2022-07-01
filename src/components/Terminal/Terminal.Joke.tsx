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
    <div>
      <pre data-prefix='>' className='text-primary-content capitalize'>
        JOKE 😉!
      </pre>
      <p>Joke</p>
      <p>{randomJoke}</p>
      <pre data-prefix='😀' className='pb-4'>
        <code>
          Enter <kbd className='kbd'>j</kbd> for another one joke
        </code>
      </pre>
    </div>
  );
};
