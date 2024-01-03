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

import List from '@mui/material/List';
import ListDivider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import Clock from './Clock.js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const [activeIndex, setActiveIndex] = React.useState('/');
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UnitPlayer />,
    },
    {
      path: '/test',
      element: <div>test</div>
    }
  ]);

  return (
    <div className="App"  >
      <header className="App-header">
      <div style={{ display: 'flex' }}>

      <h1>World Flipper Song Player</h1>
      <div style={{  right: '50px', marginLeft: '70%' }}>
        Days Till EOS:
        <Clock region="JP" deadline="February, 20, 2024" />
        <Clock region="EN" deadline="July, 25, 2024" />
        <Clock region="TW" deadline="May, 24, 2024" />

      </div>
      </div>

        <div className="App">
          <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }} >
          <List role="menubar" orientation="horizontal" style={flexContainer}>
            <ListItem disablePadding role="menuitem">
              <ListItemButton
                role="menuitem"
                component="a"
                href="/"
                aria-label="/"
                aria-expanded={activeIndex === '/'}
                onClick={() => setActiveIndex('/')}
              >
                Home
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem disablePadding role="menuitem">
              <ListItemButton
                role="menuitem"
                component="a"
                href="/test"
                aria-label="Home"
                aria-expanded={activeIndex === '/test'}
                onClick={() => setActiveIndex('/test')}
              >
                Test
              </ListItemButton>
            </ListItem>
          </List>
          </Box>


        <RouterProvider router={router} />
        
        </div>

      </header>
      
    </div>
  );
}




export default App;
