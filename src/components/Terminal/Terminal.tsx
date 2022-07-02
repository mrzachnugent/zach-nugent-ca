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
import { TerminalBotHelp } from './Terminal.BotHelp';
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
      if (window.innerWidth < 450) {
        inputRef.current.blur();
      }

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
            <div
              className='overflow-x-auto ml-4 mr-2 rounded-lg border-base-200 border my-4'
              key={uuid()}
            >
              <table className='table w-full table-zebra'>
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Command</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- row 1 --> */}
                  <tr>
                    <th>1</th>
                    <td>
                      <code>nav home</code>
                    </td>
                    <td>Go to homepage</td>
                  </tr>
                  {/* <!-- row 2 --> */}
                  <tr>
                    <th>2</th>
                    <td>
                      <code>nav guest-book</code>
                    </td>
                    <td>Go to guest book page</td>
                  </tr>
                </tbody>
              </table>
            </div>,
          ]);
        } else if (inputIs(['nav guest-book'])) {
          navigate('guest-book');
          displayAdd([
            <div key={uuid()} className='max-w-full'>
              <pre
                data-prefix='>'
                className='text-primary-content whitespace-pre-wrap'
              >
                <code>Location: Guest Book page</code>
              </pre>
              <pre data-prefix='?' className='pb-4 whitespace-pre-wrap'>
                Enter <kbd className='kbd'>q</kbd> to quit
              </pre>
            </div>,
          ]);
          window.scrollTo(0, 0);
        } else if (inputIs(['nav home'])) {
          navigate('/');
          displayAdd([
            <pre
              data-prefix='>'
              className='text-primary-content  whitespace-pre-wrap'
              key={uuid()}
            >
              <code>Location: Home page</code>
            </pre>,
            <pre
              data-prefix='?'
              className='pb-4  whitespace-pre-wrap'
              key={uuid()}
            >
              Enter <kbd className='kbd'>q</kbd> to quit
            </pre>,
          ]);
          window.scrollTo(0, 0);
        } else {
          displayAdd([
            <pre data-prefix='!' className='text-red-500' key={uuid()}>
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
        ]);
      } else if (
        inputIncludes(['joke'], ['dont', "don't", 'no']) ||
        inputIs(['j', 'another', 'another one', 'again'])
      ) {
        displayAdd([<TerminalJoke key={uuid()} />]);
      } else if (
        inputIs([
          'who are you',
          'who are you?',
          'who is you',
          'who is you?',
          'what is you',
          'what is you?',
          'what are you',
          'what are you?',
          'sing',
          'sing me a song',
        ])
      ) {
        displayAdd([
          <div
            className='  w-full flex flex-col justify-center items-center px-2 pb-4'
            key={uuid()}
          >
            <p className='text-4xl text-primary-content py-4 font-extrabold'>
              SONG TIME!
            </p>
            <div className='rounded-2xl max-w-full  w-96 bg-base-200 text-neutral-content flex justify-center items-center'>
              <div className='card-body items-center text-center '>
                <p className='text-6xl absolute opacity-20'>♬</p>
                <p className='card-description'>
                  I'm a little robot, naughts and ones. Here is my CLI, here's
                  where I lie. When I get all chatty, I tell jokes. They're not
                  original, they're not good. But I'm a very special bot, this
                  is true. Here's an example Of what I can do, I can wiggle my
                  way to your heart. Hope you enjoyed me, it's modern art.
                </p>
              </div>
            </div>
          </div>,
        ]);
      } else if (inputIs(['bot --help'])) {
        displayAdd([<TerminalBotHelp key={uuid()} />]);
      } else if (
        inputIs([
          'lol',
          'loll',
          'lolo',
          'lolll',
          'ha',
          'haha',
          'hahaha',
          'hahahaha',
        ])
      ) {
        displayAdd([
          <pre
            data-prefix='>'
            className='text-primary-content whitespace-pre-wrap'
            key={uuid()}
          >
            If you think that's funny, you should hear the next joke that I'm
            saving up for you
          </pre>,
          <pre data-prefix='😀' className='pb-4' key={uuid()}>
            <code>
              Enter <kbd className='kbd'>j</kbd> for a joke
            </code>
          </pre>,
        ]);
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
        autoComplete='off'
        spellCheck={false}
        autoCapitalize='off'
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
