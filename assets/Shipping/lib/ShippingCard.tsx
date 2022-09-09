import { Card, CardContent, CardHeader } from "@mui/material";
import React = require("react");
import styled from "styled-components";

export const ShippingCard = ({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}) => {
    return (
        <StyledCard>
            <StyledCardHeader title={title} />
            <StyledCardContent>{children}</StyledCardContent>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    width: 80%;
    background-color: ${({ theme }) => theme.colors.darkGrey};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const StyledCardHeader = styled(CardHeader)`
    text-align: center;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 6px;
    max-height: 250px;

    .MuiTypography-root {
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.lightGrey};
    }
    .MuiCardHeader-content {
        width: 80%;
        flex: none;
        padding-bottom: 4px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
`;

const StyledCardContent = styled(CardContent)`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0;
    .MuiCardContent-root {
        padding: 0;
    }
    .MuiCardContent-root:last-child {
        padding-bottom: 0;
    }
    &.MuiCardContent-root:last-child {
        padding: 0px;
        padding-bottom: 0;
    }
`;
