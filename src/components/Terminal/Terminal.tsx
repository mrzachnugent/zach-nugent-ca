import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../app-context';
import { TERMINAL_MODAL_ID } from '../../constants';
import { useTerminalStore } from '../../stores';
import { includes, isExactly, uuid, wait } from '../../utils';
import { Toast } from '../Toast';
import {
  BOOT_UP_JSX,
  MAX_INPUT_LENGTH,
  SECOND_BOOT_UP_JSX,
} from './Terminal.constants';
import { TerminalContact } from './Terminal.Contact';
import { TerminalHelp } from './Terminal.Help';
import { TerminalJoke } from './Terminal.Joke';
import { useTerminal } from './useTerminal';

export const Terminal: FC = () => {
  const modalTogglerRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const bottomRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    addMyCommand,
    display,
    displayAdd,
    displayReplace,
    firstTimeOpening,
    myComandsHistoryIndex,
    myCommands,
    setCommandsHistoryIndex,
    setTerminalInput,
    showToast,
    terminalInput,
  } = useTerminalStore();
  useTerminal(modalTogglerRef, inputRef);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [display]);

  const navigate = useNavigate();
  const { user } = useApp();

  const inputIs = (arr: string[]) => isExactly(arr, terminalInput);
  const inputIncludes = (arr: string[], excludeArr?: string[]) =>
    includes(arr, terminalInput, excludeArr);

  function handleFocus(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.preventDefault();
    inputRef.current.focus();
  }

  async function displayInitial() {
    displayReplace([]);
    for (let i = 0; i < BOOT_UP_JSX.length; i++) {
      await wait(300);
      if (firstTimeOpening) {
        displayAdd([BOOT_UP_JSX[i]]);
      } else {
        displayAdd([SECOND_BOOT_UP_JSX[i]]);
      }
    }
  }

  async function handleOnModalToggleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && !display.length) {
      displayInitial();
    }
  }

  async function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      if (!myCommands.length || myComandsHistoryIndex < 0) return;

      setTerminalInput(myCommands[myComandsHistoryIndex]);
      if (myComandsHistoryIndex !== 0) {
        setCommandsHistoryIndex(myComandsHistoryIndex - 1);
      }
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();

      if (
        !myCommands.length ||
        myComandsHistoryIndex === myCommands.length - 1
      ) {
        setTerminalInput('');
        return;
      }
      setCommandsHistoryIndex(myComandsHistoryIndex + 1);
      setTerminalInput(myCommands[myComandsHistoryIndex + 1]);
    }

    if (e.code === 'Enter') {
      e.preventDefault();
      if (!terminalInput.length) return;
      addMyCommand(terminalInput);

      displayAdd([
        <pre data-prefix='>' key={uuid()}>
          <code>{terminalInput}</code>
        </pre>,
      ]);

      if (inputIs(['q', 'quit'])) {
        modalTogglerRef.current.click();
        displayReplace([]);
        setTerminalInput('');
        return;
      } else if (inputIs(['clear'])) {
        displayReplace([BOOT_UP_JSX[BOOT_UP_JSX.length - 1]]);
      } else if (inputIs(['init'])) {
        setTerminalInput('');
        displayInitial();
        return;
      } else if (
        inputIs([
          'c',
          'contact',
          'contact info',
          'contact infos',
          'contact information',
          'contact informations',
        ])
      ) {
        displayAdd([<TerminalContact key={uuid()} />]);
      } else if (
        inputIs([
          'h',
          'help',
          'help me',
          'help please',
          'what do I do?',
          'what do I do',
          'how does this work?',
          'how does this work',
          'how does it work',
          'how does it work?',
        ])
      ) {
        displayAdd([<TerminalHelp key={uuid()} />]);
      }

      // navigation
      else if (terminalInput.split(' ')[0] === 'nav') {
        if (inputIs(['nav --help'])) {
          displayAdd([
            <div key={uuid()}>
              <pre
                data-prefix='>'
                className='text-primary-content whitespace-pre-wrap'
              >
                <code>
                  <kbd className='kbd'>nav home</kbd>
                  to go to home page
                </code>
              </pre>
              <pre
                data-prefix='>'
                className='text-primary-content whitespace-pre-wrap'
              >
                <code>
                  <kbd className='kbd'>nav guest-book</kbd>
                  to go sign my guestbook
                </code>
              </pre>
            </div>,
          ]);
        } else if (inputIs(['nav guest-book'])) {
          navigate('guest-book');
          displayAdd([
            <pre data-prefix='>' className='text-primary-content' key={uuid()}>
              <code>🤖 You are now on the Guest Book page</code>
            </pre>,
            <pre data-prefix='?' className='pb-4' key={uuid()}>
              Enter <kbd className='kbd'>q</kbd> to quit this terminal session
            </pre>,
          ]);
          window.scrollTo(0, 0);
        } else if (inputIs(['nav home'])) {
          navigate('/');
          displayAdd([
            <pre data-prefix='>' className='text-primary-content' key={uuid()}>
              <code>🤖 You are now on the Home page</code>
            </pre>,
            <pre data-prefix='?' className='pb-4' key={uuid()}>
              Enter <kbd className='kbd'>q</kbd> to quit this terminal session
            </pre>,
          ]);
          window.scrollTo(0, 0);
        } else {
          displayAdd([
            <pre data-prefix='>' className='text-red-500' key={uuid()}>
              <code>Error: navigation command not found</code>
            </pre>,
            <pre data-prefix='?' className='pb-4' key={uuid()}>
              Enter <kbd className='kbd'>nav --help</kbd> to see your navigation
              options
            </pre>,
          ]);
        }
        // ROBOT related
        // Greetings
      } else if (
        inputIs([
          'hello',
          'helo',
          'heloo',
          'helllo',
          'helloo',
          'hellooo',
          'hey',
          'heyy',
          'heey',
          'heeey',
          'heyyy',
          'heyyyy',
          'hi',
          'sup',
          'suh',
          'sup?',
          'suh?',
          "what's up",
          "what's up?",
          'whats up',
          'whats up?',
        ])
      ) {
        displayAdd([
          <pre
            data-prefix='>'
            className='text-primary-content capitalize'
            key={uuid()}
          >
            {terminalInput} {!!user ? user.displayName : 'Anonymous person'}!
          </pre>,
          <pre data-prefix='😀' className='pb-4' key={uuid()}>
            <code>
              Enter <kbd className='kbd'>j</kbd> for a joke
            </code>
          </pre>,
        ]);
        // small talk
      } else if (
        inputIncludes([
          'how is it going',
          'how is it going?',
          'hows it going',
          'hows it goin',
          "how's it going",
          "how's it going?",
          'how are you',
          'how are you?',
          'hry',
          'hry?',
          'hru',
          'hru?',
        ])
      ) {
        displayAdd([
          <pre
            data-prefix='>'
            className='text-primary-content capitalize'
            key={uuid()}
          >
            I'm absolutely BUZZing 😉!
          </pre>,
          <pre data-prefix='😀' className='pb-4' key={uuid()}>
            <code>
              Enter <kbd className='kbd'>j</kbd> for a joke
            </code>
          </pre>,
        ]);
      } else if (
        inputIncludes(['joke'], ['dont', "don't", 'no']) ||
        inputIs(['j'])
      ) {
        displayAdd([<TerminalJoke key={uuid()} />]);
      }

      // unrecognized commands
      else {
        displayAdd([
          <pre data-prefix='>' className='text-primary-content' key={uuid()}>
            Sorry I didn't quite get that.
          </pre>,
          <pre data-prefix='?' className='pb-4' key={uuid()}>
            <code>
              Enter <kbd className='kbd'>h</kbd> for help
            </code>
          </pre>,
        ]);
      }
      setTerminalInput('');
    }
  }

  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTerminalInput(e.target.value);
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
                value={terminalInput}
                maxLength={MAX_INPUT_LENGTH}
                onChange={handleOnInputChange}
                onKeyDown={handleOnKeyDown}
              />
            </pre>
            <div className='flex justify-end'>
              <span className='text-sm mr-4 mt-4'>
                {terminalInput.length}/{MAX_INPUT_LENGTH}
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
