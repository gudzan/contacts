import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavProfile from "./navProfile";

export default function NavBar() {
    const { user } = useAuth();

    const userNav = user ? (
        <NavProfile/>
    ) : (
        <Link className="user-nav-link" to="/login">
            Login
        </Link>
    );

    return (
        <div className="nav-style ml-4 bg-light p-3">
            <ul className="nav justify-content-start nav-pills">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
            <div>
                {userNav}
            </div>
        </div>
    );
}
