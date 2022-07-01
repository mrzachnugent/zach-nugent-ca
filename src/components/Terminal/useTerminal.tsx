import { MutableRefObject, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTerminalStore } from '../../stores';
import { includes, uuid, wait } from '../../utils';
import { BOOT_UP_JSX, SECOND_BOOT_UP_JSX } from './Terminal.constants';
import { SiTwitter, SiLinkedin, SiGithub, SiGmail } from 'react-icons/si';

export const useTerminal = (
  modalTogglerRef: MutableRefObject<HTMLInputElement>,
  inputRef: MutableRefObject<HTMLInputElement>,
  resetCount: () => void
) => {
  const { displayAdd, displayReplace, firstTimeOpening } = useTerminalStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function navigateToOther() {
    const isGuestBook = pathname === '/guest-book';
    navigate(isGuestBook ? '/' : '/guest-book');
  }

  const inputIs = (arr: string[]) => includes(arr, inputRef.current.value);

  async function handleTyping(e: KeyboardEvent) {
    // Open Terminal
    if (e.shiftKey && e.code === 'KeyT' && !modalTogglerRef.current.checked) {
      e.preventDefault();
      modalTogglerRef.current.click();
      inputRef.current.focus();
      return;
    }

    // Close Terminal
    if (e.shiftKey && e.code === 'KeyQ' && modalTogglerRef.current.checked) {
      e.preventDefault();
      displayReplace([]);
      modalTogglerRef.current.click();
      return;
    }

    // Actions for entering command
    if (e.code === 'Enter' && modalTogglerRef.current.checked) {
      e.preventDefault();
      if (!inputRef.current.value.length) return;
      displayAdd([
        <pre data-prefix='>' key={uuid()}>
          <code>{inputRef.current.value}</code>
        </pre>,
      ]);
      if (inputIs(['quit', 'q'])) {
        modalTogglerRef.current.click();
        displayReplace([]);
        return;
      }
      if (inputIs(['h', 'help'])) {
        displayAdd([<HelpSection key={uuid()} />]);
      }
      if (inputIs(['c', 'connect'])) {
        displayAdd([<ContactSection key={uuid()} />]);
      }
      if (inputIs(['s', 'sign', 'guest book', 'book'])) {
        navigate('guest-book');
        displayReplace([]);
        modalTogglerRef.current.click();
        window.scrollTo(0, 0);
      }
      if (inputIs(['joke'])) {
        displayAdd([
          <pre data-prefix='>' className='text-primary-content' key={uuid()}>
            <code>🤖 Bip boop bip</code>
          </pre>,
        ]);
      }
      if (inputIs(['n', 'next'])) {
        inputRef.current.value = '';
        navigateToOther();
        displayReplace([]);
        return;
      }
      if (inputIs(['b', 'back'])) {
        inputRef.current.value = '';
        navigateToOther();
        displayReplace([]);
        return;
      }
      if (inputIs(['home'])) {
        navigate('/');
        displayReplace([]);
        modalTogglerRef.current.click();
        window.scrollTo(0, 0);
      }
      if (inputIs(['nav'])) {
        displayAdd([
          <div key={uuid()}>
            <pre
              data-prefix='>'
              className='text-primary-content whitespace-pre-wrap'
            >
              <code>
                <kbd className='kbd'>a</kbd>
                to go to home page
              </code>
            </pre>
            <pre
              data-prefix='>'
              className='text-primary-content whitespace-pre-wrap'
            >
              <code>
                <kbd className='kbd'>s</kbd>
                to go sign my guestbook
              </code>
            </pre>
            <pre
              data-prefix='>'
              className='text-primary-content whitespace-pre-wrap'
            >
              <code>
                <kbd className='kbd'>b</kbd>
                to go to previous page
              </code>
            </pre>
            <pre
              data-prefix='>'
              className='text-primary-content whitespace-pre-wrap'
            >
              <code>
                <kbd className='kbd'>n</kbd>
                to go the next page
              </code>
            </pre>
          </div>,
        ]);
      }

      if (inputIs(['clear'])) {
        displayReplace([BOOT_UP_JSX[BOOT_UP_JSX.length - 1]]);
      }

      if (inputIs(['init'])) {
        inputRef.current.value = '';
        displayReplace([]);
        for (let i = 0; i < BOOT_UP_JSX.length; i++) {
          await wait(300);
          if (firstTimeOpening) {
            displayAdd([BOOT_UP_JSX[i]]);
          } else {
            displayAdd([SECOND_BOOT_UP_JSX[i]]);
          }
        }
        return;
      }

      // Reset input text on Enter
      inputRef.current.value = '';
      resetCount();
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleTyping);

    return () => {
      document.removeEventListener('keypress', handleTyping);
    };
  }, []);
};

const HelpSection = () => {
  return (
    <div className='w-full'>
      <div className='divider'></div>
      <pre data-prefix='>' className=' whitespace-pre-wrap pb-2'>
        <code>🙋 HELP</code>
      </pre>
      <pre data-prefix='>' className='text-primary-content whitespace-pre-wrap'>
        <code>Work in progress</code>
      </pre>
    </div>
  );
};

let futureInterval: ReturnType<typeof setTimeout> | undefined;

const ContactSection = () => {
  const { showToastChange } = useTerminalStore();

  function copyEmailAddress(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    showToastChange(true);
    navigator.clipboard.writeText('nugentzn@gmail.com');
    futureInterval = setTimeout(() => {
      showToastChange(false);
    }, 2000);
  }
  useEffect(() => {
    return () => {
      clearInterval(futureInterval);
    };
  }, []);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className='divider'></div>
      <pre data-prefix='>' className='text-primary-content'>
        <code>🧍 CONTACT INFO</code>
      </pre>
      <ul
        tabIndex={0}
        className='menu menu-compact dropdown-content  p-2  w-full'
      >
        <li className='hover:text-primary-content'>
          <a
            className='justify-between'
            href='https://www.github.com/mrzachnugent'
            target='_blank'
          >
            Github
            <SiGithub size={24} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <a
            className='justify-between'
            href='https://www.linkedin.com/in/mrzachnugent'
            target='_blank'
          >
            LinkedIn
            <SiLinkedin size={24} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <a
            className='justify-between'
            href='https://www.twitter.com/mrzachnugent'
            target='_blank'
          >
            Twitter
            <SiTwitter size={24} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <button className='justify-between' onClick={copyEmailAddress}>
            nugentzn@gmail.com <SiGmail size={24} />
          </button>
        </li>
      </ul>
    </div>
  );
};
