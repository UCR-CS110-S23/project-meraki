// import constants from './constants.js';

export const getDesignTokens = (mode) => ({
    shape: {
        borderRadius: 0,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { minWidth: 0 }
            }
        }
    },
    palette: {
        mode,
        ...(mode === 'light' ?
            {
                primary: {
                    // light: will be calculated from palette.primary.main,
                    main: '#6b95f5', //color of room boxes + page links like edit profile
                    contrastText: "#fff" //color of text within the room boxes
                },
                secondary: {
                    main: '#e06c9e',
                },
                background: {
                    panel: '#e8e8e8',
                    paper: '#f5f5f5',
                    default: '#fff',
                    darkdefault: "#dfe0e4"
                },
                text: {
                    gray: '#aaa'
                }
            } :
            {
                // palette values for dark mode
                primary: {
                    main: "#FDCDC5", //color of room boxes + page links like edit profile
                    dark: '#2baa76', //color of text within the room boxes
                    light: '#1e8b6930'
                },
                secondary: {
                    main: '#ea6627',
                },
                background: {
                    panel: '#414141',
                    paper: '#414141',
                    default: '#292929',
                    darkdefault: "#333"
                },
                text: {
                    primary: "#e2e2e2",
                    gray: "#808080"
                }
            }
        )
    },
});