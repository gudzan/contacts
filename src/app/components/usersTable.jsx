import React from "react";
import User from "./user";
import TableHeader from "./tableHeader";

export default function UsersTable({
    users,
    selectSort,
    onToggleBookmark,
    onDelete,
    onSort,
}) {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Тэги" },
        birthday: { iter: "birthday", name: "Дата рождения" },
        profession: { iter: "profession.name", name: "Профессия" },
        phone: { name: "Телефон" },
        mail: { name: "Почта" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        action: { name: "Действия" },
    };

    return (
        <table className="table table-hover">
            <TableHeader {...{ selectSort, onSort, columns }} />
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
