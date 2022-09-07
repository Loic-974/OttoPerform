import React = require("react");
import { buildOrderTableColumn } from "./lib/buildOrderTableColumn";
import { useGlobalFilter, useTable } from "react-table";
import { ICommande } from "../api/interface/ICommande";
import {
    Table,
    Paper,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import styled from "styled-components";

export const OrderTable = ({
    unPreparedData,
}: {
    unPreparedData: ICommande[];
}) => {
    const columns = React.useMemo(() => buildOrderTableColumn(), []);
    const data = React.useMemo(
        () => prepareData(unPreparedData),
        [unPreparedData]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        //@ts-ignore
        useTable({ columns, data }, useGlobalFilter);

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template --------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //

    return (
        <TableContainer component={Paper}>
            <StyledTitle>Liste Commandes</StyledTitle>
            <StyledTable {...getTableProps()}>
                <TableHead>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup: any) => (
                            // Apply the header row props
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column: any) => (
                                        // Apply the header cell props
                                        <StyledHeader
                                            {...column.getHeaderProps()}
                                        >
                                            {
                                                // Render the header
                                                column.render("Header")
                                            }
                                        </StyledHeader>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                {/* Apply the table body props */}
                <TableBody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row: any) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <StyledRow {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell: any) => {
                                            // Apply the cell props
                                            return (
                                                <StyledCell
                                                    {...cell.getCellProps()}
                                                >
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </StyledCell>
                                            );
                                        })
                                    }
                                </StyledRow>
                            );
                        })
                    }
                </TableBody>
            </StyledTable>
        </TableContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Helper --------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

function prepareData(data: ICommande[]) {
    return data.map((item) => ({
        nom: item.client.nom,
        prenom: item.client.prenom,
        adresse: item.client.adresse,
        ville: item.client.ville,
        codePostal: item.client.codePostal,
        type: item.type,
        quantite: item.quantite,
        produitNom: item.produit.nom,
        statut: item.statut,
    }));
}

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style --------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledTable = styled(Table)`
    min-height: 350px;
`;

const StyledTitle = styled.div`
    width: 100%;
    text-align: center;
    padding: 6px 0;
    font-weight: 700;
    background-color: ${({ theme }) => theme.colors.darkOrange};
    color: #fff;
    margin-bottom: 32px;
`;

const StyledHeader = styled(TableCell)`
    text-align: center;
    font-weight: 700;
    background-color: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledCell = styled(TableCell)`
    text-align: center;
`;

const StyledRow = styled(TableRow)`
    :nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.lightGrey};
    }
    :hover {
        background-color: ${({ theme }) => theme.colors.clearBlue};
    }
`;
