import React, { Component } from 'react';
import useSound from 'use-sound';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';

import Player from './Player.js';
var songs = require('./organized_data.json')

class UnitAudio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voiceTypes: [
                { type: 'PowerFlip1', file: 'voice/battle/power_flip_0.mp3'  },
                { type: 'PowerFlip2', file: 'voice/battle/power_flip_1.mp3'  },
                { type: 'Evolve', file: 'voice/ally/evolution.mp3'  },
                { type: 'Victory1', file: 'voice/battle/win_0.mp3'  },
                { type: 'Victory2', file: 'voice/battle/win_1.mp3'  },
                { type: 'Skill Charged', file: 'voice/battle/skill_ready.mp3'  },
                { type: 'Recute', file: 'voice/ally/join.mp3'  },
                { type: 'Skill1', file: 'voice/battle/skill_0.mp3' },
                { type: 'Skill2', file: 'voice/battle/skill_1.mp3' },
                { type: 'BattleStart1', file: 'voice/battle/battle_start_0.mp3' },
                { type: 'BattleStart2', file: 'voice/battle/battle_start_1.mp3' },
                { type: 'Skill Charged', file: 'voice/battle/skill_ready.mp3' },
                { type: 'Pitfall1', file: 'voice/battle/outhole_0.mp3' },
                { type: 'Pitfall2', file: 'voice/battle/outhole_1.mp3' },
            ],
            audio: new Audio(),
        };
    }

    componentDidMount() {
        const id = JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames
        //console.log(songs[JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames])
        window.addEventListener('storage', this.handleClick);
        this.handleClick();
      }
    
      componentWillUnmount() {
        window.removeEventListener('storage', this.handleClick);
      }

    handleClick() {
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
    }
    
    playSound = (file) => {
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames}/${file}`;
        const { audio } = this.state;
        
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        audio.src = audioSource;
        audio.play();
    };

    playHomeFile(file, name) {
        console.log(file, name)
        const audioSource = `https://wfjukebox.b-cdn.net/wfjukebox/character/character_art/${JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames}/voice/home/${file}`;
        const { audio } = this.state;
        console.log(audioSource);
        audio.src = audioSource;

        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
        
         audio.play();
    };

    stopAudio() {
        const { audio } = this.state;
        audio.pause();
        audio.currentTime = 0;
    }

    render() {
        return (
            <div>
            <img src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames + "/square_0.png"} style={{ width: '50px', height: '50px' }} />
            <Divider orientation="horizontal" style={{marginTop: "10px"}} >Gameplay Audio</Divider>                
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {this.state.voiceTypes.map(({ type, file }) => (
                    <Button key={type} onClick={() => this.playSound(file)}>
                        {type}
                    </Button>
                ))}
            </div>
            <Divider orientation="horizontal" style={{marginTop: "10px"}} >Home Audio</Divider>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '10px' }}>
                {songs[JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames].map((song, name) => (
                 <Button key={song} onClick={() => this.playHomeFile(song, name)}>
                     {song}   
                
                </Button>
                ))}
            </div>
            </div>
        );
    }
}

export default UnitAudio;

