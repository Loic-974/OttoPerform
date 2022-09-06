import { Container } from "@mui/material";
import React = require("react");
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const MainContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <StyledMainContainer maxWidth="xl" disableGutters={true}>
            {children}
        </StyledMainContainer>
    );
};

const StyledMainContainer = styled(Container)`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    width: 100%;
    height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.typography.fontFamily};
`;
