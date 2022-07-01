import { TERMINAL_MODAL_ID } from '../../constants';

export const TerminalDropdown = () => (
  <div className='dropdown dropdown-end'>
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
        <div className='sm:block hidden'>
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
);
