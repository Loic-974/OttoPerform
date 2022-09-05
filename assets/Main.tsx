import React = require("react");
import { StyledEngineProvider } from "@mui/material";
import { MainTheme } from "./mainTheme";
import { BrowserRouter } from "react-router-dom";
import { MainAppRoutes } from "./MainAppRoutes";

export const Main = ({}) => {
    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <MainAppRoutes />
                </BrowserRouter>
            </StyledEngineProvider>
        </MainTheme>
    );
};
