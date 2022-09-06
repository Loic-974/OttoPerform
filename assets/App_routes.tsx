import { ReactNode } from "react";
import { LoginPageView } from "./LoginPage/LoginPageView";
import { OrderView } from "./Order/OrderView";
import React = require("react");
export interface IRoute {
    path: string;
    component: ReactNode;
    name: string;
}

export const App_routes: IRoute[] = [
    {
        path: "/dashboard",
        component: <OrderView />,
        name: "Commandes",
    },
];

export const ADMIN_ROUTES = {};

export const EXPERT_ROUTES = {};
