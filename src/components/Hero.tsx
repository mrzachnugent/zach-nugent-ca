import React from 'react';

export const Hero: React.FC<{ modalId: string }> = (props) => {
  const { modalId } = props;
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md blob before:bg-gradient-to-t before:from-neutral '>
          <h1 className='text-5xl font-bold text-primary-content'>
            Hi, I'm Zach 👋
          </h1>
          <p className='py-6 text-slate-200'>
            I create web and mobile apps! I work at{' '}
            <a
              className='link link-hover'
              href='https://www.usewalter.com'
              target='_blank'
            >
              UseWalter
            </a>
            . We use TypeScript, GraphQL, and most importantly{' '}
            <a
              className='link link-hover'
              href='https://expo.dev'
              target='_blank'
            >
              Expo
            </a>{' '}
            .
          </p>
          <label
            htmlFor={modalId}
            className='btn btn-primary modal-button btn-wide'
          >
            Let's talk
            <svg
              className='ml-2 opacity-90'
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 16 16'
              height='1.2em'
              width='1.2em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z'></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};
