import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import React = require("react");
import axios from "axios";
import { EUserRole } from "./Enum/EUserRole";

export interface IConnexion {
    connexionAllowed: boolean;
    userRole: EUserRole;
    userEmail: string;
}

//@ts-ignore
const AuthContext = createContext({
    isUserConnected: false,
    login: () => console.log("from defauilt value"),
    logout: () => console.log("toto"),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //
    async function isUserAlreadyLogged(userEmail: string | undefined | null) {
        let state = false;
        if (userEmail) {
            const query = await axios.post<IConnexion>(
                "user/userCheckIsLogin",
                {
                    userEmail: userEmail,
                }
            );
            const data = query.data;
            state = data.connexionAllowed;
        }
        setIsUserConnected(state);
    }

    const [userEmail, setUserEmail] = useLocalStorage("userEmail", "foo");

    const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

    const value = useMemo(
        () => ({
            isUserConnected,
            login: login,
            logout,
        }),
        [isUserConnected]
    );

    if (userEmail) {
        React.useEffect(() => {
            isUserAlreadyLogged(userEmail);
        }, [userEmail]);
    }

    async function connect(userEmail: string, password: string) {
        const query = await axios.post<IConnexion>("user/userConnexion", {
            userEmail: userEmail ?? "",
            password: password ?? "",
        });
        const data = query.data;
        return data;
    }

    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    async function login(userEmail: string, password: string) {
        const connectionState = await connect(userEmail, password);

        if (connectionState.connexionAllowed) {
            setUserEmail(connectionState.userEmail);
            navigate("/shipping");
        }
    }

    // call this function to sign out logged in user
    const logout = () => {
        setUserEmail("");
        console.log("disconnect"); // to replace
        navigate("/", { replace: true });
    };

    return (
        //@ts-ignore
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useLocalStorage = <T extends Object | undefined>(
    keyName: string,
    defaultValue: T
) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                );
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};
