import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./components/layouts/users";
import User from "./components/page/userPage";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QualitiesProvider } from "./components/hooks/useQualities";
import { ProfessionsProvider } from "./components/hooks/useProfessions";
import { UsersProvider } from "./components/hooks/useUsers";
import { AuthProvider } from "./components/hooks/useAuth";

export default function App() {
    return (
        <div className="m-4">
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionsProvider>
                        <UsersProvider>
                            <Switch>
                                <Route exact path="/" component={Main} />
                            <Route path="/user/:userId" render={(props) => <User {...props} />}/>
                                <Route path="/users" component={Users} />
                                <Route path="/login/:type?" component={Login} />
                                <Redirect to="/" />
                            </Switch>
                        </UsersProvider>
                    </ProfessionsProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}
