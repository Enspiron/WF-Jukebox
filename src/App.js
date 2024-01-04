import React, { useEffect, useState } from 'react';
import {Router, Route, Routes, BrowserRouter, createHashRouter} from 'react-router-dom'
import UnitPlayer from './UnitPlayer/UnitPlayer.js';

import Header from './Header/Header.js';




function App() {

  const router = createHashRouter([
    {
      path: '/',
      element: <UnitPlayer/>
    },
    {
      path: '/test',
      element: <div>test</div>
    }
  ])

  return (
    <div className="App"  >
      <header className="App-header">


        <div className="App">
          <Header/>
          <Routes>
            <Route exact path="/" element={<UnitPlayer/>}/>
            <Route path="/test" element={<div>test</div>}/>
            <Route path="*" element={<div>404</div>}/>

          </Routes>


        </div>

          

      </header>
      
    </div>
  );
}




export default App;
