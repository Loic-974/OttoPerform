import React = require("react");
import { StyledEngineProvider } from "@mui/material";
import { MainTheme } from "./mainTheme";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { AuthProvider, useAuth } from "./AuthProvider";
import { MainContainer } from "./MainContainer";
import { OrderView } from "./Order/OrderView";
import { useState } from "react";
import { ALL_ROUTES } from "./App_routes";
import { useAsync } from "react-use";

export const Main = ({}) => {
    const [isUserConnected, setIsUserConnected] = useState(true);

    const all_routes = useAsync(
        async () => await ALL_ROUTES(),
        [isUserConnected]
    ).value;

    return (
        <MainTheme>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <HomeLayout
                                        setIsUserConnected={setIsUserConnected}
                                    />
                                }
                            >
                                <Route index element={<LoginPageView />} />
                            </Route>

                            {all_routes?.map((route) =>
                                route.isIndex ? (
                                    <Route
                                        index={true}
                                        element={
                                            <ProtectedLayout
                                                setIsUserConnected={
                                                    setIsUserConnected
                                                }
                                            >
                                                {route.component}
                                            </ProtectedLayout>
                                        }
                                        key={route.path}
                                    />
                                ) : (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={
                                            <ProtectedLayout
                                                setIsUserConnected={
                                                    setIsUserConnected
                                                }
                                            >
                                                {route.component}
                                            </ProtectedLayout>
                                        }
                                    />
                                )
                            )}
                            {/* <Route path="*" element={<p>not found</p>} /> */}
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
        return <Navigate to="/orders" replace={true} />;
    }

    return (
        <MainContainer isNavDisplay={false}>
            {!isUserConnected ? <Outlet /> : <p>toto</p>}
        </MainContainer>
    );
};

export const ProtectedLayout = ({
    setIsUserConnected,
    children,
}: {
    setIsUserConnected: any;
    children: React.ReactNode;
}) => {
    const { isUserConnected } = useAuth();

    const location = useLocation(); // react-router-dom

    React.useEffect(() => {
        setIsUserConnected(isUserConnected);
    }, [isUserConnected]);

    if (!isUserConnected) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <MainContainer>
            {/* <Outlet key="ok" /> */}
            {children}
        </MainContainer>
    );
};
