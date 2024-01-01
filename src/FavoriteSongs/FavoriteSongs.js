import React from 'react';

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
            <div id="favorite" style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '5px', display: 'flex', flexWrap: 'wrap', gap: '10px', border: '2px solid #ccc', margin: '10px' }}>
                <h3 style={{ marginBottom: '10px', width: '100%' }}>Favorite Songs:</h3>
                {this.props.favoriteSongs.map((song, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', maxWidth: 'max-content' }}>
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
