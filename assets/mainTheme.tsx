import React = require("react");
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const OXXO_COLORS = {
    colors: {
        darkRed: "#AB2A13",
        mediumRed: "#B71C00",
        lightRed: "#F44829",
        darkGrey: "#312C2C",
        lightGrey: "#eceaeb",
        mediumGrey: "#C9C5C6",
        hardGrey: "#777072",
        darkOrange: "#ce7604",
        mediumOrange: "#F2A116",
        lightOrange: "#FFB940",
        lightBlue: "#60D8DF",
        clearBlue: "#c1f9fc",
        mediumBlue: "#30AFB6",
        darkBlue: "#118a91",
        mediumGreen: "#057a2c",
    },
};

export const mainMuiTheme: Theme = createTheme({
    typography: {
        fontFamily: ["Roboto", "Helvetica", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            light: "#60D8DF",
            main: "#14a9b1",
            dark: "#057b81",
            contrastText: "#eceaeb",
        },
        secondary: {
            light: "#F44829",
            main: "#B71C00",
            dark: "#AB2A13",
            contrastText: "#eceaeb",
        },
    },
});

export const mainThemeStyledComponent = {
    ...mainMuiTheme,
    ...OXXO_COLORS,
};

export const MainTheme = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={mainMuiTheme}>
        <StyledThemeProvider theme={mainThemeStyledComponent}>
            {children}
        </StyledThemeProvider>
    </ThemeProvider>
);
