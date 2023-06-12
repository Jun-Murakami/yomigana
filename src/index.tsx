import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@fluentui/react/lib/Theme';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

initializeIcons();
const myTheme = createTheme({
  defaultFontStyle: { fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 'regular' },
  fonts: {
    medium: {
      fontFamily: 'Noto Sans JP, sans-serif',
      fontWeight: 'regular',
      fontSize: '11pt',
    },},
  palette: {
    themePrimary: '#6958e1',
    themeLighterAlt: '#f8f8fe',
    themeLighter: '#e5e2fa',
    themeLight: '#cec9f6',
    themeTertiary: '#a096ed',
    themeSecondary: '#786ae4',
    themeDarkAlt: '#5d4fca',
    themeDark: '#4f43ab',
    themeDarker: '#3a317e',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralSecondaryAlt: '#8a8886',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  }});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
