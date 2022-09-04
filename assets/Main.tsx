import React = require("react");
import { useState } from "react";
import { Button, StyledEngineProvider, Container } from "@mui/material";
import styled from "styled-components";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { MainTheme } from "./mainTheme";
export const Main = ({}) => {
    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <StyledMainContainer maxWidth="xl" disableGutters={true}>
                    <LoginPageView />
                </StyledMainContainer>
            </StyledEngineProvider>
        </MainTheme>
    );
};

// ---------------------------------------------- Styled ----------------------------------------------- //

const StyledMainContainer = styled(Container)`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    width: 100%;
    height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.typography.fontFamily};
`;
