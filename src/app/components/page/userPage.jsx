import React from "react";
import { useHistory } from "react-router-dom";
import QualitiesList from "../ui/qualities/qualitiesList.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { getProfessionById } from "../../store/professions.js";
import { useSelector } from "react-redux";

export default function User() {
    const history = useHistory();
    const {user} = useAuth()    
    const profession = useSelector(getProfessionById(user.profession))

    function handleClick() {
        history.push("/users");
    }

    if (user) {
        return (
            <div>
                <img
                    src={user.image}
                    alt="avatar"
                    height="240"
                    className="img-responsive rounded-circle"
                />
                <h1>{user.name}</h1>
                <p>Профессия: {profession.name}</p>
                <div className="mb-3">
                    <QualitiesList qualities={user.qualities} />
                </div>
                <p>Почта: {user.email}</p>
                <button onClick={handleClick}>Вернуться обратно</button>
            </div>
        );
    } else {
        return <h1>Нет такого юзера...</h1>;
    }
}
