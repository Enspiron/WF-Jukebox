import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import {styled} from '@mui/joy/styles';

import './ComicViewer.css';


const SmallComic = (props) => {

    const text = {
        textAlign: 'center',
    }

    const imgStyle = {
  
        width: '50%',
        cursor: 'pointer',
        margin: 'auto',
        padding: '10px',
        

    };

    return (
        <div>
            <Box class="comic">
                <div style={text} onClick={props.customClickEvent}>
                    {props.comic.episode}
                <div>{props.episode}</div>
                <div>{props.title}</div>
                </div>
                <img style={imgStyle} src={props.comic}/>
            </Box>
        </div>
    )
}

export default SmallComic;