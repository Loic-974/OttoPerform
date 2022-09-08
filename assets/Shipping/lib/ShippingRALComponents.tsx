import { groupBy } from "lodash";
import React = require("react");
import { ICommande } from "../../api/interface/ICommande";
import { ILivraison } from "../../api/interface/ILivraison";

export const DetailsRalComponent = ({
    awaitingData,
}: {
    awaitingData: ICommande[];
}) => {
    const groupedByRal = React.useMemo(() => {
        const data = groupBy(awaitingData, (item) => item.produit.nom);
        return data;
    }, [awaitingData]);

    return (
        <>
            {Object.entries(groupedByRal).map(([key, value], index) => (
                <div key={"key" + index}>
                    <p>{key}</p>
                    <p>{value?.length || 0}</p>
                </div>
            ))}
        </>
    );
};

export const DetailsRalRateComponent = ({
    awaitingData,
    shippingData,
}: {
    awaitingData: ICommande[];
    shippingData: ICommande[];
}) => {
    const ralRate = React.useMemo(() => {
        return (shippingData.length / awaitingData.length) * 100;
    }, [awaitingData, shippingData]);

    return (
        <>
            <p>{ralRate.toFixed(2)}</p>
        </>
    );
};

export const DetailsShippingRateComponent = ({
    shippingData,
}: {
    shippingData: ILivraison[];
}) => {
    const ralRate = React.useMemo(() => {
        const shippedBac = shippingData.reduce(
            (acc, item) => acc + item.commande.quantite,
            0
        );
        const shipByLivreur = groupBy(shippingData, (item) => item.livreur?.id);
        const livreurCount = Object.keys(shipByLivreur).length;

        return shippedBac / livreurCount;
    }, [, shippingData]);

    return (
        <>
            <p>{ralRate.toFixed(2)}</p>
        </>
    );
};
