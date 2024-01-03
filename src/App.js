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



function App() {
  const [filters, setFilters] = React.useState([]); // State to store the filter conditions
  //new filter for Attribute
  const [attribute, setAttribute] = React.useState([]); // State to store the filter conditions
  //var for audio
  const [clickedUnit, setClickedUnit] = React.useState([]);
  const [filteredChars, setFilteredChars] = React.useState([]); // State to store the filter conditions
  const [searchTerm, setSearchTerm] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 768 }); // Adjust breakpoint as needed


  const toggleFilter = (filter) => {
    if (filter === null) {
      if (filters.length === 0) {
        setFilters([]);
      } else {
        setFilters([]);
      }
    } else {
      if (filters.includes(filter)) {
        setFilters(filters.filter((f) => f !== filter));
      } else {
        setFilters([...filters, filter]);
      }
    }
  };

  //Posible attrubutes: Water, Fire, Wind, Thunder, Light, Dark
  const toggleAttribute = (filter) => {
    if (filter === null) {
      if (attribute.length === 0) {
        setAttribute([]);
      } else {
        setAttribute([]);
      }
    } else {
      if (attribute.includes(filter)) {
        setAttribute(attribute.filter((f) => f !== filter));
      } else {
        setAttribute([...attribute, filter]);
      }
    }
  };

  const searchInput = document.getElementById('searchInput');
  if(searchInput){
      let typingTimer;
      const doneTypingInterval = 500; // Delay in milliseconds

      searchInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          const searchTerm = searchInput.value.toLowerCase();
          if (searchTerm === '') {
            setFilteredChars(characters.chars);
            //displayCharacters(characters.chars);
            return;
          }
          
          const filteredChars = characters.chars.filter(char => {
            return char.DevNicknames.toLowerCase().includes(searchTerm) ||
                   char.ENName.toLowerCase().includes(searchTerm);
          });
          console.log(filteredChars);
          setFilteredChars(filteredChars);
          //displayCharacters(filteredChars);
        }, doneTypingInterval);
      });
}

  const isFilterSelected = (filter) => {
    return filters.includes(filter);
  };


  const isAttributeSelected = (filter) => {
    return attribute.includes(filter);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };


  useEffect(() => {
    const handleStorage = () => {
      try {
        const storedUnit = localStorage.getItem('clickedUnit');
        if (storedUnit) {
          setClickedUnit(JSON.parse(storedUnit));
          console.log(JSON.parse(storedUnit));
        }
      } catch (error) {
        console.error('Error handling storage:', error);
      }

    }

    const handleSiteLoad = () => {
      try {
        const storedUnit = localStorage.getItem('clickedUnit');
        if (storedUnit) {
          setClickedUnit(JSON.parse(storedUnit));
          setFilteredChars(characters.chars);
          console.log(storedUnit + '');
        }
      } catch (error) {
        console.error('Error on site load:', error);
      }
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener('load', handleSiteLoad);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('load', handleSiteLoad);
    }
  }, [])

  const audiosource = "https://github.com/Enspiron/WorldFlipperPlayer/raw/main/character_unique/black_wolf_knight_wt23/black_wolf_knight_wt23.mp3";
  //setAudio('https://github.com/Enspiron/WorldFlipperPlayer/raw/main/character_unique/amulet_bosslady/amulet_bosslady.mp3');
  
  function handleClick(clicked) {
    console.log(`Unit with ID: ${clicked} was clicked`);
    setClickedUnit(prevClickedUnit => {
      if (prevClickedUnit === clicked) {
        return null; // Deselect the unit if it's already selected
      }
      return clicked; // Set the clicked unit
    });
  }
  
  
  

  return (
    <div className="App">
      <header className="App-header">
        <InfoPopup />
      <Box sx={{ width: '100%' }}>
      <Grid id="result" style={{ width: '50%', float:"left", height: '90vh', overflowY: 'auto' }}>
        {filteredChars.map((obj) => (
          (filters.length === 0 || filters.includes(obj.Rarity)) &&
          (attribute.length === 0 || attribute.includes(obj.Attribute)) && (
            <Unit key={obj.id} name={obj.DevNicknames} char={obj} onClick={() => handleClick(obj)} style={{ cursor: 'pointer' }} />
          )
        ))}

      </Grid>
      </Box>

        <div id="filter" style={{ width: '50%', float:"left" }}>
        <div id="searchBox" style={{ marginBottom: '20px', marginRight: '20px' }}>
          <TextField 
          fullWidth sx={{ m: 1 }}
          variant="outlined"
            id="searchInput"
            placeholder="Search for a unit"

          />
  
        </div>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

  <div id="raritySelector">
    <Divider>
    <ToggleButtonGroup >
    <Stack direction="row" spacing={3}>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={() => toggleFilter(null)}
          // style={{
          //   backgroundColor: isFilterSelected(null) ? 'green' : 'white',
          //   padding: '8px 12px',
          //   margin: '0 4px',
          //   border: '1px solid #ccc',
          //   borderRadius: '4px',
          //   cursor: 'pointer',
          //   height: '32px', /* Set a specific height for all buttons */
          // }}
        >
          All
        </Button>
        {[1, 2, 3, 4, 5].map((rarity) => (
          <ToggleButton 
            key={rarity}
            onClick={() => toggleFilter(rarity)}
            style={{
              backgroundColor: isFilterSelected(rarity) ? 'green' : 'white',
              width: 'fit-content',
              height: 'fit-content',
              padding: '5px 0px',
              margin: '0 0px',
              border: '1px solid #ccc',
              borderRadius: '3px',
              cursor: 'pointer',
              scale: '0.9'
            }}
          >
        <img
        src={`https://eliya-bot.herokuapp.com/img/assets/sprites/rarity/star${rarity}.png`}
        alt={`Rarity ${rarity}`}
        style={{
          height: 'auto', /* Allow inherent image height for stars */
          width: '72px', /* Set fixed width for stars */
          objectFit: 'contain', /* Scale to fit within width while maintaining aspect ratio */
        }}
      />  
          </ToggleButton >
        ))}
        </Stack>
        </ToggleButtonGroup>
        </Divider>
  </div>
        <Divider orientation="vertical" >    </Divider>

  <Divider>      
  <div id="attributeSelector" >
  <ToggleButtonGroup >
  <Button
  color="primary"
  variant="outlined"
  size="small"
    onClick={() => toggleAttribute(null)}
  style={{
              backgroundColor: isFilterSelected(null) ? 'green' : 'white',
              width: 'fit-content', /* Ensure buttons are sized based on content */
              padding: '8px 12px', /* Add standard padding for consistency */
              margin: '0 2px', /* Add spacing between buttons */
              leftmargin: '10px',
              border: '1px solid #ccc', /* Add a border for visual separation */
              borderRadius: '4px', /* Rounded corners for visual appeal */
              cursor: 'pointer', /* Indicate interactivity */
            }}
  >
    All Attributes
  </Button>
  {[
    { attribute: 'Water', value: 'blue' },
    { attribute: 'Fire', value: 'red' },
    { attribute: 'Wind', value: 'green' },
    { attribute: 'Thunder', value: 'yellow' },
    { attribute: 'Light', value: 'white' },
    { attribute: 'Dark', value: 'black' },
  ].map(({ attribute, value }) => (
    <ToggleButton
      key={attribute}
      onClick={() => toggleAttribute(attribute)}
      style={{
        backgroundColor: isAttributeSelected(attribute) ? 'green' : 'white',
        width: 'fit-content',
        padding: '8px 12px',
        margin: '0 4px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      <img
        src={`https://eliya-bot.herokuapp.com/img/assets/sprites/elements/element_${value}.png`}
        alt={`Attribute ${attribute}`}
        style={{
          height: '20px', /* Set base image height */
          objectFit: 'contain', /* Scale image to fit within height */
        }}
      />
    </ToggleButton>
  ))}
  </ToggleButtonGroup>
  </div>
  </Divider>

  </div>

       
        <MP3Player  />
        </div>


      </header>
      
    </div>
  );
}




export default App;
