import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { OrderImportAccordion } from "./OrderImportAccordion";
import { AddOrderAccordion } from "./AddOrderAccordion";

export const OrderView = ({}: {}) => {
    // Add asyncCall for data

    return (
        <StyledOrderContainer>
            <StyledOrderGridContainer container>
                <StyledGridItem item xs={12}>
                    <OrderImportAccordion />
                </StyledGridItem>
                <StyledGridItem item xs={12}>
                    <AddOrderAccordion />
                </StyledGridItem>
                <Grid item xs={12}>
                    Tableau Commande
                </Grid>
            </StyledOrderGridContainer>
        </StyledOrderContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledOrderContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
`;
const StyledOrderGridContainer = styled(Grid)``;

const StyledGridItem = styled(Grid)`
    margin-bottom: 24px;
`;
