import { Container } from "@mui/material";
import React = require("react");
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MenuNav } from "./MenuNav";

export const MainContainer = ({
    children,
    isNavDisplay = true,
}: {
    children?: React.ReactNode;
    isNavDisplay?: boolean;
}) => {
    return (
        <>
            {isNavDisplay && <MenuNav />}
            <StyledMainContainer
                maxWidth="xl"
                disableGutters={true}
                $isDisplayMenu={isNavDisplay}
            >
                {children}
            </StyledMainContainer>
        </>
    );
};

const StyledMainContainer = styled(Container)<{ $isDisplayMenu: any }>`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    width: 100%;
    padding-left: ${(props) => (props.$isDisplayMenu ? "min(35px, 2vw)" : 0)};
    height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.typography.fontFamily};
`;
