import { TextField } from "@mui/material";
import React = require("react");
import { useAsyncDebounce } from "react-table";
import styled from "styled-components";

// Define a default UI for filtering
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
}) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <StyledTextField
            id="Search"
            label="Recherche Rapide"
            placeholder="Rechercher la valeur souhaitée"
            variant="filled"
            size="small"
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
        />
    );
}

const StyledTextField = styled(TextField)`
    width: 80%;
    margin-bottom: 12px;
    margin-left: 8px;
    // border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
    border-top: 1px solid ${({ theme }) => theme.colors.mediumGrey};
    border-left: 1px solid ${({ theme }) => theme.colors.mediumGrey};
    border-right: 1px solid ${({ theme }) => theme.colors.mediumGrey};

    border-radius: 4px;
`;
