import React, { useEffect, useState, useRef } from 'react';
import { Box, Radio, RadioGroup, Typography, Divider, Button,  } from '@mui/joy';
import {ListItemButton , List, ListItemText } from '@mui/material/';
import musicParser from './musicParser.js';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip, IconButton } from '@mui/material';
import './EventBossMusic.css'

function EventBossMusic() {
    const music = require('./music.json');

    const bossesList = music.bosses;
    const eventList = music.events;
    //const case = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']

    const mainStory = music.world

    const DDragon = music['D-Dragon'];
    const SpiritBeast = music['Spirit Beast'];
    const Empress = music['Empress'];
    const Raid = music['Raid Event'];

    const story_bgm_types = ['Battle', 'Story', 'System']
    const [selected_type, set_selected_type] = useState(story_bgm_types[0]);
    const bossSongs = useRef(new Array());



    const [selectedStoryBGMType, setSelectedStoryBGMType] = useState(story_bgm_types[0]);
    const [bgm_type, setBgmType] = useState('Event Music');

    const [boss_series, setBossSeries] = useState(bossesList[0].name);
    const [event_name, setWFevent] = useState(eventList[0].name);
    const [main_story, setMainStory] = useState('W1');

    const [selectedType, setSelectedType] = useState(bossesList);
    const [selectedEvent, setSelectedEvent] = useState(music['D-Dragon']);

    const [selected_song, set_selected_song] = useState(musicParser(outputSelectedEvent, selectedStoryBGMType)[0]);

    const [selectedEventIndex, setSelectedEventIndex] = useState(0);

    const [song_url, setSongURL] = useState(buildSongURL());
    const [isLoading, setIsLoading] = useState(false);

    const [bossSong, setBossSong] = useState("");

    const bossTypes = ["Steam Bot"]
    const audioRef = useRef(null)
  useEffect(() => {
    document.title = 'Event Boss Music';
  }, []);

  useEffect(() => {
    // Ensure audioRef.current exists before accessing it
    console.log("Bgm type selected: ", bgm_type)
    // if(bgm_type !== 'Boss Music') {
    
    setSongURL(buildSongURL());
    if (song_url && !isLoading) {
        setIsLoading(true);
        audioRef.current.pause();
        audioRef.current.load();
        // audioRef.current.play();
        setIsLoading(false);
      }
      console.log(song_url)

    if(bgm_type === 'Boss Music') {
        console.log("Boss Song: ", bossSong)
        setSongURL(bossSong)
    }
    // } else if (bossTypes.includes(bgm_type)) {
    //     console.log("Boss Song: ", bossSong)
    //     setSongURL(bossSong)
    // }
  }, [song_url, audioRef, selected_song, bossSong]); // Run effect when song_url changes

  const handleRadioChange = (event, setValue) => {
      setValue(event.target.value);
      console.log(selectedEvent)
      // setSelectedEvent(music[event.target.value]);
      setSongURL(buildSongURL());
      setEvent();
  };

  const handleListClick = (event, index) => {
    console.log(selectedEvent);
    setSelectedEventIndex(index);
  }

  const handleBossClicked = (event, index) => {
    console.log("Clicked: ", event);
    setBossSong(event);
    setSongURL(event);
  }


  function outputSelectedEvent() {
    switch (bgm_type) {
        case 'Event Music':
            // setSelectedType(music.events)
            return event_name;
            case 'Boss Music':
            // setSelectedType(music.bosses)
            return boss_series;
        case 'Main Story':
            // setSelectedType(music.world)
            return main_story;
        default:
            return 'Error';
        
    }
  }

  function buildSongURL() {
    let source = "https://wfjukebox.b-cdn.net/music/event/"
    
    if(bgm_type === 'Event Music') {
    let event_id =  music.events.find(e => e.name === outputSelectedEvent()).id;
    

    switch(selectedStoryBGMType){
        case 'Battle':
            if(event_id === "xm19-event") {
                return source += event_id + "/" + selected_song;
            }else {
                source += event_id + "/battle/" + selected_song;
                return source;
            }
        case 'Story':
            source += event_id + "/story/" + selected_song;
            return source;
        case 'System':
            source += event_id + "/system/" + selected_song;
            return source;
        default:
            return source;

    }
    }
    if(bgm_type === 'Boss Music') {
        let boss_id = music.bosses.find(e => e.name === outputSelectedEvent()).id;
        
        source += boss_id + "/battle/" + selected_song;
        return source;
    }
    if(bgm_type === 'Main Story') {
        let world_id = music.world.find(e => e.name === outputSelectedEvent()).id;
        console.log("world id:  ",world_id)
        source = "https://wfjukebox.b-cdn.net/music/StoryBGM/"

        switch(selectedStoryBGMType) {
            case 'Battle':
                source += world_id + "/battle/" + selected_song;
                return source;
            case 'Story':
                source += world_id + "/story/" + selected_song;
                return source;
            default:
                return source;
        }
    }

  }

  function setEvent() {
    console.log(selectedEvent)
    //setSelectedEvent(outputSelectedEvent)
  }

  return (
    <html>

    <body>

    <div class="main_container">
        <div class="menu_container" >
        <Box 
        sx={{
            margin: '10px',
            width: 'fit-content',
            padding: '10px',
            borderRadius: '12px',
            border: '5px solid #ccc',
            height: '100%',
        }}
        >
            <h1>Event Boss Music</h1>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 
            }}>
                <RadioGroup
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="radio-buttons-group"
                    value={bgm_type}
                    onChange={(event) => handleRadioChange(event, setBgmType)}
                    sx={{
                        minHeight: 48,
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: 'neutral.softBg',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                    }}
                >
                    {['Event Music', 'Boss Music', 'Main Story'].map((item) => (
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
            </Box>

            {bgm_type === 'Event Music' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '5px'
                , maxHeight: '500px', overflow: 'scroll'

                }}>
                    <RadioGroup
                        orientation="vertical"
                        aria-labelledby="segmented-controls-example"
                        name="radio-buttons-group"
                        value={event_name}
                        onChange={(event) => handleRadioChange(event, setWFevent)}
                        sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                            display: 'grid',
                            // gridTemplateColumns: 'repeat(3, 1fr)',
                            // maxHeight: '100px',
                            // overflow: 'scroll',
                        }}
                    >
                        {eventList.map((item) => (
                            <Radio
                                value={item.name}
                                key={item.name}
                                color="neutral"
                                disableIcon
                                label={item.name}
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
                </Box>
            )}

            {bgm_type === 'Boss Music' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '5px' }}>
                    <RadioGroup
                        orientation="vertical"
                        aria-labelledby="segmented-controls-example"
                        name="radio-buttons-group"
                        value={boss_series}
                        onChange={(event) => handleRadioChange(event, setBossSeries)}
                        sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                        }}
                    >
                        {bossesList.map((item) => (
                            <Radio
                                value={item.name}
                                key={item}
                                color="neutral"
                                disableIcon
                                label={item.name}
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
                </Box>
            )}

            {bgm_type === 'Main Story' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '5px' }}>
                    <RadioGroup
                        orientation="vertical"
                        aria-labelledby="segmented-controls-example"
                        name="radio-buttons-group"
                        value={main_story}
                        onChange={(event) => handleRadioChange(event, setMainStory)}
                        sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                        }}
                    >
                        {mainStory.map((item) => (
                            <Radio
                                value={item.name}
                                key={item}
                                color="neutral"
                                disableIcon
                                label={
                                <div style={{ display: 'grid', margin: '0 auto', alignItems: 'center' }}>
                                    <div style={{margin: '0 auto 5px'}}>
                                        {item.name}
                                    </div>
                                    <div>
                                        <img src={item.icon}/>
                                    </div>
                                </div>
                                }
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
                </Box>
            )}
            
        </Box>
        </div>
        { bgm_type === "Event Music" && (
        <div >
            <div>
                <Box
                sx={{
                    margin: '10px',
                    width: 'fit-content',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '5px solid #ccc',
                    height: '100%',
                }}
                >
                <RadioGroup
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="radio-buttons-group"
                    value={selectedStoryBGMType}
                    onChange={(event) => handleRadioChange(event, setSelectedStoryBGMType)}
                    sx={{
                        minHeight: 48,
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: 'neutral.softBg',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                        width: 'fit-content'
                    }}
                >
                    {story_bgm_types.map((item) => (
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
                        />))}

                </RadioGroup>
                <div>
                    { outputSelectedEvent()+ " " + selectedStoryBGMType}
                    <div>
                        {
                            <div>
                            {/* {musicParser(outputSelectedEvent, selectedStoryBGMType).map((item) => (<div>{item}</div>))} */}
                            <RadioGroup
                        orientation="vertical"
                        aria-labelledby="segmented-controls-example"
                        name="radio-buttons-group"
                        value={selected_song}
                        onChange={(event) => handleRadioChange(event, set_selected_song)}
                        sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                            display: 'grid',
                            // gridTemplateColumns: 'repeat(3, 1fr)',
                            // maxHeight: '100px',
                            // overflow: 'scroll',
                        }}
                    >
                        {musicParser(outputSelectedEvent, selectedStoryBGMType).map((item) => (
                            <Radio
                                value={item}
                                key={item}
                                color="neutral"
                                disableIcon
                                label={item}
                                variant="plain"
                                sx={{
                                    px: 2,
                                    alignItems: 'center',
                                    maxHeight: '20px'
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
                            
                            </div>
                        }
                    </div>
                </div>
                </Box>
            </div>
            
        </div>
        )}

        { bgm_type === "Main Story" && (
            <div>
                <Box
                sx={{
                    margin: '10px',
                    width: 'fit-content',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '5px solid #ccc',
                    height: '100%',
                }}
                >
                <RadioGroup
                    orientation="horizontal"
                    aria-labelledby="segmented-controls-example"
                    name="radio-buttons-group"
                    value={selectedStoryBGMType}
                    onChange={(event) => handleRadioChange(event, setSelectedStoryBGMType)}
                    sx={{
                        minHeight: 48,
                        width: '100%',
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: 'neutral.softBg',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                        width: 'fit-content'
                    }}
                >
                    {["Battle", "Story"].map((item) => (
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
                                width: '50%'
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
                        />))}

                </RadioGroup>
                <div>
                    { outputSelectedEvent()+ " " + selectedStoryBGMType}
                    <div>
                        {
                            <div>
                            {/* {musicParser(outputSelectedEvent, selectedStoryBGMType).map((item) => (<div>{item}</div>))} */}
                            <RadioGroup
                        orientation="vertical"
                        aria-labelledby="segmented-controls-example"
                        name="radio-buttons-group"
                        value={selected_song}
                        onChange={(event) => handleRadioChange(event, set_selected_song)}
                        sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                            display: 'grid',
                            maxHeight: '400px',
                            overflow: 'scroll',
                            // gridTemplateColumns: 'repeat(3, 1fr)',
                            // maxHeight: '100px',
                            // overflow: 'scroll',
                        }}
                    >
                        {musicParser(outputSelectedEvent, selectedStoryBGMType, "Main Story").map((item) => (
                            <Radio
                                value={item}
                                key={item}
                                color="neutral"
                                disableIcon
                                label={item}
                                variant="plain"
                                sx={{
                                    px: 2,
                                    alignItems: 'center',
                                    maxHeight: '20px'
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
                            
                            </div>
                        }
                    </div>
                </div>
                </Box>
            </div>

        )
        
        }

       { bgm_type === 'Boss Music' && (<div className="selection_container">
            
            <Box
            sx={{
                margin: '10px',
                width: 'fit-content',
                padding: '10px',
                borderRadius: '12px',
                border: '5px solid #ccc',
                height: '100%',
            }}
            >
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <RadioGroup
                    orientation="vertical"
                    aria-labelledby="segmented-controls-example"
                    name="radio-buttons-group"
                    value={selectedStoryBGMType}
                    onChange={(event) => handleRadioChange(event, setSelectedStoryBGMType)}
                    sx={{
                        minHeight: 48,
                        width: '100%',
                        padding: '4px',
                        borderRadius: '12px',
                        bgcolor: 'neutral.softBg',
                        '--RadioGroup-gap': '4px',
                        '--Radio-actionRadius': '8px',
                        width: 'fit-content'
                    }}
                >
                {music[outputSelectedEvent()].map((item, index) => (
                    // console.log(item)
                    <Radio
                        key={item.element}
                        color="neutral"
                        value={item.element}
                        disableIcon
                        label={<div>
                            <img style={{height: '50px'}} src={item.banner}  />
                        </div>}
                        variant="plain"
                        sx={{
                            px: 2,
                            alignItems: 'center',
                            width: 'fit-content'
                        }}
                        onChange={(event) => {handleBossClicked(item.song)}}
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
                    ><img src={item.icon} /></Radio>
                    ))
                    }
             </RadioGroup>
            </Box>
             </Box>
            </div>)}
            <div>
            <Box
                sx={{
                    margin: '10px',
                    width: 'fit-content',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '5px solid #ccc',
                    height: '50%%',
                }}
                >
                {/* {selectedEventIndex} */}
                <audio ref={audioRef} controls loop>
                    <source src={song_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <Tooltip
                title="Copy URL"
                arrow
                size='lg'
                position="top"
                
                >
                <IconButton onClick={() => navigator.clipboard.writeText(song_url)}>
                    {<ContentCopyIcon/>}
                </IconButton>
                </Tooltip>
                {/* <div a href={song_url}>{(song_url)}</div> */}
                </Box>
            </div>
            
    </div>
    <div>

    </div>
    </body>
    </html>

);
}

export default EventBossMusic;
