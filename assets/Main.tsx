import React = require("react");
import { StyledEngineProvider } from "@mui/material";
import { MainTheme } from "./mainTheme";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { AuthProvider, useAuth } from "./AuthProvider";
import { MainContainer } from "./MainContainer";
import { OrderView } from "./Order/OrderView";
import { useState } from "react";

export const Main = ({}) => {
    const [isUserConnected, setIsUserConnected] = useState(false);

    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route
                                element={
                                    <HomeLayout
                                        setIsUserConnected={setIsUserConnected}
                                    />
                                }
                            >
                                <Route path="/" element={<LoginPageView />} />
                            </Route>
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedLayout
                                        isUserConnected={isUserConnected}
                                    />
                                }
                            >
                                <Route index={true} element={<OrderView />} />
                                {/* --- Insert Other Page Here ---- */}
                            </Route>
                            <Route
                                path="/dashboard/expert"
                                element={
                                    <ProtectedLayout
                                        isUserConnected={isUserConnected}
                                    />
                                }
                            >
                                {/* --- Insert Expert Page Here ---- */}
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </StyledEngineProvider>
        </MainTheme>
    );
};

const HomeLayout = ({ setIsUserConnected }: { setIsUserConnected: any }) => {
    const { isUserConnected } = useAuth();

    React.useEffect(() => {
        setIsUserConnected(isUserConnected);
    }, [isUserConnected]);

    if (isUserConnected) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};

export const ProtectedLayout = ({
    isUserConnected,
}: {
    isUserConnected: boolean;
}) => {
    if (!isUserConnected) {
        return <Navigate to="/" />;
    }

    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};
