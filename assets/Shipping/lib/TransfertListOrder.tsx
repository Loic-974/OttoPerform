import React = require("react");
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { ICommande } from "../../api/interface/ICommande";
import { intersectionBy } from "lodash";
import { Dayjs } from "dayjs";
import { ILivreur } from "../../api/interface/ILivreur";
import axios from "axios";
import styled from "styled-components";
import { ListSubheader } from "@mui/material";
import { AssignmentLate, Warning } from "@mui/icons-material";

function not(a: ICommande[], b: ICommande[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: ICommande[], b: ICommande[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export const TransfertListOrder = ({
    awaitingData,
    selectedDate,
    selectedDeliveryMan,
    updateAllState,
}: {
    awaitingData: ICommande[];
    selectedDate: Dayjs | null;
    selectedDeliveryMan: ILivreur | undefined;
    updateAllState: () => void;
}) => {
    const [checked, setChecked] = React.useState<ICommande[]>([]);

    const [awaitingOrder, setAwaitingOrder] = React.useState<ICommande[]>([]);

    const [shippingOrder, setShippingOrder] = React.useState<ICommande[]>([]);

    React.useEffect(() => {
        setAwaitingOrder(awaitingData);
        setShippingOrder([]);
        setChecked([]);
    }, [awaitingData, selectedDeliveryMan]);

    async function createOrderShipping() {
        const dataObject = shippingOrder.map((item) => ({
            livreurId: selectedDeliveryMan?.id,
            commandeId: item.id,
        }));

        await axios.post("/livraison/setLivraison", dataObject);

        await updateAllState();
    }

    const leftChecked = intersection(checked, awaitingOrder);
    const rightChecked = intersection(checked, shippingOrder);

    const handleToggle = (value: ICommande) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setShippingOrder(shippingOrder.concat(awaitingOrder));
        setAwaitingOrder([]);
    };

    const handleCheckedRight = () => {
        setShippingOrder(shippingOrder.concat(leftChecked));
        setAwaitingOrder(not(awaitingOrder, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setAwaitingOrder(awaitingOrder.concat(rightChecked));
        setShippingOrder(not(shippingOrder, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setAwaitingOrder(awaitingOrder.concat(shippingOrder));
        setShippingOrder([]);
    };

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Private Component ---------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //

    const customList = (items: ICommande[]) => {
        // <div>
        return (
            <List dense component="div" role="list">
                {items.map((value: ICommande) => {
                    const labelId = `transfer-list-item-${value.id}-label`;
                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={` ${value.client.nom} ${value.client.prenom} ${value.produit.nom}`}
                                secondary={`${value.client.adresse} ${value.client.ville}`}
                            />
                        </ListItem>
                    );
                })}
                {!items.length && (
                    <ListItem key={"empty"} role="listitem">
                        <ListItemIcon>
                            <AssignmentLate />
                        </ListItemIcon>
                        <ListItemText
                            id={"empty"}
                            primary={`Aucune Commande`}
                        />
                    </ListItem>
                )}
                <ListItem />
            </List>
            // </div>
        );
    };

    // -------------------------------------------------------------------------------------------------------------------- //
    //---------------------------------------------------- Template ------------------------------------------------------- //
    // -------------------------------------------------------------------------------------------------------------------- //

    return (
        <StyledContainer elevation={2}>
            <StyledTitle>
                <p>Journée du {selectedDate?.format("DD MMMM YYYY")}</p>
            </StyledTitle>
            <StyledGridContainer
                container
                justifyContent="center"
                alignItems="center"
            >
                {/* <StyledGridSubTitle item xs={6}>
                    <StyledSubtitle>
                        <p>Titre</p>
                    </StyledSubtitle>
                </StyledGridSubTitle> */}
                <StyledGridColumn container item xs={5}>
                    <StyledGridSubTitle item xs={12}>
                        <StyledSubtitle>
                            <p>Commande à Livrer</p>
                        </StyledSubtitle>
                    </StyledGridSubTitle>
                    <StyledGridList item xs={12}>
                        {selectedDeliveryMan ? (
                            customList(awaitingOrder)
                        ) : (
                            <ListItem key={"empty"} role="listitem">
                                <ListItemIcon>
                                    <Warning />
                                </ListItemIcon>
                                <ListItemText
                                    id={"empty"}
                                    primary={`Aucun Livreur Sélectionné`}
                                    secondary={
                                        "Veuillez Sélectionner un Livreur"
                                    }
                                />
                            </ListItem>
                        )}
                    </StyledGridList>
                </StyledGridColumn>
                <Grid container item xs={2}>
                    <Grid container item direction="column" alignItems="center">
                        <StyledButtonList
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllRight}
                            disabled={awaitingOrder.length === 0}
                            aria-label="move all right"
                        >
                            ≫
                        </StyledButtonList>
                        <StyledButtonList
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </StyledButtonList>
                        <StyledButtonList
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </StyledButtonList>
                        <StyledButtonList
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllLeft}
                            disabled={shippingOrder.length === 0}
                            aria-label="move all left"
                        >
                            ≪
                        </StyledButtonList>
                    </Grid>
                </Grid>

                <StyledGridColumn item xs={5}>
                    <StyledGridSubTitle item xs={12}>
                        <StyledSubtitle>
                            <p>
                                Attribué à {selectedDeliveryMan?.nom}{" "}
                                {selectedDeliveryMan?.prenom}
                            </p>
                        </StyledSubtitle>
                    </StyledGridSubTitle>
                    <StyledGridList item xs={12}>
                        {customList(shippingOrder)}
                    </StyledGridList>
                </StyledGridColumn>
                <StyledSubmitButtonGrid item xs={12}>
                    <StyledSubmitButton
                        variant="contained"
                        color="primary"
                        disabled={!shippingOrder.length}
                        onClick={() => createOrderShipping()}
                    >
                        Confirmer les Livraisons
                    </StyledSubmitButton>
                </StyledSubmitButtonGrid>
            </StyledGridContainer>
        </StyledContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledContainer = styled(Paper)`
    width: 90%;
    background-color: ${(props) => props.theme.colors.darkGrey};
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledTitle = styled.div`
    width: 100%;
    padding: 8px 16px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightGrey};
    color: ${({ theme }) => theme.colors.lightGrey};
    p {
        font-weight: 600;
        margin-block-start: 0.6rem;
        margin-block-end: 0.6rem;
    }
`;

const StyledGridContainer = styled(Grid)`
    height: 87%;
    display: flex;
`;

const StyledGridColumn = styled(Grid)`
    height: 95%;
    padding: 2%;
`;

const StyledGridSubTitle = styled(Grid)`
    display: flex;
    justify-content: center;
    height: fit-content;
`;
const StyledGridList = styled(Grid)`
    height: 90%;
    background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const StyledSubtitle = styled.div`
    width: 90%;
    background-color: ${({ theme }) => theme.colors.darkOrange};
    padding: 4px 16px;
    border-radius: 6px 6px 0 0;
    color: ${({ theme }) => theme.colors.lightGrey};
    p {
        text-align: center;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
        margin-block-start: 0.3rem;
        margin-block-end: 0.3rem;
        color: ${({ theme }) => theme.colors.lightGrey};
    }
`;

const StyledButtonList = styled(Button)`
    border-color: ${({ theme }) => theme.colors.mediumBlue};
    color: ${({ theme }) => theme.colors.mediumBlue};
    width: 100%;

    :disabled {
        border-color: ${({ theme }) => theme.colors.mediumGrey};
        color: ${({ theme }) => theme.colors.mediumGrey};
    }
`;

const StyledSubmitButtonGrid = styled(Grid)`
    display: flex;
    justify-content: center;
`;

const StyledSubmitButton = styled(Button)`
    :disabled {
        background-color: ${({ theme }) => theme.colors.mediumGrey};
        color: ${({ theme }) => theme.colors.hardGrey};
    }
`;
