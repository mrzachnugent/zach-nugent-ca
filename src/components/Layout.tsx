import { FC, ReactNode } from 'react';
import { TERMINAL_MODAL_ID } from '../constants';
import { Footer } from './Footer';
import { Header } from './Header';
import { Terminal } from './terminal/Terminal';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='hero min-h-screen bg-base-200'>{children}</div>
      <Footer />
      <Terminal modalId={TERMINAL_MODAL_ID} />
    </>
  );
};
