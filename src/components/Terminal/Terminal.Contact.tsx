import { useEffect } from 'react';
import { SiGithub, SiLinkedin, SiTwitter, SiGmail } from 'react-icons/si';
import { useTerminalStore } from '../../stores';

const ICON_SIZE = 24;

let futureInterval: ReturnType<typeof setTimeout> | undefined;

export const TerminalContact = () => {
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
            <SiGithub size={ICON_SIZE} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <a
            className='justify-between'
            href='https://www.linkedin.com/in/mrzachnugent'
            target='_blank'
          >
            LinkedIn
            <SiLinkedin size={ICON_SIZE} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <a
            className='justify-between'
            href='https://www.twitter.com/mrzachnugent'
            target='_blank'
          >
            Twitter
            <SiTwitter size={ICON_SIZE} />
          </a>
        </li>
        <li className='hover:text-primary-content'>
          <button className='justify-between' onClick={copyEmailAddress}>
            nugentzn@gmail.com <SiGmail size={ICON_SIZE} />
          </button>
        </li>
      </ul>
    </div>
  );
};
