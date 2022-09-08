import React = require("react");
import {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper,
} from "@mui/material";
import { ILivreur } from "../../api/interface/ILivreur";
import { useState } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";

export const DeliveryManList = ({
    allDeliveryMan,
    selectedDeliveryMan,
    setSelectedDeliveryMan,
}: {
    allDeliveryMan: ILivreur[];
    selectedDeliveryMan: ILivreur | undefined;
    setSelectedDeliveryMan: (arg: ILivreur) => void;
}) => {
    return (
        <StyledListContainer>
            <StyledTitle>
                <p>Livreurs Disponibles</p>
            </StyledTitle>
            <StyledList>
                {allDeliveryMan.map((item) => (
                    <StyledListItemButton
                        key={`item-${item.id}`}
                        $isActive={
                            selectedDeliveryMan
                                ? isEqual(item, selectedDeliveryMan)
                                : false
                        }
                    >
                        <ListItemButton
                            onClick={() => setSelectedDeliveryMan(item)}
                            disableRipple
                        >
                            <ListItemAvatar>
                                <Avatar alt={`Avatar `} src={``} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${item.nom} ${item.prenom}`}
                                secondary={`Secteur ${item.secteur.nom_secteur}`}
                            />
                        </ListItemButton>
                    </StyledListItemButton>
                ))}
            </StyledList>
        </StyledListContainer>
    );
};

const StyledListContainer = styled.div`
    width: 80%;
    margin-left: 10%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledTitle = styled.div`
    width: 90%;
    padding: 8px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.hardGrey};
    p {
        font-weight: 600;
        margin-block-start: 0.6rem;
        margin-block-end: 0.6rem;
    }
`;

const StyledList = styled(List)`
    width: 100%;
    height: 100%;
    overflow-y: auto;

    ul {
        padding: 0;
    }
    .MuiList-root {
    }
    .MuiListItem-root {
        padding-top: 0;
        padding-bottom: 0;
    }
`;
const StyledListItemButton = styled(ListItem)<{ $isActive: boolean }>`
    border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGrey};
    background-color: ${(props) =>
        props.$isActive ? props.theme.colors.lightOrange : "inherit"};
    :hover {
        background-color: ${(props) =>
            props.$isActive
                ? props.theme.colors.lightOrange
                : props.theme.colors.clearBlue};
    }
`;
