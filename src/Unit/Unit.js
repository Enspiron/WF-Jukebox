import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const unitsImages = require.context('./chars', true);

class Unit extends React.Component {
    
    state = {
        showTooltip: false,
        showError: false
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
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            const alertElement = document.createElement('div');
            alertElement.innerHTML = `<div class="alert alert-danger" role="alert">Error handling JSON: ${error}</div>`;
            document.body.appendChild(<Alert severity="error">Error handling JSON: ${error}</Alert>);
            console.error('Error handling JSON:', error);
        }
    }



    componentDidMount() {
        window.addEventListener('resize', this.adjustTooltipPosition); // Adjust position on window resize
      }
    
      componentWillUnmount() {
        window.removeEventListener('resize', this.adjustTooltipPosition);
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
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const divStyle = {
            display: 'inline-block',
            padding: '5px',
            position: 'relative'
        };

        const noSong = {
            backgroundColor: 'red',
            margin: '0px',
            
        }

        const imgStyle = {
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            cursor: 'pointer',

        };

        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: this.props.char.songs != null ? '#fff' : 'red',
            ...theme.typography.body2,
            padding: theme.spacing(0.5),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }));

        return (
            <div
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}

                style={this.props.char.songs != null ? divStyle : { ...divStyle}}
            >            
                <Item>
                
            <Tooltip title={this.props.char.ENName} arrow>
                <img src={this.imageSource(this.props.name)} style={imgStyle} />
            </Tooltip>
                  
                </Item>
            </div>
        );
    }
}

export default Unit;


