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
// import MenuIcon from '@mui/joy/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import ToolTip from '@mui/material/Tooltip';
import  Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';

import ModalClose from '@mui/joy/ModalClose';
import IconButton from '@mui/joy/IconButton';

import Clock from '../Clock';
import Tooltip from '@mui/material/Tooltip';
import logo from './logo.png';
import './Header.css';

//import MenuIcon from "@material-ui/icons/Menu";

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import Eos from './eos.js';

export const Header = () => {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    };

    const [type, setType] = React.useState('disc');

    const [open, setOpen] = React.useState(false);


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

    const clicked = (page) => {
      setOpen(false);
      window.location.href = page;
    }



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
      {/* check if on mobile by screen with */}
      {
        window.innerWidth < 600 ? (
          <IconButton variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <Menu /> <MenuRoundedIcon />
        </IconButton>

        ) : ( 
          <div></div>

        )
      }

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: 'pointer' }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
        </Box>
        <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
          }}
        >
          <ListItemButton sx={{ fontWeight: 'lg' }}
          onClick={()=>{clicked("#home")}}>Home</ListItemButton>
          <ListItemButton
            onClick={()=>{clicked("#comics");}}>Comics</ListItemButton>
          <ListItemButton
           onClick={()=>{clicked("#event-ost")}}>Event OST</ListItemButton>
        </List>
      </Drawer>
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

