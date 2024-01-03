import React, { useEffect, useState } from 'react';
import Unit from '../Unit/Unit';
import FavoriteSongs from '../FavoriteSongs/FavoriteSongs';
import html2canvas from 'html2canvas';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';


class MP3Player extends React.Component {
    constructor(props) {
        super(props);
        // Add constructor logic here
        this.state = {
            currentMP3Name: '', // Initialize current MP3 name
            song: '',
            isPlaying: false, // Track if the audio player is playing or not
            favoriteSongs: JSON.parse(localStorage.getItem('favoriteSongs')) || [], // Initialize favorite songs
            songList: []
        };
    }

    // Add methods here

    componentDidMount() {
        // Add event listener for 'storage' event when the component mounts
        window.addEventListener('storage', this.handleStorageChange);
        window.addEventListener('favoriteChange', function (e) {
            console.log("Favorite changed", localStorage.getItem('clickedFavorite'));
            
            //console.log(e.detail);
        });
        document.title = "MP3 Player";
    }


    componentWillUnmount() {
        // Remove event listener when the component unmounts to prevent memory leaks
        window.removeEventListener('storage', this.handleStorageChange);
    }

    render() {
        const { favoriteSongs, currentMP3Name, loopAudio } = this.state;
        const isFavorite = favoriteSongs.includes(currentMP3Name);

        const removeFromFavorites = (song) => {
            const updatedFavorites = favoriteSongs.filter(favorite => favorite !== song);
            this.setState({ favoriteSongs: updatedFavorites }, () => {
                localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
            });
        };

        const toggleLoopAudio = () => {
            this.setState(prevState => ({ loopAudio: !prevState.loopAudio }));
        };

        try {
            return (
                <div className="mp3-player">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px' }}>
                        <div style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', border: '2px solid #ccc', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <h3>Character Songs:</h3>
                            {this.state.songList.map((song) => (
                                <div key={song} >
                                    {this.state.song === song ? <li songId={song} style={{ textDecoration: 'underline' }} onclick={console.log(song)}>{song}</li> : <li songId={song} onclick={console.log(song)}>{song}</li>}
                                </div>
                            ))}
                        </div>

                        <div style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', border: '2px solid #ccc', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ display: 'inline-block', marginRight: '10px' }}>Current Song: {this.state.currentMP3Name}</p>
                            <img src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + this.state.currentMP3Name + "/square_0.png"} style={{ width: '50px', height: '50px' }} />
                            <img onClick={this.addToFavorites} src={isFavorite ? "https://pngfre.com/wp-content/uploads/star-png-image-pngfre-31.png" : "https://pngfre.com/wp-content/uploads/star-png-image-pngfre-30.png"} style={{ width: '20px', height: '20px', marginLeft: '10px', cursor: 'pointer' }} />
                            <audio loop key={this.state.song} controls onLoadedMetadata={this.handleLoadedMetadata} onPlay={this.handlePlayPause} onPause={this.handlePlayPause} >
                                <source src={this.state.song} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <div id="favorite" onClick={() => { 
                        html2canvas(document.querySelector("#favorite")).then(canvas => canvas.toDataURL("image/png", 1.0)) }}>
                        <FavoriteSongs favoriteSongs={favoriteSongs} removeFromFavorites={removeFromFavorites} />
                    </div>
                </div>
            );
        } catch (error) {
            //console.error(error);
            return (
                <div className="mp3-player">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px' }}>
                        <div style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', border: '2px solid #ccc', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <h3>Character Songs:</h3>
                            No songs supported!
                        </div>

                        <div style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', border: '2px solid #ccc', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ display: 'inline-block', marginRight: '10px' }}>Current Song: {this.state.currentMP3Name}</p>
                            <img src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + this.state.currentMP3Name + "/square_0.png"} style={{ width: '50px', height: '50px', margin: '10px' }} />
                        </div>
                    </div>
                    
                </div>
            );
        }
    }

    addToFavorites = () => {
        const { favoriteSongs, currentMP3Name } = this.state;
        if (currentMP3Name) { // Check if a character is selected
            if (favoriteSongs.includes(currentMP3Name)) {
                const updatedFavorites = favoriteSongs.filter(song => song !== currentMP3Name);
                this.setState({ favoriteSongs: updatedFavorites }, () => {
                    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
                });
            } else {
                const updatedFavorites = [...favoriteSongs, currentMP3Name];
                this.setState({ favoriteSongs: updatedFavorites }, () => {
                    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
                });
            }
        } else {
            console.log('No character selected.'); // Handle the case when no character is selected
        }
    }

    nameToSource(name) {
        return "https://github.com/Enspiron/WorldFlipperPlayer/raw/main/character_unique/" + name + "/" + name +  ".mp3";
    }

    handleLoadedMetadata = (event) => {
        const audioElement = event.target;
        const currentMP3Name = audioElement.currentSrc.split('/').pop().replace('.mp3', '');
        this.setState({ currentMP3Name });
        document.title = "MP3 Player";
    }

    handlePlayPause = (event) => {
        document.title = "MP3 Player";
        const audioElement = event.target;
        const isPlaying = !audioElement.paused;
        this.setState({ isPlaying });
        if (isPlaying) {
            const currentMP3Name = audioElement.currentSrc.split('/').pop().replace('.mp3', '');
            document.title = "Now Playing: " + currentMP3Name;
        } else {
            document.title = "MP3 Player";
        }
    }

    handleStorageChange = (event) => {
        
        // Reload the object or perform any necessary actions
        console.log('Storage changed ' + JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames);
        this.setState({ currentMP3Name: JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames });
        this.setState({ song: this.nameToSource(JSON.parse(localStorage.getItem('clickedUnit')).DevNicknames) }); 
        this.setState({songList: JSON.parse(localStorage.getItem('clickedUnit')).songs})
        document.title = "MP3 Player";
           
        
    }
}
export default MP3Player;


