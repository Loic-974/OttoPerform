import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { OrderImportAccordion } from "./OrderImportAccordion";
import { AddOrderAccordion } from "./AddOrderAccordion";
import { useAsyncFn } from "react-use";
import axios from "axios";
import { ICommande } from "../api/interface/ICommande";
import { OrderTable } from "./OrderTable";

export const OrderView = ({}: {}) => {
    // Add asyncCall for data
    const [ordersData, getOrdersData] = useAsyncFn(getAllOrders);

    React.useEffect(() => {
        getOrdersData();
    }, []);

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
                    <OrderTable
                        unPreparedData={
                            ordersData.value?.length ? ordersData?.value : []
                        }
                    />
                </Grid>
            </StyledOrderGridContainer>
        </StyledOrderContainer>
    );
};
// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Helper --------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

async function getAllOrders() {
    const query = await axios.get<ICommande[]>("/commande/getAllCommand");
    const data = query.data;
    return data;
}

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledOrderContainer = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
`;
const StyledOrderGridContainer = styled(Grid)``;

const StyledGridItem = styled(Grid)`
    margin-bottom: 24px;
`;
