import React from 'react';

class Unit extends React.Component {
    state = {
        showTooltip: false
    };

    handleClick = () => {
        localStorage.setItem('clickedUnit', JSON.stringify(this.props.char));
        //console.log(JSON.parse(localStorage.getItem('clickedUnit')));
        window.dispatchEvent(new Event('storage'));

    }
    handleMouseEnter = () => {
        this.setState({ showTooltip: true });
        
    }

    handleMouseLeave = () => {
        this.setState({ showTooltip: false });
    }

    render() {
        const divStyle = {
            display: 'inline-block',
            padding: '5px',
            position: 'relative'
        };

        const noSong = {
            backgroundColor: 'red',
            margin: '5px',

        }

        const imgStyle = {
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            cursor: 'pointer',

        };

        const tooltipStyle = {
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'lightblue',
            color: 'black',
            padding: '5px',
            borderRadius: '5px',
            display: this.state.showTooltip ? 'block' : 'none',
            zIndex: 1, // Add this line to make the tooltip appear on top
            whiteSpace: 'nowrap' // Add this line to make the tooltip text always one line
        };

        return (
            <div
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={this.props.char.songs != null ? divStyle : { ...divStyle, ...noSong }}
            >
                <img src={"https://eliya-bot.herokuapp.com/img/assets/chars/" + this.props.name + "/square_0.png"} style={imgStyle} />
                <div style={tooltipStyle}>
                    {this.props.char.ENName}
                </div>
            </div>
        );
    }
}

export default Unit;


