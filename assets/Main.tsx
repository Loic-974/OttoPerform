import React = require("react");
import { useState, useEffect } from "react";
import { StyledEngineProvider, Container } from "@mui/material";
import styled from "styled-components";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { MainTheme } from "./mainTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OrderView } from "./Order/OrderView";

export const Main = ({}) => {
    const [isUserAuth, setIsUserAuth] = useState<boolean>();
    //https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
    // window.localStorage.isMySessionActive = "false"; clean local storage
    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <Routes>
                        {isUserAuth && (
                            <Route
                                path="/test"
                                element={
                                    <StyledMainContainer
                                        maxWidth="xl"
                                        disableGutters={true}
                                    >
                                        <OrderView />
                                    </StyledMainContainer>
                                }
                            />
                        )}
                        {!isUserAuth && (
                            <Route
                                path="/"
                                element={
                                    <StyledMainContainer
                                        maxWidth="xl"
                                        disableGutters={true}
                                    >
                                        <LoginPageView
                                            setAuth={setIsUserAuth}
                                        />
                                    </StyledMainContainer>
                                }
                            />
                        )}
                    </Routes>
                </BrowserRouter>
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
