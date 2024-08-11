import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localStorageService from "../services/localStorageService";

export default function NavBar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(localStorageService.getUserId())
    }, []);

    return (
        <div className="nav-style ml-4">
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
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
            <div>
                <Link className="user-nav-link" to="/">
                    User {user}
                </Link>
            </div>
        </div>
    );
}
