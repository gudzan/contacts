import React, { useEffect } from "react";
import Users from "./components/layouts/users";
import User from "./components/page/userPage";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./components/layouts/logOut";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLoader from "./components/ui/hoc/appLoader";

export default function App() {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route
                        path="/user/:userId"
                        render={(props) => <User {...props} />}
                    />
                    <ProtectedRoute path="/users" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </>
    );
}
