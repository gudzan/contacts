import React from "react";
import User from "./user.jsx";

export default function Users(props) {
    const users = props.users;

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Тэги</th>
                    <th scope="col">Дата рождения</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">Почта</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User key={user._id} onDelete={props.onDelete} user={user} />
                ))}
            </tbody>
        </table>
    );
}
