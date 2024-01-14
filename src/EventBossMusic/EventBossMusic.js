import React, { useEffect, useState } from 'react';
import { Box, Radio, RadioGroup, Typography } from '@mui/joy';

import './EventBossMusic.css'

function EventBossMusic() {
    const music = require('./music.json');

    const bossesList = music.bosses;
    const eventList = ['First Anni', 'Second Anni'];
    //const case = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']

    const mainStory = music.world

    const [bgm_type, setBgmType] = useState('Event Music');

    const [boss_series, setBossSeries] = useState(bossesList[0].name);
    const [event_name, setWFevent] = useState(eventList[0]);
    const [main_story, setMainStory] = useState('W1');

  useEffect(() => {
    document.title = 'Event Boss Music';
  }, []);

  const handleRadioChange = (event, setValue) => {
    setValue(event.target.value);
  };

  function outputSelectedEvent() {
    switch (bgm_type) {
        case 'Event Music':
            return event_name;
        case 'Boss Music':
            return boss_series;
        case 'Main Story':
            return main_story;
        default:
            return 'Error';
        
    }
  }

  return (
    <div class="main_container">
        <div class="menu_container">
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '5px' }}>
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
                        }}
                    >
                        {eventList.map((item) => (
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
                                    <div>
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
        <div class="selection_container">
            <div>
                {outputSelectedEvent()}
            </div>
        </div>
    </div>
);
}

export default EventBossMusic;
