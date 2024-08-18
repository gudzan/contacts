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
import { UsersProvider } from "./components/hooks/useUsers";
import { AuthProvider } from "./components/hooks/useAuth";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        dispatch(loadUsersList())
    }, []);

    return (
        <>
            <AuthProvider>
                <NavBar />
                <UsersProvider>
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
                </UsersProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}
