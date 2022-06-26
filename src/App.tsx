import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GuestBook } from './pages/GuestBook';
import { Homepage } from './pages/Homepage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
