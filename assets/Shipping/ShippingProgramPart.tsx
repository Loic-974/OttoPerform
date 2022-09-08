import { Grid } from "@mui/material";
import React = require("react");
import styled from "styled-components";
import { DeliveryDatePicker } from "./lib/DeliveryDatePicker";
import { DeliveryManList } from "./lib/DeliveryManList";
import { TransfertListOrder } from "./lib/TransfertListOrder";

export const ShippingProgramPart = ({}: {}) => {
    return (
        <>
            <StyledGridItem item xs={4}>
                <DeliveryManList />
            </StyledGridItem>
            <StyledGridItem item xs={2}>
                <DeliveryDatePicker />
            </StyledGridItem>
            <StyledGridItem item xs={6}>
                <TransfertListOrder />
            </StyledGridItem>
        </>
    );
};

const StyledGridItem = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
