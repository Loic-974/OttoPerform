import React = require("react");
import { Chip } from "@mui/material";
import { useMemo } from "react";
import { OXXO_COLORS } from "../../mainTheme";
import styled from "styled-components";

export function buildOrderTableColumn() {
    return [
        {
            Header: "Nom",
            accessor: "nom",
        },
        {
            Header: "Prenom",
            accessor: "prenom",
        },
        {
            Header: "Adresse",
            accessor: "adresse",
        },
        {
            Header: "Ville",
            accessor: "ville",
        },
        {
            Header: "Code Postal",
            accessor: "codePostal",
        },
        {
            Header: "Type Commande",
            accessor: "type",
        },
        {
            Header: "Produit",
            accessor: "produitNom",
        },
        {
            Header: "Quantité",
            accessor: "quantite",
        },
        {
            Header: "Statut",
            accessor: "statut",
            Cell: ({ value }: any) => <CustomStateCell value={value} />,
        },
    ];
}

const CustomStateCell = ({
    value,
}: {
    value: "En Attente" | "Livrée" | "En Livraison" | "Annule";
}) => {
    const color = useMemo(() => {
        switch (value) {
            case "En Attente":
                return OXXO_COLORS.colors.mediumOrange;
            case "En Livraison":
                return OXXO_COLORS.colors.mediumBlue;
            case "Livrée":
                return OXXO_COLORS.colors.mediumGreen;
            case "Annule":
                return OXXO_COLORS.colors.mediumRed;
            default:
                return OXXO_COLORS.colors.darkGrey;
        }
    }, [value]);

    return <StyledChip label={value} $bgcolor={color} />;
};

const StyledChip = styled(Chip)<{ $bgcolor: string }>`
    background-color: ${(props) => props.$bgcolor};
    border-radius: 4px;
    color: #fff;
    min-width: 100px;
`;
