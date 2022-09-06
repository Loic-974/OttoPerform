import { ReactNode } from "react";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { OrderView } from "./Order/OrderView";
import React = require("react");
import { IConnexion } from "./AuthProvider";
import axios from "axios";
import { EUserRole } from "./Enum/EUserRole";
import { ShippingView } from "./Shipping/ShippingView";
export interface IRoute {
    path: string;
    component: ReactNode;
    name: string;
    isIndex?: boolean;
}

export const APP_ROUTES: IRoute[] = [
    {
        path: "/orders",
        component: <OrderView key={"orders"} />,
        name: "Commandes",
        // isIndex: true,
    },
    {
        path: "/shipping",
        component: <ShippingView key={"shipping"} />,
        name: "Livraisons",
    },
];

export const ADMIN_ROUTES: IRoute[] = [];

export const EXPERT_ROUTES: IRoute[] = [];

export const ALL_ROUTES = async () => {
    const role = await _getUserRole();
    const result = APP_ROUTES;

    switch (role) {
        case EUserRole.EXPERT:
            result.push(...EXPERT_ROUTES);
            break;
        case EUserRole.ADMIN:
            result.push(...ADMIN_ROUTES);
            break;
    }
    return result;
};

async function _getUserRole() {
    const query = await axios.get<IConnexion>("user/userGetRole");
    const data = query.data;
    return data.userRole;
}
