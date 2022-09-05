import React = require("react");
import { useState, useEffect } from "react";
import { StyledEngineProvider, Container } from "@mui/material";
import styled from "styled-components";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { MainTheme } from "./mainTheme";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { OrderView } from "./Order/OrderView";
import { App_routes } from "./App_routes";
import axios from "axios";
import { useAsync, useAsyncFn } from "react-use";
import { MainAppRoutes } from "./MainAppRoutes";

export const Main = ({}) => {
    //https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
    // window.localStorage.isMySessionActive = "false"; clean local storage

    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <MainAppRoutes />
                    {/* <Routes>
                        {isUserAuth &&
                            app_routes.map((route) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <StyledMainContainer
                                            maxWidth="xl"
                                            disableGutters={true}
                                        >
                                            {route.component}
                                        </StyledMainContainer>
                                    }
                                />
                            ))}

                        {!isUserAuth && (
                            <Route
                                path="/"
                                element={
                                    <StyledMainContainer
                                        maxWidth="xl"
                                        disableGutters={true}
                                    >
                                        <LoginPageView />
                                    </StyledMainContainer>
                                }
                            />
                        )}
                    </Routes> */}
                </BrowserRouter>
            </StyledEngineProvider>
        </MainTheme>
    );
};

// // ---------------------------------------------- Styled ----------------------------------------------- //

// const StyledMainContainer = styled(Container)`
//     background-color: ${({ theme }) => theme.colors.darkGrey};
//     width: 100%;
//     height: 100%;
//     max-width: 100%;
//     box-sizing: border-box;
//     font-family: ${({ theme }) => theme.typography.fontFamily};
// `;
