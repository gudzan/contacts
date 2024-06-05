import React from "react";
import { useParams, useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";
import * as utils from "../utils/utils.js";
import api from "../api";

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
    // return (

    //     <tr key={user._id}>
    //         <td>{user.name}</td>
    //         <td>
    //             {user.qualities.map((quality) => (
    //                 <Quality {...quality} key={quality._id} />
    //             ))}
    //         </td>
    //         <td>
    //             {user.birthday.toLocaleDateString()} (
    //             {utils.renderPhrase(
    //                 utils.calculateAge(user.birthday),
    //                 "год",
    //                 "года",
    //                 "лет"
    //             )}
    //             )
    //         </td>
    //         <td>{user.profession.name}</td>
    //         <td>
    //             <a className="link-primary" href={`tel:${user.phone}`}>
    //                 {user.phone}
    //             </a>
    //         </td>
    //         <td>
    //             <a className="link-primary" href={`mailto::${user.mail}`}>
    //                 {user.mail}
    //             </a>
    //         </td>
    //         <td>
    //             <Bookmark
    //                 onToggleBookmark={props.onToggleBookmark}
    //                 bookmark={user.bookmark}
    //                 id={user._id}
    //             />
    //         </td>
    //         <td>
    //             <button
    //                 onClick={() => props.onDelete(user._id)}
    //                 className="btn btn-outline-danger"
    //             >
    //                 удалить
    //             </button>
    //         </td>
    //     </tr>
    // );
}
