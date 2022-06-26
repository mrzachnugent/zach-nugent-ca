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

  useKeyboard(modalTogglerRef, inputRef);

  function handleFocus(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    inputRef.current.focus();
  }

  //   function copyEmailAddress(e: React.MouseEvent<HTMLButtonElement>) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setShowToast(true);
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
