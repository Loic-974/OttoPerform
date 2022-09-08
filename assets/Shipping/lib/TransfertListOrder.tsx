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
}: {
    awaitingData: ICommande[];
    selectedDate: Dayjs | null;
    selectedDeliveryMan: ILivreur | undefined;
}) => {
    const [checked, setChecked] = React.useState<ICommande[]>([]);

    const [awaitingOrder, setAwaitingOrder] = React.useState<ICommande[]>([]);

    React.useEffect(() => setAwaitingOrder(awaitingData), [awaitingData]);

    const [shippingOrder, setShippingOrder] = React.useState<ICommande[]>([]);

    async function createOrderShipping() {
        const dataObject = shippingOrder.map((item) => ({
            livreurId: selectedDeliveryMan?.id,
            commandeId: item.id,
        }));

        axios.post("/livraison/setLivraison", dataObject);
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
                                primary={`${value.client.nom} ${value.client.prenom}`}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
            // </div>
        );
    };

    return (
        <Paper elevation={2}>
            <Grid
                container
                item
                xs={12}
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>{customList(awaitingOrder)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllRight}
                            disabled={awaitingOrder.length === 0}
                            aria-label="move all right"
                        >
                            ≫
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllLeft}
                            disabled={shippingOrder.length === 0}
                            aria-label="move all left"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(shippingOrder)}</Grid>
            </Grid>
            <div>
                <Button
                    disabled={!shippingOrder.length}
                    onClick={() => createOrderShipping()}
                >
                    Confirmer les Livraisons
                </Button>
            </div>
        </Paper>
    );
};
