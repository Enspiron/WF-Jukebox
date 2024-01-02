import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const unitsImages = require.context('./chars', true);

class Unit extends React.Component {
    state = {
        showTooltip: false
    };


    handleMouseEnter = () => {
        this.setState({ showTooltip: true });
        const tooltip = document.querySelector('#tooltip');
        if (tooltip) {
          const tooltipRect = tooltip.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
    
          // Check for collisions with window edges
          if (tooltipRect.right > windowWidth) {
            tooltip.style.left = windowWidth - tooltipRect.width - 50 + 'px'; // Align to the right edge
          }
          if (tooltipRect.bottom > windowHeight) {
            tooltip.style.top = windowHeight - tooltipRect.height - 5 + 'px'; // Align to the bottom edge
          }
        }
        
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



    componentDidMount() {
        window.addEventListener('resize', this.adjustTooltipPosition); // Adjust position on window resize
      }
    
      componentWillUnmount() {
        window.removeEventListener('resize', this.adjustTooltipPosition);
      }

    position_tooltip(){
        // Get .ktooltiptext sibling
        var tooltip = this.parentNode.querySelector("tooltip");
        
        // Get calculated ktooltip coordinates and size
        var ktooltip_rect = this.getBoundingClientRect();
      
        var tipX = ktooltip_rect.width + 5; // 5px on the right of the ktooltip
        var tipY = -40;                     // 40px on the top of the ktooltip
        // Position tooltip
        tooltip.style.top = tipY + 'px';
        tooltip.style.left = tipX + 'px';
      
        // Get calculated tooltip coordinates and size
        var tooltip_rect = tooltip.getBoundingClientRect();
        // Corrections if out of window
        if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) // Out on the right
          tipX = -tooltip_rect.width - 5;  // Simulate a "right: tipX" position
        if (tooltip_rect.y < 0)            // Out on the top
          tipY = tipY - tooltip_rect.y;    // Align on the top
      
        // Apply corrected position
        tooltip.style.top = tipY + 'px';
        tooltip.style.left = tipX + 'px';
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
            left: '90%',
            transform: 'translateX(-50%)',
            backgroundColor: 'lightblue',
            color: 'black',
            padding: '5px',
            borderRadius: '5px',
            display: this.state.showTooltip ? 'inline-block' : 'none',
            zIndex: 1, // Ensure tooltip appears on top
            whiteSpace: 'nowrap', // Prevent text wrapping
            visibility: 'visible',
          };

        return (
            <div
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}

                style={this.props.char.songs != null ? divStyle : { ...divStyle, ...noSong }}
            >
                
                <Tooltip title={this.props.char.ENName} arrow>
                <img src={this.imageSource(this.props.name)} style={imgStyle} />
                  
                </Tooltip>
            </div>
        );
    }
}

export default Unit;


