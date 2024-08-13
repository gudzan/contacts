import React from "react";
import Users from "./components/layouts/users";
import User from "./components/page/userPage";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QualitiesProvider } from "./components/hooks/useQualities";
import { ProfessionsProvider } from "./components/hooks/useProfessions";
import { UsersProvider } from "./components/hooks/useUsers";
import { AuthProvider } from "./components/hooks/useAuth";
import LogOut from "./components/layouts/logOut";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <>
            <AuthProvider>
                <NavBar/>
                <QualitiesProvider>
                    <ProfessionsProvider>
                        <UsersProvider>
                            <Switch>
                                <Route exact path="/" component={Main}/>
                                <ProtectedRoute path="/user/:userId" render={(props) => <User {...props} />}/>
                                <ProtectedRoute  path="/users" component={Users}/>
                                <Route path="/login/:type?" component={Login}/>
                                <Route path="/logout" component={LogOut}/>
                                <Redirect to="/" />
                            </Switch>
                        </UsersProvider>
                    </ProfessionsProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
}
