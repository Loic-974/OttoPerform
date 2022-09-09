import { Grid } from "@mui/material";
import axios from "axios";
import { Dayjs } from "dayjs";
import dayjs = require("dayjs");
import { useMemo, useState } from "react";
import React = require("react");
import styled from "styled-components";
import { ICommande } from "../api/interface/ICommande";
import { ILivreur } from "../api/interface/ILivreur";
import { DeliveryDatePicker } from "./lib/DeliveryDatePicker";
import { DeliveryManList } from "./lib/DeliveryManList";
import { TransfertListOrder } from "./lib/TransfertListOrder";

export const ShippingProgramPart = ({
    awaitingShippingOrderData,
    allDeliveryMan,
}: {
    awaitingShippingOrderData: ICommande[];
    allDeliveryMan: ILivreur[];
}) => {
    const [selectedDeliveryMan, setSelectedDeliveryMan] =
        React.useState<ILivreur>();

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    // Filter order who have the same secteur than the selected delivery man
    const filteredShippingOrder = useMemo(() => {
        return awaitingShippingOrderData.filter(
            (item) => item.client.secteur.id === selectedDeliveryMan?.secteur.id
        );
    }, [selectedDeliveryMan]);

    return (
        <StyledGridProgramContainer container item xs={12}>
            <StyledGridItem item xs={3}>
                <DeliveryManList
                    allDeliveryMan={allDeliveryMan ?? []}
                    selectedDeliveryMan={selectedDeliveryMan}
                    setSelectedDeliveryMan={setSelectedDeliveryMan}
                />
            </StyledGridItem>
            <StyledGridItem item xs={3}>
                <DeliveryDatePicker
                    selectedDate={selectedDate}
                    setSelectDate={setSelectedDate}
                />
            </StyledGridItem>
            <StyledGridItem item xs={6}>
                {/* {!!selectedDeliveryMan && !!selectDate && ( */}
                <TransfertListOrder
                    awaitingData={filteredShippingOrder}
                    selectedDate={selectedDate}
                    selectedDeliveryMan={selectedDeliveryMan}
                />
                {/* )} */}
            </StyledGridItem>
        </StyledGridProgramContainer>
    );
};

const StyledGridItem = styled(Grid)`
    height: 100%;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    /* height: 100%; */
    /* box-sizing: border-box; */
`;

const StyledGridProgramContainer = styled(Grid)`
    width: 100%;
    height: 75%;
    /* overflow: hidden;
    display: flex;
    align-items: stretch; */
    box-sizing: border-box;
    /* justify-content: space-around; */
    /* flex: 2; */
    padding-top: 32px;
`;
