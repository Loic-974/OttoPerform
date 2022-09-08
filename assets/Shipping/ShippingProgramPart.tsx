import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";

export const ShippingProgramPart = ({}: {}) => {
    return (
        <>
            <StyledGridItem item xs={4}>
                liste Livreurs
            </StyledGridItem>
            <StyledGridItem item xs={2}>
                Date Livraison
            </StyledGridItem>
            <StyledGridItem item xs={6}>
                Liste glissante
            </StyledGridItem>
        </>
    );
};

const StyledGridItem = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
