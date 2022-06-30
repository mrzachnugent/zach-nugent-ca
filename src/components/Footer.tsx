import { FC } from 'react';
import { SiTwitter, SiLinkedin, SiGithub } from 'react-icons/si';
export const Footer: FC = () => {
  return (
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
          <SiGithub size={24} />
        </a>
        <a
          className='p-2 cursor-pointer'
          href='https://www.twitter.com/mrzachnugent'
          target='_blank'
        >
          <SiTwitter size={24} />
        </a>
        <a
          className='p-2 cursor-pointer'
          href='https://www.linkedin.com/in/mrzachnugent'
          target='_blank'
        >
          <SiLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
};
