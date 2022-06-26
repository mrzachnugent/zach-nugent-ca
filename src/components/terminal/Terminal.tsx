import React, { useEffect, useRef, useState } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useTerminalStore } from '../../stores/terminal-store';
import { wait } from '../../utils/wait';
import { Toast } from '../Toast';

let futureInterval: number | undefined;

const MAX_INPUT_LENGTH = 20;

const BOOT_UP_JSX = [
  <pre data-prefix='$'>
    <code>npm i virtual-zach</code>
  </pre>,
  <pre data-prefix='>' className='text-warning'>
    <code>installing...</code>
  </pre>,
  <pre data-prefix='>' className='text-success'>
    <code>Done!</code>
  </pre>,
  <pre data-prefix='>' className='text-primary-content'>
    <code>Thank you for visiting!</code>
  </pre>,
  <div className='pl-12'>
    <code>
      I'd love to{' '}
      <span className='text-primary-content inline-block'>
        <kbd className='kbd'>c</kbd>onnect
      </span>
      , have you{' '}
      <span className='text-primary-content inline-block'>
        <kbd className='kbd'>s</kbd>
        ign
      </span>{' '}
      my Guest Book, or keep you entertained with my{' '}
      <span className='text-primary-content inline-block'>
        <kbd className='kbd'>b</kbd>ot 🤖
      </span>
    </code>
  </div>,
  <pre data-prefix=' '></pre>,
  <pre data-prefix='?' className='pb-4'>
    Type <kbd className='kbd'>h</kbd> for help
  </pre>,
];

export const Terminal: React.FC<{ modalId: string }> = (props) => {
  const { modalId } = props;
  const modalTogglerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const bottomRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  //   const [text, setText] = useState('');
  //   const [showToast, setShowToast] = useState(false);
  //   const [displayTexts, setDisplayTexts] = useState<React.ReactNode[]>([]);
  const {
    display,
    inputText,
    inputTextReplace,
    inputTextReset,
    displayAdd,
    showToast,
  } = useTerminalStore();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [display]);

  //   useEffect(() => {
  //     async function handleTyping(e: KeyboardEvent) {
  //       e.preventDefault();
  //       if (e.shiftKey && e.code === 'KeyQ' && modalTogglerRef.current.checked) {
  //         modalTogglerRef.current.click();
  //         return;
  //       }
  //       if (e.shiftKey && e.code === 'KeyT' && !modalTogglerRef.current.checked) {
  //         modalTogglerRef.current.click();
  //         inputRef.current.focus();
  //         return;
  //       }

  //       if (e.code === 'Enter') {
  //         setDisplayTexts((prev) => [
  //           ...prev,
  //           <pre data-prefix='>'>
  //             <code>{inputRef.current.value}</code>
  //           </pre>,
  //         ]);
  //         if (
  //           inputRef.current.value.toLowerCase() === 'h' ||
  //           inputRef.current.value.toLowerCase() === 'help'
  //         ) {
  //           setDisplayTexts((prev) => [
  //             ...prev,
  //             <div className='w-full'>
  //               <div className='divider'></div>
  //               <pre data-prefix='>' className=' whitespace-pre-wrap pb-2'>
  //                 <code>🙋 HELP</code>
  //               </pre>
  //               <pre
  //                 data-prefix='>'
  //                 className='text-primary-content whitespace-pre-wrap'
  //               >
  //                 <code>
  //                   Press <kbd className='kbd'>c</kbd> for my contact
  //                 </code>
  //               </pre>
  //               <pre
  //                 data-prefix=' '
  //                 className='text-primary-content whitespace-pre-wrap pb-2'
  //               >
  //                 <code>information.</code>
  //               </pre>
  //               <pre
  //                 data-prefix='>'
  //                 className='text-primary-content whitespace-pre-wrap'
  //               >
  //                 <code>
  //                   Press <kbd className='kbd'>s</kbd> to sign and see my
  //                 </code>
  //               </pre>
  //               <pre
  //                 data-prefix=' '
  //                 className='text-primary-content whitespace-pre-wrap pb-2'
  //               >
  //                 <code>guestbook.</code>
  //               </pre>
  //               <pre
  //                 data-prefix='>'
  //                 className='text-primary-content whitespace-pre-wrap'
  //               >
  //                 <code className=''>
  //                   Press <kbd className='kbd'>b</kbd> to chat with my bot
  //                 </code>
  //               </pre>
  //               <pre
  //                 data-prefix=' '
  //                 className='text-primary-content whitespace-pre-wrap pb-2'
  //               >
  //                 <code className=''>(he's pretty funny 😉).</code>
  //               </pre>
  //             </div>,
  //           ]);
  //         }
  //         if (inputRef.current.value.toLowerCase() === 'c') {
  //           setDisplayTexts((prev) => [
  //             ...prev,
  //             <>
  //               <div className='divider'></div>
  //               <pre data-prefix='>' className='text-primary-content'>
  //                 <code>🧍 CONTACT INFO</code>
  //               </pre>
  //               <ul
  //                 tabIndex={0}
  //                 className='menu menu-compact dropdown-content  p-2  w-full'
  //               >
  //                 <li className='hover:text-primary-content'>
  //                   <a
  //                     className='justify-between'
  //                     href='https://www.github.com/mrzachnugent'
  //                     target='_blank'
  //                   >
  //                     Github
  //                     <svg
  //                       xmlns='http://www.w3.org/2000/svg'
  //                       width='24'
  //                       height='24'
  //                       viewBox='0 0 24 24'
  //                       className='fill-current '
  //                     >
  //                       <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
  //                     </svg>
  //                   </a>
  //                 </li>
  //                 <li className='hover:text-primary-content'>
  //                   <a
  //                     className='justify-between'
  //                     href='https://www.linkedin.com/in/mrzachnugent'
  //                     target='_blank'
  //                   >
  //                     LinkedIn
  //                     <svg
  //                       xmlns='http://www.w3.org/2000/svg'
  //                       width='24'
  //                       height='24'
  //                       viewBox='0 0 24 24'
  //                       className='fill-current'
  //                     >
  //                       <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
  //                     </svg>
  //                   </a>
  //                 </li>
  //                 <li className='hover:text-primary-content'>
  //                   <a
  //                     className='justify-between'
  //                     href='https://www.twitter.com/mrzachnugent'
  //                     target='_blank'
  //                   >
  //                     Twitter
  //                     <svg
  //                       xmlns='http://www.w3.org/2000/svg'
  //                       width='24'
  //                       height='24'
  //                       viewBox='0 0 24 24'
  //                       className='fill-current '
  //                     >
  //                       <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
  //                     </svg>
  //                   </a>
  //                 </li>
  //                 <li className='hover:text-primary-content'>
  //                   <button
  //                     className='justify-between'
  //                     onClick={copyEmailAddress}
  //                   >
  //                     nugentzn@gmail.com <span className='px-1'>✉️</span>
  //                   </button>
  //                 </li>
  //               </ul>
  //             </>,
  //           ]);
  //         }
  //         if (inputRef.current.value.toLowerCase() === 's') {
  //           setDisplayTexts((prev) => [
  //             ...prev,
  //             <pre data-prefix='>' className='text-primary-content'>
  //               <code>SIGN MY FRICKIN GUESTBOOK</code>
  //             </pre>,
  //           ]);
  //         }
  //         if (inputRef.current.value.toLowerCase() === 'b') {
  //           setDisplayTexts((prev) => [
  //             ...prev,
  //             <pre data-prefix='>' className='text-primary-content'>
  //               <code>🤖 ROBOT</code>
  //             </pre>,
  //           ]);
  //         }
  //         if (inputRef.current.value.toLowerCase() === 'clear') {
  //           setDisplayTexts((prev) => [BOOT_UP_JSX[BOOT_UP_JSX.length - 1]]);
  //         }
  //         if (inputRef.current.value.toLowerCase() === 'init') {
  //           setText('');
  //           setDisplayTexts([BOOT_UP_JSX[0]]);
  //           for (let i = 1; i < BOOT_UP_JSX.length; i++) {
  //             await wait(300);
  //             setDisplayTexts((prev) => [...prev, BOOT_UP_JSX[i]]);
  //           }
  //           return;
  //         }
  //         setText('');
  //         return;
  //       }
  //       if (inputRef.current.value.length >= MAX_INPUT_LENGTH) {
  //         return;
  //       }
  //       setText((prev) => prev + e.key);
  //     }

  //     document.addEventListener('keypress', handleTyping);

  //     return () => {
  //       document.removeEventListener('keypress', handleTyping);
  //       clearInterval(futureInterval);
  //     };
  //   }, []);

  useKeyboard(modalTogglerRef, inputRef);

  function handleFocus(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    inputRef.current.focus();
  }

  //   function copyEmailAddress(e: React.MouseEvent<HTMLButtonElement>) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setShowToast(true);
  //     console.log('here');
  //     navigator.clipboard.writeText('nugentzn@gmail.com');
  //     futureInterval = setTimeout(() => {
  //       setShowToast(false);
  //     }, 3000);
  //   }
  return (
    <>
      <input
        type='checkbox'
        id={modalId}
        className='modal-toggle'
        ref={modalTogglerRef}
        onChange={async (e) => {
          inputTextReset();
          if (e.target.checked && !display.length) {
            displayAdd([BOOT_UP_JSX[0]]);
            for (let i = 1; i < BOOT_UP_JSX.length; i++) {
              await wait(300);
              displayAdd([BOOT_UP_JSX[i]]);
            }
          }
        }}
      />
      <label htmlFor={modalId} className='modal cursor-pointer flex-col '>
        <div
          className='mockup-code bg-base-100 max-w-2xl mx-2'
          style={{ width: '95%' }}
        >
          <div className='overflow-y-auto h-72 relative pb-4'>
            {/**
             * todo(zach): fix key problem fro mapping
             */}
            {display.map((e) => e)}
            <div ref={bottomRef} />
          </div>
          <div className='h-0.5 w-full bg-neutral-content opacity-30 mb-6'></div>
          <div onClick={handleFocus}>
            <pre data-prefix='~'>
              <input
                type='text'
                placeholder='Type here'
                className='input w-fit text-lg'
                ref={inputRef}
                value={inputText}
                autoFocus
                onChange={(e) => {
                  inputTextReplace(e.target.value);
                }}
              />
            </pre>
            <div className='flex justify-end'>
              <span className='text-sm mr-4 mt-4'>
                {inputText.length}/{MAX_INPUT_LENGTH}
              </span>
            </div>
          </div>
        </div>
        <pre className='text-center mt-4 text-sm text-primary-content'>
          Press <kbd className='kbd kbd-sm'>Shift</kbd> +{' '}
          <kbd className='kbd kbd-sm'>Q</kbd> to quit.
        </pre>
        {showToast && (
          <Toast msg='Copied email address: nugentzn@gmail to clip board.' />
        )}
      </label>
    </>
  );
};