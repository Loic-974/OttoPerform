import { Button, Drawer } from "@mui/material";
import React = require("react");
import { Link, Navigate } from "react-router-dom";
import { useAsync } from "react-use";
import styled from "styled-components";
import { ALL_ROUTES } from "./App_routes";

export const MenuNav = ({}: {}) => {
    const [showDrawer, setShowDrawer] = React.useState(false);

    const app_routes = useAsync(async () => ALL_ROUTES(), []).value;

    return (
        <StyledMenuNav>
            <Drawer
                anchor={"left"}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
            >
                {app_routes?.map((route) => (
                    <Link to={route.path} key={route.name}>
                        {route.name}
                    </Link>
                ))}
            </Drawer>
            <StyledTrigger onClick={() => setShowDrawer(true)}></StyledTrigger>
        </StyledMenuNav>
    );
};

const StyledMenuNav = styled.div`
    z-index: 1000;
    position: fixed;
    height: 100%;
    width: min(30px, 2vw);
    background-color: red;
`;

const StyledTrigger = styled.div`
    width: auto;
    height: 100%;
`;
