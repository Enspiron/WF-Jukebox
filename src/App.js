import React, { useEffect, useState } from 'react';
import { Router, Route, Routes, BrowserRouter, createHashRouter, HashRouter, Navigate } from 'react-router-dom';
import UnitPlayer from './UnitPlayer/UnitPlayer.js';
import ComicViewer from './ComicViewer/ComicViewer.js';
import Header from './Home/Header/Header.js';
import EventBossMusic from './EventBossMusic/EventBossMusic.js';

import './App.css';

function App() {


  const centerStyle = {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }

  return (
    <div className="App">
      <HashRouter basename="/">
        <div className="App">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

          <Header updateViewingPage={null} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<UnitPlayer />} />
            <Route path="/test" element={<div>test</div>} />
            <Route path="/comics" element={<ComicViewer />} />
            <Route path="/event-ost" element={<EventBossMusic />} />
            <Route path="/centerqoob" element={
            <div class="container">
              <div style={centerStyle}>
                  <div class="col">qoob</div>
                  <div>
                  <img src="https://cdn.discordapp.com/attachments/489238630062227476/1194154212376985601/image.png?ex=65af51c6&is=659cdcc6&hm=a7b03522b34614b117e769ed5fefd99b30ac3e05ec302e5477378305f84cb04f&" />
                  </div>
              </div>
          </div>
            } 
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}




export default App;
