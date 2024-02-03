import React from 'react';
import tree_back from './img/tree_back.png'  
import w1_1 from './img/world_tree_01.png'

import './StoryDisplay.css'
import { Image, SubImage } from './ImageGrid';

function StoryDisplay(props) {


    return(
        <div class="container">
            <img class="back" src={tree_back}/>
            <div class="sub">
                testing
            </div>
        </div>
    )
}

export default StoryDisplay;