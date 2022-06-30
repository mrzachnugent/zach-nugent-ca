import { FC } from 'react';
import { Terminal } from '../components';

export const NotFound: FC = () => {
  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <h1 className='text-5xl font-bold text-primary-content'>
          404 Page Not Found
        </h1>
      </div>
      <Terminal />
    </>
  );
};
