import React from "react";
import { useParams, useHistory } from "react-router-dom";
import QualitiesList from "../ui/qualities/qualitiesList.jsx";
import * as utils from "../../utils/utils.js";
import api from "../../api/index.js";

export default function User() {
    const params = useParams();
    const history = useHistory();
    const user = api.users.getById(params.userId);

    function handleClick() {
        history.push("/users");
    }

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <p>Профессия: {user.profession.name}</p>
                <div className="mb-3">
                    <QualitiesList qualities={user.qualities} />
                </div>
                <p>Телефон: {user.phone}</p>
                <p>Почта: {user.mail}</p>
                <p>
                    День рождения:{" "}
                    {`${user.birthday.toLocaleDateString()} (${utils.renderPhrase(
                        utils.calculateAge(user.birthday),
                        "год",
                        "года",
                        "лет"
                    )})`}
                </p>
                <button onClick={handleClick}>Вернуться обратно</button>
            </div>
        );
    } else {
        return <h1>Нет такого юзера...</h1>;
    }
}
