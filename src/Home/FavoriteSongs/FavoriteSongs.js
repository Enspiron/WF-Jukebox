import React from 'react';
import './FavoriteSongs.css';

class FavoriteSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteSongs: [],
            song: ''
        };
    }

    render() {
        const handleFavoriteSongClick = (song) => {
            // Add your logic here for handling the favorite song click event
            console.log("Favorite song clicked:", song);
            localStorage.setItem('clickedFavorite', JSON.stringify(song));
            window.dispatchEvent(new Event('favoriteChange', { detail: song }));
        }

        return (
            <div id="favorite" >
                <h3 style={{ marginBottom: '10px', width: '100%' }}>Favorite Songs:</h3>
                {this.props.favoriteSongs.map((song, index) => (
                    <div key={index} id="fav_unit">
                        <img
                            src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + song + "/square_0.png"}
                            alt=""
                            style={{ width: '50px', height: '50px', cursor: 'pointer', marginRight: '10px' }}
                            onClick={() => handleFavoriteSongClick(song)}
                        />
                        <span onClick={() => this.props.removeFromFavorites(song)} style={{ cursor: 'pointer' }}>✖</span>
                    </div>
                ))}
            </div>
        )
    }
    
};

export default FavoriteSongs;
