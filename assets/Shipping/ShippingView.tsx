import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { ShippingCard } from "./lib/ShippingCard";

export const ShippingView = ({}: {}) => {
    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <StyledShippedContainer>
            <Grid container>
                <StyledGridCardContainer item xs={12}>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Reste à livrer" />
                    </StyledGridItem>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Livraison Programmée" />
                    </StyledGridItem>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Taux de Livraison" />
                    </StyledGridItem>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Temps moyen de Livraison" />
                    </StyledGridItem>
                </StyledGridCardContainer>
                <Grid item xs={12}>
                    GEstion Part
                </Grid>
            </Grid>
        </StyledShippedContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //
const StyledShippedContainer = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
`;

const StyledGridCardContainer = styled(Grid)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const StyledGridItem = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
