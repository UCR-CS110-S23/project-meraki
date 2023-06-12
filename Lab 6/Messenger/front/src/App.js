import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getDesignTokens } from './themes/theme';
import { IconButton } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ScreenHandler from './ScreenHandler';

let reached = false;
let adjusting = 0;

function App() {
  const [selectedScreen, setSelectedScreen] = React.useState(0);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    if (localStorage.getItem('mode') !== null)
      setMode(localStorage.getItem('mode'));
    else
      setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  React.useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
        // localStorage.setItem('mode', mode)
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const ColorModeContext = React.createContext({
    toggleColorMode: () => {
      // This is intentional
    }
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScreenHandler />
        <IconButton style={{ zIndex: 5, position: "absolute", top: 10, right: 10 }} onClick={colorMode.toggleColorMode} aria-label="delete">
          {mode === 'light' ? <BedtimeIcon /> : <LightModeIcon />}
        </IconButton>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

