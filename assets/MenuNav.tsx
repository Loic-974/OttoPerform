import { Button, Drawer } from "@mui/material";
import React = require("react");
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAsync } from "react-use";
import styled from "styled-components";
import { ALL_ROUTES } from "./App_routes";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export const MenuNav = ({}: {}) => {
    const [showDrawer, setShowDrawer] = React.useState(false);

    const app_routes = useAsync(async () => ALL_ROUTES(), []).value;

    const location = useLocation();

    return (
        <StyledMenuNav>
            <StyledDrawer
                anchor={"left"}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
            >
                <>
                    <p>OXXO Perform</p>
                    {app_routes?.map((route) => (
                        <StyledLink
                            to={route.path}
                            key={route.name}
                            $active={location.pathname === route.path}
                        >
                            {route.name}
                        </StyledLink>
                    ))}
                </>
            </StyledDrawer>
            <StyledTrigger onClick={() => setShowDrawer(true)}>
                <ArrowForwardIosIcon htmlColor="#E7E4E5" />
            </StyledTrigger>
        </StyledMenuNav>
    );
};

const StyledMenuNav = styled.div`
    z-index: 1000;
    position: fixed;
    height: 100%;
    width: min(30px, 2vw);
    background-color: ${({ theme }) => theme.colors.darkGrey};
    box-shadow: 1px 0px 6px #2e2e2ea7;
`;

const StyledTrigger = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const StyledDrawer = styled(Drawer)`
    .MuiPaper-root.MuiDrawer-paper {
        background-color: ${({ theme }) => theme.colors.darkGrey};
        color: ${({ theme }) => theme.colors.lightGrey};
        padding: 48px 8px;
        text-align: center;

        p {
            font-weight: bold;
        }
    }
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.lightGrey};
    padding: 12px 24px;
    margin: 8px 0;
    text-align: center;
    border-top: ${(props) => (props.$active ? "none" : "1px solid #E7E4E5")};
    border-bottom: ${(props) => (props.$active ? "none" : "1px solid #E7E4E5")};
    background-color: ${(props) =>
        props.$active ? props.theme.colors.mediumRed : "transparent"};
    :hover {
        background-color: ${({ theme }) => theme.colors.lightRed};
    }
    font-weight: 300;
`;
