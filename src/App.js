import React, { useEffect, useState } from 'react';
import {Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import UnitPlayer from './UnitPlayer/UnitPlayer.js';

import Header from './Header/Header.js';




function App() {


  return (
    <div className="App"  >
      <header className="App-header">


        <div className="App">
          <Header/>
          <Routes>
            <Route path="/" element={<UnitPlayer/>}/>
            <Route path="/test" element={<div>test</div>}/>

          </Routes>


        </div>

          

      </header>
      
    </div>
  );
}




export default App;
