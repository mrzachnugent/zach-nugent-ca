import {
  ChangeEvent,
  FC,
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TERMINAL_MODAL_ID } from '../../constants';
import { useTerminalStore } from '../../stores';
import { wait } from '../../utils';
import { Toast } from '../Toast';
import { BOOT_UP_JSX, MAX_INPUT_LENGTH } from './Terminal.constants';
import { useTerminal } from './useTerminal';

export const Terminal: FC = () => {
  const modalTogglerRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const bottomRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [inputCount, setInputCount] = useState(0);

  const { display, displayAdd, showToast } = useTerminalStore();
  useTerminal(modalTogglerRef, inputRef);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [display]);

  useEffect(() => {
    setInputCount(inputRef.current.value.length);
  }, [inputRef]);

  function handleFocus(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault();
    inputRef.current.focus();
  }

  async function handleOnModalToggleChange(e: ChangeEvent<HTMLInputElement>) {
    if (inputRef.current?.value) inputRef.current.value = '';
    if (e.target.checked && !display.length) {
      displayAdd([BOOT_UP_JSX[0]]);
      for (let i = 1; i < BOOT_UP_JSX.length; i++) {
        await wait(300);
        displayAdd([BOOT_UP_JSX[i]]);
      }
    }
  }

  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputCount(e.target.value.length);
  }

  return (
    <>
      <input
        type='checkbox'
        id={TERMINAL_MODAL_ID}
        className='modal-toggle'
        ref={modalTogglerRef}
        onChange={handleOnModalToggleChange}
      />
      <label
        htmlFor={TERMINAL_MODAL_ID}
        className='modal cursor-pointer flex-col '
      >
        <div
          className='mockup-code bg-base-100 max-w-2xl mx-2'
          style={{ width: '95%' }}
        >
          <div
            className='overflow-y-auto h-72 relative pb-4'
            onClick={handleFocus}
          >
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
                maxLength={MAX_INPUT_LENGTH}
                onChange={handleOnInputChange}
              />
            </pre>
            <div className='flex justify-end'>
              <span className='text-sm mr-4 mt-4'>
                {inputCount}/{MAX_INPUT_LENGTH}
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
