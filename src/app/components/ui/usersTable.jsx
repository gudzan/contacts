import React from "react";
import Table from "../common/table/table";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import { Link } from "react-router-dom";
import Profession from "./profession";

export default function UsersTable({
    users,
    selectSort,
    onToggleBookmark,
    onDelete,
    onSort,
}) {
    const columns = {
        name: {
            path: "name",
            sort: true,
            name: "Имя",
            component: (user) => (
                <Link to={`/user/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: "Тэги",
            component: (user) => <QualitiesList qualities={user.qualities} />,
        },
        profession: {
            name: "Профессия", 
            sort: true,            
            component: (user) => <Profession id={user.profession} />,
        },
        completedMeetings: { path: "completedMeetings", name: "Кол-во встреч" },
        rate: { path: "rate", name: "Рейтинг" },
        email: { path: "email", name: "Почта" },
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

    return <Table {...{ selectSort, onSort, columns, data: users }} />;
}
