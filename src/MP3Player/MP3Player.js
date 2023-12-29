import React from 'react';
import Unit from '../Unit/Unit';

class MP3Player extends React.Component {
    constructor() {
        super();
        // Add constructor logic here
        this.state = {
            currentMP3Name: '' // Initialize current MP3 name
        };
    }

    // Add methods here



    render() {
        return (
            <div className="mp3-player">
                <audio controls onLoadedMetadata={this.handleLoadedMetadata}>
                    <source src={this.props.source} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ display: 'inline-block', marginRight: '10px' }}>Current Song: {this.state.currentMP3Name}</p>
                    <img src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + this.state.currentMP3Name + "/square_0.png"} style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
        );
    }

    handleLoadedMetadata = (event) => {
        const audioElement = event.target;
        const currentMP3Name = audioElement.currentSrc.split('/').pop().replace('.mp3', '');
        this.setState({ currentMP3Name });
    }

    handleStorageChange = (event) => {
        if (event.key === 'clickedUnit') {
            // Reload the object or perform any necessary actions
            
        }
    }
}

export default MP3Player;

