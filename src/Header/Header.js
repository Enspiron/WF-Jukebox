import { useRef } from "react";
import React from "react";
import List from '@mui/material/List';
import ListDivider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Clock from '../Clock.js';

export const Header = () => {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    const [type, setType] = React.useState('disc');

    return(
        <header className="App-header">
        <div style={{ display: 'flex' }}>
  
        <h1>World Flipper Song Player</h1>
        <div style={{marginLeft: '65%' }}>
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
                  to='#home'
                  aria-label="/"
                >
                  Home
                </ListItemButton>
              </ListItem>
              <ListDivider />
              <ListItem disablePadding role="menuitem">
                <ListItemButton
                  role="menuitem"
                  component="a"
                  to='#test'
                  aria-label="Home"
                >
                  Test
                </ListItemButton>
              </ListItem>
            </List>
            </Box>
  
          </div>
          </header>

    )
    
  }
  export default Header;

