import React from 'react';
const unitsImages = require.context('./chars', true);

class Unit extends React.Component {
    state = {
        showTooltip: false
    };


    handleMouseEnter = () => {
        this.setState({ showTooltip: true });
        
    }

    handleMouseLeave = () => {
        this.setState({ showTooltip: false });
    }

    handleClick = () => {
        document.title = "MP3 Player";
        try {
            localStorage.setItem('clickedUnit', JSON.stringify(this.props.char));
            const clickedUnit = localStorage.getItem('clickedUnit');
            if (clickedUnit) {
                const parsedUnit = JSON.parse(clickedUnit);
                console.log(parsedUnit);
            }
        } catch (error) {
            console.error('Error handling JSON:', error);
        }
        window.dispatchEvent(new Event('storage'));
    }

    adjustTooltipPosition = () => {
        const tooltip = document.getElementById('tooltip');
        if (tooltip && !this.state.showTooltip) {
            tooltip.style.display = 'block';
            tooltip.style.top = 'calc(100% + 5px)';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.zIndex = 1;
            tooltip.style.whiteSpace = 'nowrap';
        }
    }

    imageSource(name) {
        const importAll = (r) => {
            return r.keys().map(r);
          };

          const images = importAll(require.context('./chars/', false, /\.(png)$/));

        //const unitImage = require.context('./chars/' + name + "/square_0.png");
        //return(unitImage)
        return("https://eliya-bot.herokuapp.com/img/assets/chars/" + name + "/square_0.png")
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
            top: 'calc(100% + 5px)', // Adjusted for slight offset
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'lightblue',
            color: 'black',
            padding: '5px',
            borderRadius: '5px',
            display: this.state.showTooltip ? 'block' : 'none',
            zIndex: 1, // Ensure tooltip appears on top
            whiteSpace: 'nowrap', // Prevent text wrapping
          };

        return (
            <div
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={this.props.char.songs != null ? divStyle : { ...divStyle, ...noSong }}
            >
                
                <img src={this.imageSource(this.props.name)} style={imgStyle} />
                <div id="tooltip" style={tooltipStyle}>
                    {this.props.char.ENName}
                </div>
            </div>
        );
    }
}

export default Unit;


