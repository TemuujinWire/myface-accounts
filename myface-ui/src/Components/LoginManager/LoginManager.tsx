import React, {createContext, ReactNode, useState} from "react";
import { checkCredentials } from "../../Api/apiClient";

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    logIn: (username: string, password: string) => {},
    logOut: () => {},
    updateLoggedIn: (value:boolean) => {},
});

interface LoginManagerProps {
    children: ReactNode
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);

    function logIn(username: string, password: string) {
        const token = btoa(username + ':' + password)
        checkCredentials(token)
        .then(() => {
            document.cookie = `token=${token}`;
            setLoggedIn(true);
        })
        .catch(() => {
            logOut();
        })
    }
    
    function logOut() {
        updateLoggedIn(false);
    }

    function updateLoggedIn(value:boolean) {
        setLoggedIn(value)
        if (!value) {
            document.cookie = "token=; expires=" + new Date();
        }
    }
    
    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        logIn: logIn,
        logOut: logOut,
        updateLoggedIn: updateLoggedIn,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}