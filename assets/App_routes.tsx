import { LoginPageView } from "./LoginPage/LoginPageView";

export const App_routes = {
    path: "/",
    render: (setAuth: (arg: boolean) => void) => (
        <LoginPageView setAuth={setAuth} />
    ),
    name: "login",
};

export const ADMIN_ROUTES = {};

export const EXPERT_ROUTES = {};
