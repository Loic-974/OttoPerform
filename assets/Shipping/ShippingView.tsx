import { Grid } from "@mui/material";
import axios from "axios";
import React = require("react");
import { useAsyncFn } from "react-use";
import styled from "styled-components";
import { ICommande } from "../api/interface/ICommande";
import { ShippingCard } from "./lib/ShippingCard";
import {
    DetailsRalComponent,
    DetailsRalRateComponent,
} from "./lib/ShippingRALComponents";

export const ShippingView = ({}: {}) => {
    const [awaitingShippingData, getAwaitingShippingData] =
        useAsyncFn(getAllWaitingOrder);
    const [shippingData, getShippingData] = useAsyncFn(getAllInShippingOrder);

    React.useEffect(() => {
        getAwaitingShippingData();
        getShippingData();
    }, []);

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <StyledShippedContainer>
            <Grid container>
                <StyledGridCardContainer item xs={12}>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Reste à livrer">
                            <DetailsRalComponent
                                awaitingData={
                                    awaitingShippingData.value
                                        ? awaitingShippingData.value
                                        : []
                                }
                            />
                        </ShippingCard>
                    </StyledGridItem>
                    <StyledGridItem item xs={3}>
                        <ShippingCard title="Livraison Programmée">
                            <DetailsRalRateComponent
                                awaitingData={
                                    awaitingShippingData.value
                                        ? awaitingShippingData.value
                                        : []
                                }
                                shippingData={
                                    shippingData.value ? shippingData.value : []
                                }
                            />
                        </ShippingCard>
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

async function getAllWaitingOrder() {
    const query = await axios.post<ICommande[]>(
        "/commande/getAllCommandByState",
        {
            orderState: "En Attente",
        }
    );
    const data = query.data;
    return data;
}
async function getAllInShippingOrder() {
    const query = await axios.post<ICommande[]>(
        "/commande/getAllCommandByState",
        {
            orderState: "En Livraison",
        }
    );
    const data = query.data;
    return data;
}

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
