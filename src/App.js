import React, { useEffect, useState } from 'react';
import { Router, Route, Routes, BrowserRouter, createHashRouter, HashRouter, Navigate } from 'react-router-dom';
import UnitPlayer from './UnitPlayer/UnitPlayer.js';
import Header from './Header/Header.js';

function App() {
  const router = createHashRouter([
    {
      path: '/',
      element: <Navigate to="/home" replace />
    },
    {
      path: '/home',
      element: <UnitPlayer />
    },
    {
      path: '/test',
      element: <div>test</div>
    }
  ]);

  return (
    <div className="App">
      <HashRouter basename="/">
        <div className="App">
          <Header updateViewingPage={null} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<UnitPlayer />} />
            <Route path="/test" element={<div>test</div>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}




export default App;
