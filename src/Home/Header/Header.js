import { useRef } from "react";
import React from "react";
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/joy/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import ToolTip from '@mui/material/Tooltip';
import  Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import Clock from '../Clock';
import Tooltip from '@mui/material/Tooltip';
import logo from './logo.png';
import './Header.css';

import Eos from './eos.js';

export const Header = () => {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    const [type, setType] = React.useState('disc');

    const pages = [{name: 'Home', link: '#home'}, 
                  {name: 'Comics', link: '#comics'}, 
                  {name: 'Event OST', link: '#event-ost'}
                ]


    const customCursorStyle = {
      cursor: 'default', // Set the cursor style to default
    };

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };



    return(
        <header className="App-header">
          <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            id="Header_Title"
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            World Flipper Song Player
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
 
              <MenuIcon />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>


          </Box>
        </Toolbar>

      <Eos />
      </Container>
    </AppBar>
        <div style={{ display: 'flex' }}>
        <div class="title">
          </div>
        </div>
  
          <div className="App">


            
          </div>
          </header>

    )
    
  }
  export default Header;

