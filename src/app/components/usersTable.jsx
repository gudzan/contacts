import React from "react";
import User from "./user";

export default function UsersTable({users, onToggleBookmark, onDelete, onSort }) {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th onClick={() => onSort("name")} scope="col">Имя</th>
                    <th scope="col">Тэги</th>
                    <th onClick={() => onSort("birthday")} scope="col">Дата рождения</th>
                    <th onClick={() => onSort("profession.name")} scope="col">Профессия</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">Почта</th>
                    <th onClick={() => onSort("bookmark")} scope="col">Избранное</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        onToggleBookmark={onToggleBookmark}
                        onDelete={onDelete}
                        user={user}
                    />
                ))}
            </tbody>
        </table>
    );
}
