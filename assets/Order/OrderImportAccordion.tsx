import React = require("react");
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

export const OrderImportAccordion = ({}: {}) => {
    const [isOpen, setIsOpen] = useState(false);

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ----------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //
    return (
        <Accordion
            expanded={isOpen}
            onChange={() => setIsOpen((previousState) => !previousState)}
            disableGutters={true}
        >
            <StyledAccordionSummary
                expandIcon={<KeyboardArrowDownIcon htmlColor="#E7E4E5" />}
            >
                Importer des Commandes
            </StyledAccordionSummary>
            <AccordionDetails>
                <Grid container justifyContent={"space-between"}>
                    <Grid item xs={6}>
                        <StyledFormControl fullWidth>
                            <InputLabel htmlFor="inputFile">
                                Choix du Fichier
                            </InputLabel>
                            <StyledInput
                                id="inputFile"
                                type="file"
                                // value={password}
                                // onChange={(event) =>
                                //     setPassword(event.target.value)
                                // }
                            />
                        </StyledFormControl>
                    </Grid>
                    <Grid item xs={4} justifySelf={"self-end"}>
                        <StyledButton
                            variant="contained"
                            onClick={() => console.log("todo")}
                        >
                            Importer les données
                        </StyledButton>
                    </Grid>
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

const StyledInput = styled(OutlinedInput)`
    font-size: 1rem;
    width: 75%;

    .MuiInputBase-input.MuiOutlinedInput-input {
        padding: 8px 6px;
    }
    .MuiFormLabel-root {
        color: black;
    }
`;

const StyledFormControl = styled(FormControl)`
    margin-top: 6px;
    .MuiFormControl-fullWidth {
        color: ${({ theme }) => theme.colors.darkGrey};
    }
    label {
        color: ${({ theme }) => theme.colors.darkGrey};
        font-size: 1rem;
    }
    .MuiFormLabel-root.MuiInputLabel-root {
        color: transparent;
    }
    .MuiFormLabel-root.MuiInputLabel-root.Mui-focused {
        color: ${({ theme }) => theme.colors.darkGrey};
        font-size: 1rem;
        line-height: 1.45rem;
        background-color: #fff;
        padding: 0px 6px 0px 3px;
    }
    .MuiInputBase-root.MuiOutlinedInput-root {
        color: ${({ theme }) => theme.colors.darkGrey};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.darkGrey};
    }

    .MuiInputBase-root.MuiOutlinedInput-root:hover
        .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.mediumBlue};
    }

    .MuiSvgIcon-root {
        color: ${({ theme }) => theme.colors.darkGrey};
        margin-right: 6px;
        font-size: 1rem;
    }
`;

const StyledButton = styled(Button)`
    margin-top: 6px;
    padding: 6px 24px;
`;
