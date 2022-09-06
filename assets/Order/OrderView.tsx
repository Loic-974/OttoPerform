import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { OrderImportAccordion } from "./OrderImportAccordion";

export const OrderView = ({}: {}) => {
    return (
        <StyledLoginContainer container>
            <Grid item xs={12}>
                <OrderImportAccordion />
            </Grid>
            <Grid item xs={12}>
                Ajout de Commande
            </Grid>
            <Grid item xs={12}>
                Tableau Commande
            </Grid>
        </StyledLoginContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledLoginContainer = styled(Grid)`
    width: 100%;
    height: 100%;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
`;
