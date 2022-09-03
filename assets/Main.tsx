import React = require("react");
import { useState } from "react";
import { Button, StyledEngineProvider } from "@mui/material";
import styled from "styled-components";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { MainTheme } from "./mainTheme";
export const Main = ({}) => {
    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <StyledMainContainer>
                    <LoginPageView />
                </StyledMainContainer>
            </StyledEngineProvider>
        </MainTheme>
    );
};

// ---------------------------------------------- Styled ----------------------------------------------- //

const StyledMainContainer = styled.div`
    background-color: red;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.typography.fontFamily};
`;
