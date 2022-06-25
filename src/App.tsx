import { FC, useState } from 'react';

const App: FC = () => {
  return (
    <div>
      {/* NAV */}
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>Developer</a>
        </div>
        <div className='flex-none'>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle'>
              <div className='indicator'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <span className='badge badge-sm indicator-item'>8</span>
              </div>
            </label>
            <div
              tabIndex={0}
              className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
            >
              <div className='card-body'>
                <span className='font-bold text-lg'>8 Items</span>
                <span className='text-info'>Subtotal: $999</span>
                <div className='card-actions'>
                  <button className='btn btn-primary btn-block'>
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src='https://api.lorem.space/image/face?hash=33791' />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* HERO */}
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Hi, I'm Zach</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className='btn btn-primary'>Get Started</button>
          </div>
        </div>
      </div>

      {/* CODE */}
      <div className='mockup-code'>
        <pre data-prefix='$'>
          <code>npm i daisyui</code>
        </pre>
        <pre data-prefix='>' className='text-warning'>
          <code>installing...</code>
        </pre>
        <pre data-prefix='>' className='text-success'>
          <code>Done!</code>
        </pre>
      </div>
      {/* PHONE */}
      <div className='mockup-phone'>
        <div className='camera'></div>
        <div className='display'>
          <div className='artboard artboard-demo phone-1'>Hi.</div>
        </div>
      </div>
      {/* MODAL */}

      <label htmlFor='my-modal-6' className='btn modal-button'>
        open modal
      </label>

      <input type='checkbox' id='my-modal-6' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Congratulations random Interner user!
          </h3>
          <p className='py-4'>
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className='modal-action'>
            <label htmlFor='my-modal-6' className='btn'>
              Yay!
            </label>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className='footer items-center p-4 bg-neutral text-neutral-content'>
        <div className='items-center grid-flow-col'>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
