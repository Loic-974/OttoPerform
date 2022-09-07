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
import axios from "axios";
import { IClient } from "../api/interface/IClient";

export const AddOrderAccordion = ({}: {}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [existingClient, setExistingClient] = useState<IClient>();

    const [clientName, setClientName] = useState("");
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientAdresse, setClientAdresse] = useState("");
    const [clientVille, setClientVille] = useState("");
    const [clientCodeP, setClientCodeP] = useState("");
    const [clientSecteur, setClientSecteur] = useState();

    React.useEffect(() => {
        if (existingClient) {
            setClientName(existingClient?.nom);
            setClientFirstName(existingClient?.prenom);
            setClientAdresse(existingClient?.adresse);
            setClientVille(existingClient?.ville);
            setClientCodeP(existingClient?.codePostal);
            //   setClientSecteur(existingClient?.secteur);
        }
    }, [existingClient]);

    async function getAllClientList() {
        const query = await axios.get<IClient[]>("/client/clientList");
        const data = query.data;
        return data;
    }

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
                        <StyledAsyncAutoComplete
                            label="Recherche Client Existant"
                            getDataFn={getAllClientList}
                            formatDataToOptionFn={clientToOption}
                            setterFn={setExistingClient}
                        />
                    </StyledGridAutoContainer>
                    <StyledGridTitle item xs={12}>
                        <p>Client</p>
                    </StyledGridTitle>
                    <StyledGridItemContainer item xs={12}>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                disabled={!!existingClient}
                                required
                                id="clientName"
                                label="Nom Client"
                                variant="outlined"
                                size="small"
                                value={clientName}
                                onChange={(event) =>
                                    setClientName(event.target.value)
                                }
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                disabled={!!existingClient}
                                required
                                id="clienFirst"
                                label="Prenom Client"
                                variant="outlined"
                                size="small"
                                value={clientFirstName}
                                onChange={(event) =>
                                    setClientFirstName(event.target.value)
                                }
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                disabled={!!existingClient}
                                id="clientAdresse"
                                label="Adresse"
                                variant="outlined"
                                size="small"
                                value={clientAdresse}
                                onChange={(event) =>
                                    setClientAdresse(event.target.value)
                                }
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledAutoComplete
                                disablePortal
                                disabled={!!existingClient}
                                freeSolo
                                id="comboVille"
                                options={[
                                    { label: "toto", id: 1, secteur: "xd" },
                                    { label: "alfred", id: 2, secteur: "xd" },
                                ]}
                                // value={clientVille}
                                // getOptionLabel={(option)=>option.label}
                                // onChange={(event,value)=>setClientVille(value)}

                                renderInput={(params) => (
                                    <StyledTextField
                                        {...params}
                                        label="Ville"
                                        size="small"
                                        fullWidth
                                        required
                                    />
                                )}
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                disabled={!!existingClient}
                                required
                                id="codeP"
                                label="Code Postal"
                                variant="outlined"
                                size="small"
                                value={clientCodeP}
                                onChange={(event) =>
                                    setClientCodeP(event.target.value)
                                }
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
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
                        </StyledGridItem>
                    </StyledGridItemContainer>

                    <StyledGridTitle item xs={12}>
                        <p> Commande</p>
                    </StyledGridTitle>
                    <StyledGridItemContainer item xs={12}>
                        <StyledGridItem item xs={2}>
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
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
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
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="cmdQte"
                                label="Quantité"
                                variant="outlined"
                                size="small"
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={6} justifySelf={"self-end"}>
                            <StyledButton
                                variant="contained"
                                onClick={() => getAllClientList()}
                            >
                                Ajouter la commande
                            </StyledButton>
                        </StyledGridItem>
                    </StyledGridItemContainer>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

function clientToOption(user: IClient) {
    return `${user.nom} ${user.prenom} ${user.adresse} ${user.ville} ${user.codePostal}`;
}

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
    justify-content: center;
    padding: 0 24px;
`;

const StyledGridAutoContainer = styled(StyledGridItemContainer)`
    justify-content: center;
    .MuiTouchRipple-root {
        display: none;
    }
`;

const StyledGridItem = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: center;
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

const StyledAutoComplete = styled(Autocomplete)`
    width: 100%;
    display: flex;
    justify-content: center;
    .MuiAutocomplete-root {
        width: 100%;
    }
    .MuiFormControl-root.MuiTextField-root {
        width: 80%;
    }
`;
const StyledAsyncAutoComplete = styled(AsyncAutoComplete)`
    width: 80%;
    .MuiAutocomplete-root {
        width: 80%;
    }
`;
const StyledButton = styled(Button)`
    padding: 6px 24px;
`;
