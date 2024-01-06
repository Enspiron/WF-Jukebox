import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import { ToggleButtonGroup } from '@mui/joy';

import './UnitImage.css'

function UnitImage() {
    const eliya = 'https://eliya-bot.herokuapp.com/img/assets/chars/'
    const altart = 'full_shot_1.png'
    const regart = 'full_shot_0.png'

    const [imgType, setType] = React.useState('full_shot_0.png');
    const [clickedUnit, setClickedUnit] = useState(null);

    useEffect(() => {
        const handleStorage = () => {
          try {
            const storedUnit = localStorage.getItem('clickedUnit');
            if (storedUnit) {
              setClickedUnit(JSON.parse(storedUnit).DevNicknames);
              console.log(JSON.parse(storedUnit).DevNicknames);
            }
          } catch (error) {
            console.error('Error handling storage:', error);
          }
    
        }
    
    
        window.addEventListener('storage', handleStorage);
    
        return () => {
          window.removeEventListener('storage', handleStorage);
        }
      }, [])

    return(
        <div class="images">
            <div class="toggle">
                <ToggleButtonGroup
                size={"md"|| undefined}
                value={imgType}
                onChange={(event, newValue) => {
                    setType(newValue);
                }}
                orientation="vertical"
                >
                <Button value="full_shot_0.png">OG</Button>
                <Button value="full_shot_1.png">Alt</Button>
                <Button value="square_0.png">Icon OG</Button>
                <Button value="square_1.png">Icon ALT</Button>

                </ToggleButtonGroup>
            </div>
            <div className="UnitImage">
                <img src={eliya + clickedUnit + '/' + imgType}  />
            </div>
        </div>
    )
}

export default UnitImage;