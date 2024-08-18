import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import NavProfile from "./navProfile";

export default function NavBar() {
    const user = useSelector(getCurrentUserData())
    const userNav = user ? (
        <NavProfile />
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
                {user && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">
                            Users
                        </Link>
                    </li>
                )}
            </ul>
            <div>{userNav}</div>
        </div>
    );
}
