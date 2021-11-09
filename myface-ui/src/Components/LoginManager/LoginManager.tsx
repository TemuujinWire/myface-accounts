import React, {createContext, ReactNode, useState} from "react";
import { login } from "../../Api/apiClient";

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    token: "",
    logIn: (username: string, password: string) => false,
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
            return true;
        })
        .catch(error => {
            logOut();
            return false;
        })
    }
    
    function logOut() {
        setLoggedIn(false);
    }
    
    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        logIn: logIn,
        logOut: logOut,
        token: token,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}