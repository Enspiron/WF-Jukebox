import logo from './logo.svg';
//import './App.css';
import Unit from './Unit/Unit.js';
import MP3Player from './MP3Player/MP3Player.js';

import characters from './characters.json';
import React, { useEffect, useState } from 'react';

function nameToURL(DevName, fileName) { 
  return 'https://github.com/Enspiron/WorldFlipperPlayer/raw/main/character_unique/' + DevName + '/' + fileName + '.mp3';
}




function App() {
  const [filters, setFilters] = React.useState([]); // State to store the filter conditions
  //new filter for Attribute
  const [attribute, setAttribute] = React.useState([]); // State to store the filter conditions
  //var for audio
  const [audio, setAudio] = React.useState([]); // State to store the filter conditions
  const [clickedUnit, setClickedUnit] = React.useState([]);
  const [filteredChars, setFilteredChars] = React.useState([]); // State to store the filter conditions
  const [searchTerm, setSearchTerm] = useState('');

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
      setClickedUnit((localStorage.getItem('clickedUnit')));
      console.log(clickedUnit)
      setAudio(nameToURL(clickedUnit.DevNicknames, clickedUnit.DevNicknames));
      console.log(audio);

      console.log('loaded')
    }

    const handleSiteLoad = () => {
      // Place for code to be executed when the site loads
      setClickedUnit(JSON.parse(localStorage.getItem('clickedUnit')));
      //console.log(JSON.parse(clickedUnit).DevNicknames);
      //setAudio(nameToURL(JSON.parse(clickedUnit).DevNicknames, JSON.parse(clickedUnit).DevNicknames));
      setFilteredChars(characters.chars);

      console.log(clickedUnit);
      console.log('Site loaded');
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
  
  function handleClick() {
    const clickedUnitId = this; // Access the ID of the clicked component
    console.log(`Unit with ID: ${clickedUnitId} was clicked`);
  
    // Display the clicked unit ID in a suitable way (e.g., alert, modal, state update):
    alert(`You clicked Unit ${clickedUnitId}`);
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <div id="result" style={{ width: '50%', float:"left", maxHeight: '100vh', overflowY: 'auto' }}>
          {filteredChars.map((obj) => (
            filters.length === 0 || filters.includes(obj.Rarity)  ? (
              <Unit name={obj.DevNicknames} char={obj} onClick={handleClick}/>
            ) && (attribute.length === 0 || attribute.includes(obj.Attribute) ? (
              <Unit name={obj.DevNicknames} char={obj} onClick={handleClick}/>
            ) : null) : null
          ))}
        </div>

        <div id="filter" style={{ width: '50%', float:"left" }}>
        <div id="searchBox" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            id="searchInput"
            placeholder="Search for a unit"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '16px',
            }}
          />
  
        </div>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

  <div id="raritySelector">
        <button
          onClick={() => toggleFilter(null)}
          style={{
            backgroundColor: isFilterSelected(null) ? 'green' : 'white',
            padding: '8px 12px',
            margin: '0 4px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            height: '32px', /* Set a specific height for all buttons */
          }}
        >
          All
        </button>
        {[1, 2, 3, 4, 5].map((rarity) => (
          <button
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
          width: '80px', /* Set fixed width for stars */
          objectFit: 'contain', /* Scale to fit within width while maintaining aspect ratio */
        }}
      />  
          </button>
        ))}
  </div>

  <div id="attributeSelector" >
  <button
    onClick={() => toggleAttribute(null)}
  style={{
              backgroundColor: isFilterSelected(null) ? 'green' : 'white',
              width: 'fit-content', /* Ensure buttons are sized based on content */
              padding: '8px 12px', /* Add standard padding for consistency */
              margin: '0 4px', /* Add spacing between buttons */
              border: '1px solid #ccc', /* Add a border for visual separation */
              borderRadius: '4px', /* Rounded corners for visual appeal */
              cursor: 'pointer', /* Indicate interactivity */
            }}
  >
    All Attributes
  </button>
  {[
    { attribute: 'Water', value: 'blue' },
    { attribute: 'Fire', value: 'red' },
    { attribute: 'Wind', value: 'green' },
    { attribute: 'Thunder', value: 'yellow' },
    { attribute: 'Light', value: 'white' },
    { attribute: 'Dark', value: 'black' },
  ].map(({ attribute, value }) => (
    <button
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
    </button>
  ))}
  </div>

  </div>

        {console.log(JSON.parse(localStorage.getItem('clickedUnit')))}
        <MP3Player source={audio} />
        </div>


      </header>
      
    </div>
  );
}




export default App;
