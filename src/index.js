import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { StyledEngineProvider, CssVarsProvider } from '@mui/styled-engine';
import { BrowserRouter, HashRouter } from 'react-router-dom';



localStorage.setItem('popupShown', false);


const root = ReactDOM.createRoot(document.getElementById('root'));

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
