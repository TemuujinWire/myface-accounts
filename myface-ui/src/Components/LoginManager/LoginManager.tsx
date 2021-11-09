import React, {createContext, ReactNode, useState} from "react";
import { login } from "../../Api/apiClient";

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    token: "",
    logIn: (username: string, password: string) => {},
    logOut: () => {},
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    
    function logIn(username: string, password: string) {
        setToken(btoa(username + ':' + password))

        login(btoa(username + ':' + password))
        .then(data => {
            setLoggedIn(true);
        })
        .catch(error => {
            logOut();
        })
    }
    
    function logOut() {
        setLoggedIn(false);
    }
    
    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        token: token,
        logIn: logIn,
        logOut: logOut,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}