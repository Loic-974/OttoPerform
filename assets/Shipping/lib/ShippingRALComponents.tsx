import { groupBy } from "lodash";
import React = require("react");
import styled from "styled-components";
import { ICommande } from "../../api/interface/ICommande";
import { ILivraison } from "../../api/interface/ILivraison";
import { ILivreur } from "../../api/interface/ILivreur";
import { CircleWithValue } from "./CircleWithValue";

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
        <StyledRalContainer>
            {Object.entries(groupedByRal).map(([key, value], index) => (
                <StyledRALItem key={"key" + index}>
                    <p>
                        {`${key} : `} <span>{value?.length || 0}</span>
                    </p>
                </StyledRALItem>
            ))}
            {/* <StyledRALItem key={"key" + 8}>
                <p>
                    {`BAC : `} <span>{0}</span>
                </p>
            </StyledRALItem> */}
        </StyledRalContainer>
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
        <StyledCircleContainer>
            <CircleWithValue
                valueToDisplay={ralRate.toFixed(2)}
                valueUnit="%"
                valueExplenation="RAL Programmé"
            />
            <CircleWithValue
                valueToDisplay={shippingData.length}
                valueUnit="Bacs"
                valueExplenation="En Livraison"
            />
        </StyledCircleContainer>
    );
};

export const DetailsShippingRateComponent = ({
    shippingData,
    allDeliveryMan,
}: {
    shippingData: ILivraison[];
    allDeliveryMan: ILivreur[];
}) => {
    const { ralRate, livreurWithoutOrder } = React.useMemo(() => {
        const shippedBac = shippingData.reduce(
            (acc, item) => acc + item.commande.quantite,
            0
        );
        const shipByLivreur = groupBy(shippingData, (item) => item.livreur?.id);

        const livreurWithOrder = Object.keys(shipByLivreur);

        const livreurWithoutOrder = allDeliveryMan.filter((item) => {
            return !livreurWithOrder.includes(item.id.toString());
        });

        const livreurCount = Object.keys(livreurWithOrder).length;

        const rate = shippedBac / livreurCount || 0;

        return {
            ralRate: rate,
            livreurWithoutOrder: livreurWithoutOrder.length || 0,
        };
    }, [, shippingData, allDeliveryMan]);

    return (
        <StyledCircleContainer>
            <CircleWithValue
                valueToDisplay={ralRate.toFixed(2)}
                valueUnit=" Bacs"
                valueExplenation="Par Livreur"
            />
            <CircleWithValue
                valueToDisplay={livreurWithoutOrder}
                valueUnit="Livreurs"
                valueExplenation="Sans Livraison"
            />
        </StyledCircleContainer>
    );
};

export const DelayToShipOrder = ({}: {}) => {
    return (
        <StyledCircleContainer>
            <CircleWithValue
                valueToDisplay={4}
                valueUnit=" Jours"
                valueExplenation="Ouvrés"
            />
            <CircleWithValue
                valueToDisplay={0.62}
                valueUnit="Jours"
                valueExplenation="Retard Moyen"
            />
        </StyledCircleContainer>
    );
};

const StyledCircleContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
`;

const StyledRalContainer = styled(StyledCircleContainer)`
    flex-direction: column;
    margin-bottom: 6px;
`;

const StyledRALItem = styled.div`
    width: 80%;
    background-color: ${(props) => props.theme.colors.lightBlue};
    border-radius: 6px;
    padding: 2px 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    p {
        width: 100%;
        margin-block-start: 0.1rem;
        margin-block-end: 0.1rem;
        font-size: 0.8rem;
        color: ${(props) => props.theme.colors.darkGrey};
        font-weight: 600;

        span {
            font-weight: bolder;
        }
    }
`;
