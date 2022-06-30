import { FC } from 'react';
import { AvatarDropdown } from './Header.AvatarDropdown';
import { TerminalDropdown } from './Header.TerminalDropdown';

export const Header: FC = () => {
  return (
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
        <TerminalDropdown />
        <AvatarDropdown />
      </div>
    </div>
  );
};
