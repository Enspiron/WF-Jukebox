import React, { useState, useEffect } from "react";
import './ComicViewer.css';
import Stack from '@mui/joy/Stack';

import SmallComic from './SmallComic.js';

import usePagination from './Pagination';
import { Pagination } from '@mui/joy';
import {default as data} from './gl0.json';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import ToggleButton from '@mui/material/ToggleButton';

import Radio, {radioClasses} from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Box from '@mui/joy/Box';



const comics = require('./gl0.json')
const en_comics = require('./en-comics.json')
const jp_comics = require('./jp-comics.json')
const tw_comics = require('./tw-comics.json')

const en_stella = require('./en-stella.json')
const jp_stella = require('./jp-stella.json')
const tw_stella = require('./tw-stella.json')


class ComicViewer extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickedComic = this.handleClickedComic.bind(this);
        this.state = {
            comic: 1,
            page: 1,
            PER_PAGE: 5,
            comic_source: "https://wfjukebox.b-cdn.net/comics/comics-en/1/base.png",
            episode: 1,
            language: 'EN',
            url_lang: 'comics-en',
            comic_lang: en_comics,
            mainUrl: 'https://wfjukebox.b-cdn.net/comics/',
            icon: '/small.png',
            base: '/base.png',
            large: '/large.png',
            isStella: false,
            playComicSound: false
        };
    }
    componentDidMount() {
        document.title = "Comic Viewer";
        const header = document.getElementById('Header_Title');
        // header.innerHTML = "Comic Viewer";

        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowLeft') {
                this.prevComic();
                event.stopImmediatePropagation();
            }
            if (event.key === 'ArrowRight') {
                this.nextComic();
                event.stopImmediatePropagation();

            }
        })
        
    }

    componentWillUnmount() {
        document.title = "Comic Viewer";
        const header = document.getElementById('Header_Title');
        header.innerHTML = "World Flipper Song Player";
    }

//https://wfjukebox.b-cdn.net/comics/comics-en/2/small.png
    setLanguage(value) {
        this.setState({language: value});
        this.setState({comic_source: this.buildUrl(value, 'base')})
    }

    buildUrl(lang, size, episode = this.state.episode, stella=this.state.isStella) {
        switch (lang) {
            case 'EN':
                if (stella) {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'stella-en/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'stella-en/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'stella-en/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                } else {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'comics-en/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'comics-en/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'comics-en/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                }
            case 'JP':
                if (stella) {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'stella-jp/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'stella-jp/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'stella-jp/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                } else {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'comics-jp/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'comics-jp/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'comics-jp/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                }
            case 'TW':
                if (stella) {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'stella-tw/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'stella-tw/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'stella-tw/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                } else {
                    switch (size) {
                        case 'base':
                            return this.state.mainUrl + 'comics-cn/' + episode + this.state.base;
                        case 'large':
                            return this.state.mainUrl + 'comics-cn/' + episode + this.state.large;
                        case 'icon':
                            return this.state.mainUrl + 'comics-cn/' + episode + this.state.icon;
                        default:
                            return '';
                    }
                }
            default:
                return '';
        }
    }


    handlePageChange = (event, value) => {
        this.setState({page: value});
    };
    
    handleClickedComic = (value) => {
        //value.episode is the episode number
        //value.title is the title
        
        console.log(value);
        console.log(this.buildUrl(this.state.language, 'base', value.episode));

        this.setState({episode: value.episode});
        this.setState({comic_source: this.buildUrl(this.state.language, 'base', value.episode)})
        // console.log(this.buildUrl(this.state.language, 'base'))
        document.getElementById("comic_window").scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    }

    nextComic = () => {
        if(this.state.episode < 353)
        this.setComicByEpisode(this.state.episode+1);

        document.getElementById("comic_window").scrollTo({ top: 0, left: 0});
    }

    prevComic = () => {
        if(this.state.episode > 1)
        this.setComicByEpisode(this.state.episode-1);
        document.getElementById("comic_window").scrollTo({ top: 0, left: 0});
    }

    setComicByEpisode = (episodeNumber = this.episode) => {
        // alert(episodeNumber);
        this.setState({
            comic: this.state.comic_lang[episodeNumber - 1],
            episode : episodeNumber,
            comic_source: this.buildUrl(this.state.language, 'base', episodeNumber)
        })
        
        console.log(this.state.comic_lang[episodeNumber - 1]);
      };

    onFieldChange = (event) => {
        if(event.target.name === 'Language') {
            console.log(event.target.value);
            this.setState({language : event.target.value})
            this.setState({comic_lang: this.checkLanguage(event.target.value)})        
        }
            
    }

    checkLanguage(language = this.state.language, stella = this.state.isStella) {
        switch (language) {
            case 'EN':
                return stella ? en_stella : en_comics;
            case 'JP':
                return stella ? jp_stella : jp_comics;
            case 'TW':
                return stella ? tw_stella : tw_comics;
            default:
                return stella ? comics : en_comics;
        }
    }

    keyPress = (event) => {
        console.log(event.key)
    }

    searchComic = (event) => {
        const searchTerm = event.target.value.toLowerCase();
    
        clearTimeout(this.typingTimer);
    
        this.typingTimer = setTimeout(() => {
            if (searchTerm === '') {
                this.setState({ comic_lang: this.checkLanguage(this.state.language) });
                return;
            }
    
            const filteredComics = this.state.comic_lang.filter(comic_ => {
                return comic_.title.toLowerCase().includes(searchTerm);
            });
    
            this.setState({ comic_lang: filteredComics });
        }, this.doneTypingInterval);
    }

    s_change = (event) => {
        this.setState({comic_source: this.buildUrl(this.state.language, 'base')})
        this.setState({s_target: event.target.value})
        console.log(event.target.value)
    }


    //https://wfjukebox.b-cdn.net/comics/comic.mp3
    playAudio = () => {
        const audio = new Audio('https://wfjukebox.b-cdn.net/comics/comic.mp3');
        this.setState({playComicSound: !this.state.playComicSound});
        if (this.state.playComicSound) {
            audio.play();
        } else {
            audio.pause();
        }

    }

    render() {
        const count = Math.ceil(data.length / this.state.PER_PAGE);
        const getComics = this.state.comic_lang;
        //this.setComicByEpisode(353)
        // this.setState({language: this.checkLanguage()})

        const search = document.getElementById('search');
        let typingTimer;
        const doneTypingInterval = 500;


        return (
            <div id="main_page">
                <div class="buttons" onChange={this.onFieldChange}>
                    <div>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                   <div></div>Language:
                <RadioGroup
                    identifier="language"
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="Language"
                    value={this.state.language}
                    onChange={(event) => this.setLanguage(event.target.value)}
                    sx={{
                    minHeight: 48,
                    padding: '4px',
                    borderRadius: '12px',
                    bgcolor: 'neutral.softBg',
                    '--RadioGroup-gap': '4px',
                    '--Radio-actionRadius': '8px',
                    }}
                >
                    {['EN',,'JP','TW'].map((item) => (
                    <Radio
                        key={item}
                        color="neutral"
                        value={item}
                        disableIcon
                        label={item}
                        variant="plain"
                        sx={{
                        px: 2,
                        alignItems: 'center',
                        }}
                        slotProps={{
                        action: ({ checked }) => ({
                            sx: {
                            ...(checked && {
                                bgcolor: 'background.surface',
                                boxShadow: 'sm',
                                '&:hover': {
                                bgcolor: 'background.surface',
                                },
                            }),
                            },
                        }),
                        }}
                    />
                    ))}
                </RadioGroup>
                <ToggleButton
                value="Stella Comics"
                
                selected={this.state.isStella}
                onChange={() => {
                    this.setState({isStella: !this.state.isStella})
                    this.setState({comic_lang: this.checkLanguage(this.state.language, !this.state.isStella)})

                }}
                > View Stella Comic</ToggleButton>
                {/* <ToggleButton
                value="Play Comic Sound"
                selected={this.state.playComicSound}
                onChange={() => {
                    this.playAudio();
                }}
                > Play Comic Music</ToggleButton> */}
    </Box>
                    </div>
                    <div style={{ display: 'flex',  alignItems: 'center', marginTop: '10px', marginLeft: '10px' }}>
                    <TextField id="outlined-basic" label="Search By Name" variant="outlined" onChange={this.searchComic} />
                    <TextField onChange={(e)=>{this.s_change(e)}} id="ep_s" label="EP#" variant="outlined" type="number" style={{width: '100px', marginLeft: '10px', marginRight: '10px'}}/>
                    <Button onClick={() => {this.setComicByEpisode(this.state.s_target)}}>Go</Button>
                    <Button  style={{ marginLeft: '10px', marginRight: '10px'}} onClick={()=>{this.prevComic()}}>&#60;</Button>
                    <Button onClick={()=>{this.nextComic()}}>&#62;</Button>
                    </div>
                </div>
                <div className="container">
                    <div className="comic_list">
                        {this.state.comic_lang.map((value) => (
                            <div onClick={()=>this.handleClickedComic(value)}>
                            <SmallComic
                                title={value.title}
                                episode={value.episode}
                                text={value.episode}
                                comic={this.buildUrl(this.state.language, 'icon', value.episode)}
                                />
                            </div>
                        ))}
                    </div>
                    <div >
                    <div class="viewer_container">

                    <br/>
                        <div id="comic_window" class="viewer comic_viewer">
                        {this.state.comic.title}
                        <img src={this.state.comic_source}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ComicViewer;