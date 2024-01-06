import { useRef } from "react";
import React from "react";
import List from '@mui/material/List';
import ListDivider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Clock from '../Clock';
import Tooltip from '@mui/material/Tooltip';
import './Header.css';

export const Header = () => {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    const [type, setType] = React.useState('disc');

    const customCursorStyle = {
      cursor: 'default', // Set the cursor style to default
    };

    return(
        <header className="App-header">
        <div style={{ display: 'flex' }}>
        <div class="title">
          <h1>World Flipper Song Player</h1>
          </div>
        <div id="eos">
          Days Till EOS:
          <Tooltip title="February 20th, 2024" followCursor><div style={customCursorStyle}>
          <Clock region="JP" deadline="February, 20, 2024" />
          </div></Tooltip>

          <Tooltip title="July 25th, 2024" followCursor><div style={customCursorStyle}>
          <Clock region="EN" deadline="July, 25, 2024" />
          </div></Tooltip>

          <Tooltip title="May 24th, 2024" followCursor><div style={customCursorStyle}>
          <Clock region="TW" deadline="May, 24, 2024" />
          </div></Tooltip>
  
        </div>
        </div>
  
          <div className="App">
            <Box component="nav" aria-label="My site">
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

