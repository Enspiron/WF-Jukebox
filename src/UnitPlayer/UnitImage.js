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

  render() {
    const altart = 'full_shot_1.png'
    const regart = 'full_shot_0.png'
    const eliya = 'https://eliya-bot.herokuapp.com/img/assets/chars/'


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
          </ToggleButtonGroup>
        </div>
        <div className="UnitImage">
          <img src={eliya + this.state.clickedUnit + '/' + this.state.imgType} />
        </div>
      </div>
    );
  }
}

export default UnitImage;
