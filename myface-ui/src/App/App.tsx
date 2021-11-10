import React, {ReactElement, useContext} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Feed} from "../Pages/Feed/Feed";
import {Users} from "../Pages/Users/Users";
import {NotFound} from "../Pages/NotFound/NotFound";
import {Login} from "../Pages/Login/Login";
import {LoginContext, LoginManager} from "../Components/LoginManager/LoginManager";
import {Profile} from "../Pages/Profile/Profile";
import {CreatePost} from "../Pages/CreatePost/CreatePost";
import {checkCredentials} from "../Api/apiClient";


function Routes(): ReactElement {
    const loginContext = useContext(LoginContext);
    checkCredentials(document.cookie.substring(6))
        .then(() => loginContext.updateLoggedIn(true))
        .catch(() => loginContext.updateLoggedIn(false))
    
    if (!loginContext.isLoggedIn) {
        return <Login/>
    }
    
    return (
        <Switch>
            <Route exact path="/" component={Feed}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/users/:id" component={Profile}/>
            <Route exact path="/new-post" component={CreatePost}/>
            <Route path="" component={NotFound}/>
        </Switch>
    );
}

export default function App(): ReactElement {
    return (
        <Router>
            <LoginManager>
                <Routes/>
            </LoginManager>
        </Router>
    );
}
