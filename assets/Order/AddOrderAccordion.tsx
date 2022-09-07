import React = require("react");
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { AsyncAutoComplete } from "./lib/AsyncAutoComplete";

export const AddOrderAccordion = ({}: {}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Accordion
            expanded={isOpen}
            onChange={() => setIsOpen((previousState) => !previousState)}
            disableGutters={true}
        >
            <StyledAccordionSummary
                expandIcon={<KeyboardArrowDownIcon htmlColor="#E7E4E5" />}
            >
                Ajout Commande
            </StyledAccordionSummary>
            <AccordionDetails>
                <Grid container justifyContent={"space-between"} columns={12}>
                    <StyledGridTitle item xs={12}>
                        <p>Client Existant</p>
                    </StyledGridTitle>
                    <StyledGridAutoContainer item xs={12}>
                        {/* <StyledAutoComplete
                            fullWidth
                            freeSolo
                            // disablePortal
                            id="combo-box-demo"
                            options={[
                                { label: "toto", id: 1 },
                                { label: "alfred", id: 2 },
                            ]}
                            // sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Recherche Client Existant"
                                    size="small"
                                    fullWidth
                                    InputProps={{
                                        // ...params.InputProps,
                                        type: "search",
                                    }}
                                />
                            )}
                        /> */}
                        <StyledAutoComplete
                            label="Recherche Client Existant"
                            getDataFn={() => []}
                        />
                    </StyledGridAutoContainer>
                    <StyledGridTitle item xs={12}>
                        <p>Client</p>
                    </StyledGridTitle>
                    <StyledGridItemContainer item xs={12}>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="clientName"
                                label="Nom Client"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="clienFirst"
                                label="Prenom Client"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="clientAdresse"
                                label="Adresse"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="codeP"
                                label="Code Postal"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Autocomplete
                                disablePortal
                                id="comboVille"
                                options={[
                                    { label: "toto", id: 1, secteur: "xd" },
                                    { label: "alfred", id: 2, secteur: "xd" },
                                ]}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        label="Ville"
                                        size="small"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                id="filled-select-currency"
                                select
                                disabled
                                label="Secteur"
                                //   value={currency}
                                //   onChange={handleChange}

                                variant="outlined"
                                size="small"
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </StyledTextField>
                        </Grid>
                    </StyledGridItemContainer>

                    <StyledGridTitle item xs={12}>
                        <p> Commande</p>
                    </StyledGridTitle>
                    <StyledGridItemContainer item xs={12}>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                select
                                id="typeCmd"
                                label="Type Commande"
                                variant="outlined"
                                size="small"
                            >
                                {/* <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem> */}
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                select
                                id="product"
                                label="Produit"
                                variant="outlined"
                                size="small"
                            >
                                {/* <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem> */}
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="cmdQte"
                                label="Quantité"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6} justifySelf={"self-end"}>
                            <StyledButton
                                variant="contained"
                                onClick={() => console.log("todo")}
                            >
                                Ajouter la commande
                            </StyledButton>
                        </Grid>
                    </StyledGridItemContainer>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledAccordionSummary = styled(AccordionSummary)`
    background-color: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.lightGrey};
    min-height: 0;
    .MuiAccordionSummary-content.Mui-expanded {
        margin: 12px 0;
        min-height: 0;
    }

    .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded {
        min-height: 0;
    }
`;

const StyledGridItemContainer = styled(Grid)`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

const StyledGridAutoContainer = styled(StyledGridItemContainer)`
    justify-content: center;
    .MuiTouchRipple-root {
        display: none;
    }
`;

const StyledGridTitle = styled(Grid)`
    display: flex;
    justify-content: center;
    margin: 8px 0;
    p {
        width: 90%;
        margin-block-start: 0.2rem;
        margin-block-end: 0.2rem;
        text-align: center;
        padding: 3px 0;
        background-color: ${({ theme }) => theme.colors.darkBlue};
        border-radius: 6px;
        color: #fff;
    }
`;

const StyledTextField = styled(TextField)`
    width: 80%;
`;

const StyledAutoComplete = styled(AsyncAutoComplete)`
    width: 80%;
    .MuiAutocomplete-root {
        width: 80%;
    }
`;
const StyledButton = styled(Button)`
    padding: 6px 24px;
`;
