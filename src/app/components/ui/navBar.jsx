import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <ul className="nav justify-content-end nav-pills">
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
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </ul>
    );
}
