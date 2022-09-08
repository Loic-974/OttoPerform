import { Grid } from "@mui/material";
import axios from "axios";
import React = require("react");
import { useAsyncFn } from "react-use";
import styled from "styled-components";
import { ICommande } from "../api/interface/ICommande";
import { ILivraison } from "../api/interface/ILivraison";

import { ShippingCardPart } from "./ShippingCardPart";
import { ShippingProgramPart } from "./ShippingProgramPart";

export const ShippingView = ({}: {}) => {
    const [awaitingShippingOrderData, getAwaitingShippingOrderData] =
        useAsyncFn(getAllWaitingOrder);
    const [shippingOrderData, getShippingOrderData] = useAsyncFn(
        getAllInShippingOrder
    );

    const [shippingData, getShippingData] = useAsyncFn(getAllShipping);

    React.useEffect(() => {
        getAwaitingShippingOrderData();
        getShippingOrderData();
        getShippingData();
    }, []);

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <StyledShippedContainer>
            <StyledGridContainer container>
                <StyledGridCardContainer item xs={12}>
                    <ShippingCardPart
                        awaitingShippingOrderData={
                            awaitingShippingOrderData.value
                                ? awaitingShippingOrderData.value
                                : []
                        }
                        shippingOrderData={
                            shippingOrderData.value
                                ? shippingOrderData.value
                                : []
                        }
                        shippingData={
                            shippingData.value ? shippingData.value : []
                        }
                    />
                </StyledGridCardContainer>
                <StyledGridProgramContainer item xs={12}>
                    <ShippingProgramPart />
                </StyledGridProgramContainer>
            </StyledGridContainer>
        </StyledShippedContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Private Fn ----------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

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
async function getAllShipping() {
    const query = await axios.get<ILivraison[]>("/livraison/getlivraison");
    const data = query.data;
    return data;
}

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ---------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledShippedContainer = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
`;

const StyledGridContainer = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledGridCardContainer = styled(Grid)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex: 1;
`;
const StyledGridProgramContainer = styled(Grid)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex: 2;
`;
