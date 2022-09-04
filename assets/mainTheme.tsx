import React = require("react");
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const OXXO_COLORS = {
    colors: {
        darkRed: "#AB2A13",
        mediumRed: "#B71C00",
        lightRed: "#F44829",
        darkGrey: "#312C2C",
        lightGrey: "#E7E4E5",
        mediumGrey: "#C9C5C6",
        mediumOrange: "#F2A116",
        lightOrange: "#FFB940",
        lightBlue: "#60D8DF",
        mediumBlue: "#30AFB6",
        darkBlue: "#268D93",
    },
};

export const mainMuiTheme: Theme = createTheme({
    typography: {
        fontFamily: ["Roboto", "Helvetica", "sans-serif"].join(","),
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
