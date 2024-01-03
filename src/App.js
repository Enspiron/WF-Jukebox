//import './App.css';
import Unit from './Unit/Unit.js';
import MP3Player from './MP3Player/MP3Player.js';
import InfoPopup from './InfoPopup/InfoPopup.js';
import characters from './characters.json';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import UnitPlayer from './UnitPlayer.js';


function App() {
 

  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
        <UnitPlayer/>
       
        </div>

      </header>
      
    </div>
  );
}




export default App;
