import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";

export default function UsersTable({
    users,
    selectSort,
    onToggleBookmark,
    onDelete,
    onSort,
}) {
    const columns = {
        name: { path: "name", sort: true, name: "Имя" },
        qualities: {
            path: "qualities.name",
            name: "Тэги",
            component: (user) => <QualitiesList qualities={user.qualities} />,
        },
        birthday: { path: "birthday", sort: true, name: "Дата рождения" },
        profession: { path: "profession.name", sort: true, name: "Профессия" },
        phone: { path: "phone", name: "Телефон" },
        mail: { path: "mail", name: "Почта" },
        bookmark: {
            path: "bookmark",
            sort: true,
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    onToggleBookmark={onToggleBookmark}
                    bookmark={user.bookmark}
                    id={user._id}
                />
            ),
        },
        action: {
            name: "Действия",
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-outline-danger"
                >
                    удалить
                </button>
            ),
        },
    };

    return (
        <table className="table table-hover">
            <TableHeader {...{ selectSort, onSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </table>
    );
}
