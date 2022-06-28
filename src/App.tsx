import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { Terminal } from './components/terminal/Terminal';
import { TERMINAL_MODAL_ID } from './constants';
import { GuestBook } from './pages/GuestBook';
import { Homepage } from './pages/Homepage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/guest-book' element={<GuestBook />} />
          <Route
            path='*'
            element={
              <div className='h-screen flex items-center justify-center'>
                <h1 className='text-5xl font-bold text-primary-content'>
                  404 Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
