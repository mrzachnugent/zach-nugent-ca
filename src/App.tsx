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
        <Route element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
