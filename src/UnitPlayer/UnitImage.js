import React, { Component, useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import { ToggleButtonGroup } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import './UnitImage.css';

class UnitImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgType: props.defaultImgType || 'full_shot_0.png',
      clickedUnit: props.defaultClickedUnit || null,
    };
  }

  

  componentDidMount() {
    window.addEventListener('storage', this.handleStorage);
    this.handleStorage();
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorage);
  }

  handleStorage = () => {
    try {
      const storedUnit = localStorage.getItem('clickedUnit');
      if (storedUnit) {
        this.setState({
          clickedUnit: JSON.parse(storedUnit).DevNicknames,
        });
      }
    } catch (error) {
      console.error('Error handling storage:', error);
    }
  };

  handleImgTypeChange = (event, newValue) => {
    this.setState({ imgType: newValue });
  };

  containsGif(str) {
    return str && str.includes('gif');
  }

  render() {
    const altart = 'full_shot_1.png'
    const regart = 'full_shot_0.png'
    const eliya = 'https://eliya-bot.herokuapp.com/img/assets/chars/'
    const gifSource = 'https://wfjukebox-storage.s3.us-west-1.amazonaws.com/WF+BGM+%26+IMAGES/character/character_art/'
    //https://wfjukebox-storage.s3.us-west-1.amazonaws.com/WF+BGM+%26+IMAGES/character/character_art/wirfled_playable/pixelart/animated/special.gif
    const special = '/pixelart/animated/special.gif'

    const staticImages = ['full_shot_0.png', 'full_shot_1.png', 'square_0.png', 'square_1.png']

    return (
      <div className="images">
        <div className="toggle">
          <ToggleButtonGroup
            size={"md" || undefined}
            value={this.state.imgType}
            onChange={this.handleImgTypeChange}
            orientation="vertical"
          >
            <Button value="full_shot_0.png">OG</Button>
            <Button value="full_shot_1.png">Alt</Button>
            <Divider orientation="horizontal" sx={{ height: '60%', alignSelf: 'center' }} />
            <Button value="square_0.png">Icon OG</Button>
            <Button value="square_1.png">Icon ALT</Button>
            <Divider orientation="horizontal" sx={{ height: '60%', alignSelf: 'center' }} />
            <Button value="/pixelart/animated/special.gif">Special</Button>
            <Button value="/pixelart/animated/walk_back.gif">Walk Back</Button>
            <Button value="/pixelart/animated/walk_front.gif">Walk Front</Button>

          </ToggleButtonGroup>
        </div>
        <div className="UnitImage">
            {
                this.containsGif(this.state.imgType) ? (
                    <img
                    src={gifSource + this.state.clickedUnit + this.state.imgType}
                    alt="Gif has not yet been uploaded"
                    style={{ width: 'fit-content', height: '100%' }}
                    />
                ) : (
                    <img
                    src={eliya + this.state.clickedUnit + '/' + this.state.imgType}
                    alt={this.state.clickedUnit + '/' + this.state.imgType}
                    style={{ width: 'fit-content', height: '100%' }}
                    />
                )
            }
        </div>
      </div>
    );
  }
}

export default UnitImage;
