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
    <>
      <pre data-prefix='>' className='text-primary-content'>
        <code>🧍 CONTACT INFO</code>
      </pre>
      <div className='px-2 py-4' onClick={(e) => e.stopPropagation()}>
        <ul
          tabIndex={0}
          className='menu menu-compact dropdown-content  border-base-300  w-full border rounded-xl'
        >
          <li className='hover:text-primary-content bg-base-200'>
            <a
              className='justify-between'
              href='https://www.github.com/mrzachnugent'
              target='_blank'
            >
              Github
              <SiGithub size={ICON_SIZE} />
            </a>
          </li>
          <li className='hover:text-primary-content bg-base-100'>
            <a
              className='justify-between'
              href='https://www.linkedin.com/in/mrzachnugent'
              target='_blank'
            >
              LinkedIn
              <SiLinkedin size={ICON_SIZE} />
            </a>
          </li>
          <li className='hover:text-primary-content bg-base-200'>
            <a
              className='justify-between'
              href='https://www.twitter.com/mrzachnugent'
              target='_blank'
            >
              Twitter
              <SiTwitter size={ICON_SIZE} />
            </a>
          </li>
          <li className='hover:text-primary-content bg-base-100'>
            <button className='justify-between' onClick={copyEmailAddress}>
              nugentzn@gmail.com <SiGmail size={ICON_SIZE} />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
