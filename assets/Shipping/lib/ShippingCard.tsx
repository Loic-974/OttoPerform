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
            <CardContent>{children}</CardContent>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    width: 80%;
    background-color: ${({ theme }) => theme.colors.hardGrey};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const StyledCardHeader = styled(CardHeader)`
    text-align: center;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 6px;

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
