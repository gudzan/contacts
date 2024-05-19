import React from "react";
import * as utils from "../utils/utils.js";
import Quality from "./quality.jsx";
import Bookmark from "./bookmark.jsx";

export default function User(props) {
    const user = props.user;

    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Quality {...quality} />
                ))}
            </td>
            <td>
                {user.birthday.toLocaleDateString()} (
                {utils.renderPhrase(
                    utils.calculateAge(user.birthday),
                    "год",
                    "года",
                    "лет"
                )}
                )
            </td>
            <td>{user.profession.name}</td>
            <td>
                <a className="link-primary" href={`tel:${user.phone}`}>
                    {user.phone}
                </a>
            </td>
            <td>
                <a className="link-primary" href={`mailto::${user.mail}`}>
                    {user.mail}
                </a>
            </td>
            <td>
                <Bookmark
                    onToggleBookmark={props.onToggleBookmark}
                    bookmark={user.bookmark}
                    id={user._id}
                />
            </td>
            <td>
                <button
                    onClick={() => props.onDelete(user._id)}
                    className="btn btn-outline-danger"
                >
                    удалить
                </button>
            </td>
        </tr>
    );
}
