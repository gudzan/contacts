import React from "react";
import QualitiesList from "../ui/qualities/qualitiesList.jsx";
import { useSelector } from "react-redux";
import { getUserById } from "../../store/users";
import { getProfessionById } from "../../store/professions.js";
import history from "../../utils/history.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";

export default function User() {
    const params = useParams();
    const user = useSelector(getUserById(params.userId));
    const profession = useSelector(getProfessionById(user.profession));

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
