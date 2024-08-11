import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
    const { user } = useAuth();

    const userNav = user ? (
        <Link className="user-nav-link" to="/">
            {user.name} - Выйти
        </Link>
    ) : (
        <Link className="user-nav-link" to="/login">
            Гость - Войти
        </Link>
    );

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
            </ul>
            <div>
                {userNav}
            </div>
        </div>
    );
}
