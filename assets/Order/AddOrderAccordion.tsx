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
import { DUMMY_API_CITY_GOUV } from "../api/DUMMY_API_CITY_GOUV";
import { IProduct } from "../api/interface/IProduct";

interface IVilleOption {
    label: string;
    codePostaux: string[];
    secteur: number;
}

export interface ISelectOption {
    label: string;
    value: number;
}

export const AddOrderAccordion = ({
    onSubmitCommand,
}: {
    onSubmitCommand: () => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [existingClient, setExistingClient] = useState<IClient>();

    // ----------------------------- CLIENT STATE --------------------------- //

    const [clientName, setClientName] = useState<string>("");
    const [clientFirstName, setClientFirstName] = useState<string>("");
    const [clientAdresse, setClientAdresse] = useState<string>("");
    const [clientVille, setClientVille] = useState<IVilleOption | null>(null);
    const [clientCodeP, setClientCodeP] = useState<string | null>("");
    const [clientSecteur, setClientSecteur] = useState<number>(0);

    // ----------------------------- ORDER STATE --------------------------- //

    const [orderType, setOrderType] = useState("");
    const [orderProduct, setOrderProduct] = useState<IProduct>();
    const [orderQte, setOrderQte] = useState(0);

    // ---------------------------- OPTIONS SELECT ------------------------- //

    const cityOptions: IVilleOption[] = DUMMY_API_CITY_GOUV.map((item) => ({
        label: item.nom,
        codePostaux: item.codesPostaux,
        secteur: item.secteur,
    }));

    const codePostalOptions = React.useMemo(
        () => clientVille?.codePostaux || [],
        [clientVille]
    );

    // --------------------------- UseEffect ------------------------------ //
    React.useEffect(() => {
        if (existingClient) {
            setClientName(existingClient?.nom);
            setClientFirstName(existingClient?.prenom);
            setClientAdresse(existingClient?.adresse);

            const villeOption = cityOptions.find(
                (item) => item.label === existingClient?.ville
            );
            setClientVille(villeOption ? villeOption : null);
            setClientCodeP(existingClient?.codePostal);
            setClientSecteur(existingClient?.secteur.id);
        }
    }, [existingClient]);

    React.useEffect(() => {
        if (clientVille) {
            setClientSecteur(clientVille?.secteur);
        }
    }, [clientVille]);

    // ------------------------------- Methods ---------------------------------- //

    async function addNewCommand() {
        const clientData = {
            clientName,
            clientFirstName,
            clientAdresse,
            clientVille: clientVille?.label,
            clientCodeP,
            clientSecteur,
        };

        const orderData = {
            orderType,
            orderProductId: orderProduct?.id,
            orderQte,
        };

        await axios.post("/commande/addCommand", { clientData, orderData });

        onSubmitCommand();
    }

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ------------------------------------------------------- //
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
                Ajout Commande
            </StyledAccordionSummary>
            <AccordionDetails>
                <Grid container justifyContent={"space-between"} columns={12}>
                    <StyledGridTitle item xs={12}>
                        <p>Client Existant</p>
                    </StyledGridTitle>
                    <StyledGridAutoContainer item xs={12}>
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
                                disabled={!!existingClient}
                                freeSolo
                                id="comboVille"
                                options={cityOptions}
                                getOptionLabel={(option: any) => option?.label}
                                value={clientVille}
                                onChange={(event, value) =>
                                    setClientVille(value as IVilleOption)
                                }
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
                                id="filled-select-currency"
                                select
                                label="Code Postal"
                                value={clientCodeP}
                                variant="outlined"
                                size="small"
                                onChange={(event) =>
                                    setClientCodeP(event.target.value)
                                }
                                disabled={
                                    !codePostalOptions.length ||
                                    !!existingClient
                                }
                            >
                                {codePostalOptions?.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </StyledTextField>
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                id="filled-select-currency"
                                select
                                disabled
                                label="Secteur"
                                placeholder="Secteur"
                                value={clientSecteur}
                                variant="outlined"
                                size="small"
                            >
                                <MenuItem value={1}>Ouest</MenuItem>
                                <MenuItem value={2}>Sud</MenuItem>
                                <MenuItem value={3}>Grand-Sud</MenuItem>
                                <MenuItem value={4}>Nord</MenuItem>
                                <MenuItem value={5}>Est</MenuItem>
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
                                value={orderType}
                                onChange={(event) =>
                                    setOrderType(event.target.value)
                                }
                            >
                                <MenuItem value={"Dotation"}>Dotation</MenuItem>
                                <MenuItem value={"Remplacement"}>
                                    Remplacement
                                </MenuItem>
                                <MenuItem value={"Maintenance"}>
                                    Maintenance
                                </MenuItem>
                            </StyledTextField>
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledAsyncAutoComplete
                                label="Produit Disponible"
                                getDataFn={getAllProduct}
                                formatDataToOptionFn={productToOption}
                                setterFn={setOrderProduct}
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={2}>
                            <StyledTextField
                                fullWidth
                                required
                                id="cmdQte"
                                label="Quantité"
                                variant="outlined"
                                size="small"
                                type="number"
                                value={orderQte}
                                onChange={(event) =>
                                    setOrderQte(parseInt(event.target.value))
                                }
                            />
                        </StyledGridItem>
                        <StyledGridItem item xs={6} justifySelf={"self-end"}>
                            <StyledButton
                                variant="contained"
                                onClick={() => addNewCommand()}
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
//---------------------------------------------------- Helper ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

function clientToOption(user: IClient) {
    return `${user.nom} ${user.prenom} ${user.adresse} ${user.ville} ${user.codePostal}`;
}

function productToOption(produit: IProduct) {
    return produit.nom;
}

async function getAllClientList() {
    const query = await axios.get<IClient[]>("/client/clientList");
    const data = query.data;
    return data;
}

async function getAllProduct() {
    const query = await axios.get<IProduct[]>("/product/getProductList");
    const data = query.data;
    return data;
}

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
