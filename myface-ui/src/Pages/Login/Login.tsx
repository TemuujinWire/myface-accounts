import React, {FormEvent, useContext, useState} from 'react';
import {Page} from "../Page/Page";
import {LoginContext} from "../../Components/LoginManager/LoginManager";
import "./Login.scss";

export function Login(): JSX.Element {
    const loginContext = useContext(LoginContext);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function tryLogin(event: FormEvent) {
        event.preventDefault();
        if (!loginContext.logIn(username, password)) {
            setUsername("");
            setPassword("");

            const error = document.getElementById("ewwor");
            error.classList.remove("hide");
        }
    }
    
    return (
        <Page containerClassName="login">
            <h1 className="title">Log In</h1>
            <p id="ewwor" className="hide"> Incorrect crednetials </p>
            <form className="login-form" onSubmit={tryLogin}>
                <label className="form-label">
                    Username
                    <input className="form-input" type={"text"} value={username} onChange={
                        event => {
                            setUsername(event.target.value);
                            console.log(event.target.value)
                        }
                    }/>
                </label>

                <label className="form-label">
                    Password
                    <input className="form-input" type={"password"} value={password} onChange={
                        event => {
                            setPassword(event.target.value);
                            console.log(event.target.value)
                        }
                    }/>
                </label>
                
                <button className="submit-button" type="submit">Log In</button>
            </form>
        </Page>
    );
}