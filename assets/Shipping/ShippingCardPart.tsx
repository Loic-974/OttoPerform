import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { ICommande } from "../api/interface/ICommande";
import { ILivraison } from "../api/interface/ILivraison";
import { ILivreur } from "../api/interface/ILivreur";
import { ShippingCard } from "./lib/ShippingCard";
import {
    DelayToShipOrder,
    DetailsRalComponent,
    DetailsRalRateComponent,
    DetailsShippingRateComponent,
} from "./lib/ShippingRALComponents";

export const ShippingCardPart = ({
    awaitingShippingOrderData,
    shippingOrderData,
    shippingData,
    allDeliveryMan,
}: {
    awaitingShippingOrderData: ICommande[];
    shippingOrderData: ICommande[];
    shippingData: ILivraison[];
    allDeliveryMan: ILivreur[];
}) => {
    return (
        <StyledGridCardContainer container item xs={12}>
            <StyledGridItem item xs={3}>
                <ShippingCard title="Reste à livrer">
                    <DetailsRalComponent
                        awaitingData={
                            awaitingShippingOrderData
                                ? awaitingShippingOrderData
                                : []
                        }
                    />
                </ShippingCard>
            </StyledGridItem>
            <StyledGridItem item xs={3}>
                <ShippingCard title="Livraison Programmée">
                    <DetailsRalRateComponent
                        awaitingData={
                            awaitingShippingOrderData
                                ? awaitingShippingOrderData
                                : []
                        }
                        shippingData={
                            shippingOrderData ? shippingOrderData : []
                        }
                    />
                </ShippingCard>
            </StyledGridItem>
            <StyledGridItem item xs={3}>
                <ShippingCard title="Taux de Livraison">
                    <DetailsShippingRateComponent
                        shippingData={shippingData ? shippingData : []}
                        allDeliveryMan={allDeliveryMan ? allDeliveryMan : []}
                    />
                </ShippingCard>
            </StyledGridItem>
            <StyledGridItem item xs={3}>
                <ShippingCard title="Temps moyen de Livraison">
                    <DelayToShipOrder />
                </ShippingCard>
            </StyledGridItem>
        </StyledGridCardContainer>
    );
};

const StyledGridCardContainer = styled(Grid)`
    width: 100%;
    height: 25%;
    /* display: flex;
    align-items: stretch;
    justify-content: space-around; */
    box-sizing: border-box;
    padding-bottom: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.darkGrey};
    /* flex-shrink: 2; */
`;

const StyledGridItem = styled(Grid)`
    display: flex;
    height: 100%;
    /* align-items: center; */
    justify-content: center;
`;
