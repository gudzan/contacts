import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./components/layouts/users";
import User from "./components/user";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/navBar";

export default function App() {
    return (
        <div className="m-4">
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route
                    path="/user/:userId"
                    render={(props) => <User {...props} />}
                />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}
