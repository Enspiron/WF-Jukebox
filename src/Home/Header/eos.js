import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Clock from '../Clock';
import './Header.css';

const customCursorStyle = {
    cursor: 'default', // Set the cursor style to default
  };

function Eos() {
    return (
        <div>
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
    )
}

export default Eos;