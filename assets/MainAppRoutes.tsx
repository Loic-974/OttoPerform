import { Container } from "@mui/material";
import axios from "axios";
import React = require("react");
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import styled from "styled-components";
import { App_routes } from "./App_routes";
import { EUserRole } from "./Enum/EUserRole";
import { LoginPageView } from "./LoginPage/LoginPageView";

interface IConnexion {
    connexionAllowed: boolean;
    userRole: EUserRole;
}

export const MainAppRoutes = ({}: {}) => {
    const [isUserAuth, getIsUserAuth] = useAsyncFn(
        async (userEmail: string, password: string) => {
            const query = await axios.post<IConnexion>("user/userConnexion", {
                userEmail: userEmail ?? "",
                password: password ?? "",
            });
            const data = query.data.connexionAllowed;
            return data;
        },
        []
    );

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isUserAuth) {
            navigate("/");
        }
    }, [isUserAuth]);

    return (
        <Routes>
            {isUserAuth &&
                App_routes.map((route) => (
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
                            <LoginPageView onLogin={getIsUserAuth} />
                        </StyledMainContainer>
                    }
                />
            )}
        </Routes>
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
