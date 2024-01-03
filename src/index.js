import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledEngineProvider, CssVarsProvider } from '@mui/styled-engine';

localStorage.setItem('popupShown', false);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <React.StrictMode>
    <div className="navbar">
    <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>

      

    </div>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
