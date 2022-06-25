import { FC, useEffect, useRef, useState } from 'react';
import avatarSrc from './assets/avatar.jpeg';

const App: FC = () => {
  return (
    <div>
      {/* NAV */}
      <div className='navbar bg-base-100 absolute'>
        <div className='flex-1'>
          <a
            className='btn btn-ghost normal-case text-xl hover:bg-transparent'
            href='/'
          >
            <span className='text-primary-content'>App</span>Developer
          </a>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <svg
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 640 512'
                height='1.4em'
                width='1.4em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z'></path>
              </svg>
            </label>
            <div
              tabIndex={0}
              className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
            >
              <div className='card-body'>
                <span className='font-bold  text-center'>Mini terminal</span>
                <pre className='text-center mt-4 text-sm text-primary-content'>
                  <kbd className='kbd kbd-lg'>Ctrl</kbd> +{' '}
                  <kbd className='kbd kbd-lg'>T</kbd>
                </pre>
                <button className='btn btn-outline btn-accent'>Open</button>
              </div>
            </div>
          </div>
          <Spacer width={8} />
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={avatarSrc} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li className='hover:text-primary-content'>
                <a
                  className='justify-between'
                  href='https://www.github.com/mrzachnugent'
                  target='_blank'
                >
                  Github
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-current '
                  >
                    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                  </svg>
                </a>
              </li>
              <li className='hover:text-primary-content'>
                <a
                  className='justify-between'
                  href='https://www.twitter.com/mrzachnugent'
                  target='_blank'
                >
                  LinkedIn
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-current'
                  >
                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                  </svg>
                </a>
              </li>
              <li className='hover:text-primary-content'>
                <a
                  className='justify-between'
                  href='https://www.linkedin.com/in/mrzachnugent'
                  target='_blank'
                >
                  Twitter
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='fill-current '
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* HERO */}
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold text-primary-content'>
              Hi, I'm Zach
            </h1>
            <p className='py-6 text-slate-200'>
              I'm the lead mobile developer for{' '}
              <a
                className='link link-hover'
                href='https://www.usewalter.com'
                target='_blank'
              >
                UseWalter
              </a>
              . We use TypeScript, GraphQL, and most importantly{' '}
              <a
                className='link link-hover'
                href='https://expo.dev'
                target='_blank'
              >
                Expo
              </a>
              . I also love creating web apps! 🙂
            </p>
            <label
              htmlFor='my-modal-4'
              className='btn btn-primary modal-button'
            >
              Let's talk
              <svg
                className='ml-2'
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 16 16'
                height='1.2em'
                width='1.2em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z'></path>
              </svg>
            </label>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className='footer items-center p-4 bg-neutral text-neutral-content'>
        <div className='items-center grid-flow-col'>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
          <a
            className='p-2 cursor-pointer'
            href='https://www.github.com/mrzachnugent'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current hover:text-primary-content'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
          <a
            className='p-2 cursor-pointer'
            href='https://www.twitter.com/mrzachnugent'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current hover:text-blue-500'
            >
              <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
            </svg>
          </a>
          <a
            className='p-2 cursor-pointer'
            href='https://www.linkedin.com/in/mrzachnugent'
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current hover:text-primary-content'
            >
              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
            </svg>
          </a>
        </div>
      </footer>
      <Modal />
    </div>
  );
};

export default App;

const MaxInputLength = 10;

const Modal = () => {
  const modalTogglerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [text, setText] = useState('');

  useEffect(() => {
    function handleTyping(e: KeyboardEvent) {
      e.preventDefault();
      if (
        (e.metaKey || e.ctrlKey) &&
        e.code === 'KeyQ' &&
        modalTogglerRef.current.checked
      ) {
        modalTogglerRef.current.click();
        return;
      }
      if (
        (e.metaKey || e.ctrlKey) &&
        e.code === 'KeyT' &&
        !modalTogglerRef.current.checked
      ) {
        modalTogglerRef.current.click();
        return;
      }

      if (e.code === 'Enter') {
        setText('');
        return;
      }
      if (inputRef.current.value.length >= MaxInputLength) {
        console.log('Max');
        return;
      }
      setText((prev) => prev + e.key);
    }

    document.addEventListener('keypress', handleTyping);

    return () => {
      document.removeEventListener('keypress', handleTyping);
    };
  }, []);

  function handleFocus(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    inputRef.current.focus();
  }
  return (
    <>
      <input
        type='checkbox'
        id='my-modal-4'
        className='modal-toggle'
        ref={modalTogglerRef}
        onChange={(e) => {
          setText('');
          if (e.target.checked) {
            inputRef.current.focus();
            return;
          }
        }}
      />
      <label htmlFor='my-modal-4' className='modal cursor-pointer flex-col'>
        <div className='mockup-code modal-box' onClick={handleFocus}>
          <pre data-prefix='$'>
            <code>npm i virtual-zach</code>
          </pre>
          <pre data-prefix='>' className='text-warning'>
            <code>installing...</code>
          </pre>
          <pre data-prefix='>' className='text-success'>
            <code>Done!</code>
          </pre>
          <pre data-prefix='>' className='text-primary-content'>
            <code>Thank you for visiting!</code>
          </pre>
          <div className='pl-12 py-3'>
            <code>
              I'd love to share my{' '}
              <span className='text-primary-content inline-block'>
                <kbd className='kbd'>c</kbd>ontact info
              </span>
              , to have you{' '}
              <span className='text-primary-content inline-block'>
                <kbd className='kbd'>s</kbd>
                ign
              </span>{' '}
              my Guestbook, or to have you talk with my{' '}
              <span className='text-primary-content inline-block'>
                <kbd className='kbd'>b</kbd>ot 🤖
              </span>
            </code>
          </div>
          <pre data-prefix=' '></pre>
          <pre data-prefix='?'>
            Type <kbd className='kbd'>h</kbd> for help
          </pre>
          <div className='divider'></div>

          <pre data-prefix='~'>
            <input
              type='text'
              placeholder='Type here'
              className='input w-fit text-lg'
              ref={inputRef}
              value={text}
              autoFocus
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </pre>
          <div className='flex justify-end'>
            <span className='text-sm mr-4 mt-4'>{text.length}/10</span>
          </div>
        </div>
        <pre className='text-center mt-4 text-sm text-primary-content'>
          Press <kbd className='kbd kbd-sm'>Ctrl</kbd> +{' '}
          <kbd className='kbd kbd-sm'>Q</kbd> to quit.
        </pre>
      </label>
    </>
  );
};

const Spacer = ({ width = 0, height = 0 }) => <div style={{ width, height }} />;
