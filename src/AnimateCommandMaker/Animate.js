import React from 'react';
import {useState, useEffect, useRef} from 'react';

import {TextField, Button} from '@mui/material';
import {Textarea} from '@mui/joy';
/*
animateBoss [option]
Create animated gif based on specific sprite_sheet with .parts / .timeline / .atlas file. .parts file is required to execute this command.

If you want to generate animated GIF of common characters (as in character/*), use the animate command instead

Options:
-sprite <path_to_sprite> Specify path to the sprite_sheet you want to generate animated GIFs based on parts file located along with the sprite. Required.

-scale <ratio> Specify scale of generated GIF. default to 1.

-meta <partsName> Specify name root of the parts/timeline/atlas file, if you'd like to pick just one. if this is not specified, command will target all the parts file that is found within target directory.

-merge If this flag is set, while generating GIFs, tool will try to merge same group of GIFs into a single GIF, such as skill_start1, skill_charge1, skill_attack1, skill_attack_loop1, skill_attack_end1

-frameMs <milliseconds> Specify the time span of a single frame, in milliseconds. Default to 16 (60 frames in one second)

-mergeLoopAmount <int> While merging, loop animations will loop number of times as specified. Default to 8.

-mergeChargeAmount <int> While merging, charge animations will loop number of times as specified. Default to 3.

Example:
animateBoss -sprite battle/boss/maou_2nd/maou_2nd -scale 2 -merge

animateBoss -meta high_epuration_boss_3anv -sprite battle/boss/high_epuration_boss_3anv/high_epuration_boss_3anv -scale 4 -merge

*/ 

function MakeCommand(bossID, spriteLocation) {
    return `animateBoss -sprite ${spriteLocation}/${bossID} -meta `;
}

function Animate() {
    const bossID = useRef();
    const spriteLocation = useRef();
    const [command, setCommand] = useState("");

    const handleBossIDChange = () => {
        const bossIDValue = bossID.current.value;
        const spriteLocationValue = spriteLocation.current.value;
        const newCommand = MakeCommand(bossIDValue, spriteLocationValue);
        setCommand(newCommand);
    };

    const handleSpriteLocationChange = () => {
        const bossIDValue = bossID.current.value;
        const spriteLocationValue = spriteLocation.current.value;
        const newCommand = MakeCommand(bossIDValue, spriteLocationValue);
        setCommand(newCommand);
    };

    return (
        <div>
            <h1>Animation Command Maker</h1>
            <div id="form">
                <TextField
                    id="outlined-basic"
                    label="Boss ID"
                    variant="outlined"
                    ref={bossID}
                    onChange={handleBossIDChange}
                />
                <TextField
                    id="outlined-basic"
                    label="Sprite Location"
                    variant="outlined"
                    ref={spriteLocation}
                    onChange={handleSpriteLocationChange}
                />
                <Button variant="contained">Default</Button>
            </div>
            <div>
                <TextField disabled value={command} />
            </div>
        </div>
    );
}

export default Animate;

