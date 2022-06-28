import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TERMINAL_MODAL_ID } from '../constants';
import { auth, signOut } from '../firebase';
import { Spacer } from './Spacer';

export const Header: React.FC<{
  onLogOut?(): void;
  name?: string | null;
}> = (props) => {
  const { name } = props;

  const [user, loadingAuth, errorAuth] = useAuthState(auth);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className='navbar bg-base-100 absolute'>
      <div className='flex-1'>
        {/* Home Button */}
        <a
          className='btn btn-ghost normal-case text-xl hover:bg-transparent'
          href='/'
        >
          <span className='text-primary-content'>App</span>Developer
        </a>
      </div>
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          {/* Terminal Button Dropdown */}
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            <svg
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 640 512'
              height='1.4em'
              width='1.4em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z'></path>
            </svg>
          </label>
          <div
            tabIndex={0}
            className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
          >
            <div className='card-body'>
              <span className='font-bold text-lg text-center text-primary-content'>
                Mini terminal
              </span>
              <div>
                <pre className='text-center my-2 text-sm text-primary-content'>
                  <kbd className='kbd kbd-lg'>Shift</kbd>
                  <span className='px-3'> + </span>
                  <kbd className='kbd kbd-lg'>T</kbd>
                </pre>
              </div>
              <label htmlFor={TERMINAL_MODAL_ID} className='btn btn-outline'>
                Open
              </label>
            </div>
          </div>
        </div>
        {name && (
          <>
            <Spacer width={8} />
            <div className='tooltip tooltip-bottom z-10' data-tip={name}>
              <p className='text-sm font-bold'>Hi!</p>
            </div>
          </>
        )}
        <Spacer width={8} />
        {user?.photoURL && (
          <div className='dropdown dropdown-end'>
            {/* Avatar Button Dropdown */}
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={user?.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <button className='btn btn-primary' onClick={handleSignOut}>
                Log out
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
