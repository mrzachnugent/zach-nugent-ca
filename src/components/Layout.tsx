import { FCC } from '../types';
import { Footer } from './Footer';
import { Header } from './Header';

export const Layout: FCC = ({ children }) => (
  <>
    <Header />
    <div className='hero min-h-screen bg-base-200'>{children}</div>
    <Footer />
  </>
);
