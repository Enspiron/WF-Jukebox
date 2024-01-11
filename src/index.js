import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledEngineProvider, CssVarsProvider } from '@mui/styled-engine';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const init_unit = {
  "Character": "",
  "Attribute": "Fire",
  "JPName": "\u30f4\u30a1\u30fc\u30b0\u30ca\u30fc",
  "ENName": "[The Hell-Fire Dragon King]\nWagner",
  "Role": "Bow",
  "LeaderBuff": "[Fire Dragon Style]\nFire characters' ATK +100% / Power flip damage +70%",
  "Skill": "[Prominence Breath]\nWith a breath of blazing fire, deal fire damage (27x) to enemies in front ",
  "SkillWait": "550",
  "Ability1": "Power flip damage +30%",
  "Ability2": "Every 5 power flips, own ATK +15% [MAX: +90%]",
  "Ability3": "[Main] Combo count needed for Lv3 power flip -5 & power flip damage +40%",
  "Ability4": "When battle begins, own skill gauge +50%",
  "Ability5": "Combo count needed for Lv3 power flip -2 & Lv3 power flip damage +5%",
  "Ability6": "Every Lv3 power flips, power flip damage +8% [MAX: +40%]",
  "Stance": "Attacker",
  "Race": "Dragon",
  "Gender": "Male",
  "DevNicknames": "fire_dragon",
  "Notes": "The \"Dev Nicknames\" are the internal character names that are used on the official World Flipper site and within the game programming itself. ",
  "OtherCommonNames": "Vagner",
  "Obtain": "",
  "Choice": "",
  "SubName": "\u7344\u708e\u306e\u9f8d\u738b",
  "FeverGain": "3",
  "HitCount": "30",
  "Rarity": 5,
  "MaxHP": 4233,
  "MaxATK": 888,
  "SkillIcon": "atk_front",
  "SkillRange": [
      "1",
      "1",
      "300",
      "2000",
      "0",
      "0",
      "0",
      "0"
  ],
  "InTaiwan": true,
  "Gauges": {
      "Ability4": {
          "Target": "own",
          "Condition": "",
          "Every": 0,
          "EveryCond": "",
          "IsMain": false,
          "Amount": "50"
      }
  },
  "ManaBoard2": true,
  "MaxGauges": {},
  "songs": [
      "wagner_2.mp3"
  ]
}

localStorage.setItem('popupShown', false);
const units = require('./characters.json');
//localStorage.setItem('

const root = ReactDOM.createRoot(document.getElementById('root'));
localStorage.setItem('clickedUnit', JSON.stringify(init_unit));

root.render(
  
  <React.StrictMode>

    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
