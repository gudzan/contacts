import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavProfile() {
    const { user } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    const image = user.image
        ? user.image
        : `https://api.dicebear.com/9.x/avataaars/svg?seed=100`;

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center bg-light">
                <div className="me-2">{user.name}</div>
                <img
                    src={image}
                    alt="avatar"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/user/${user._id}`} className="dropdown-item">
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    LogOut
                </Link>
            </div>
        </div>
    );
}
