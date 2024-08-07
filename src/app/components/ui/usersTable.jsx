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
            // path: "qualities.name",
            name: "Тэги",
            component: (user) => <QualitiesList qualities={user.qualities} />,
        },
        profession: {
            name: "Профессия", 
            sort: true,            
            component: (user) => <Profession id={user.profession} />,
        },
        // birthday: { path: "birthday", sort: true, name: "Дата рождения" },
        // profession: { path: "profession.name", sort: true, name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Кол-во встреч" },
        rate: { path: "rate", name: "Рейтинг" },
        // phone: { path: "phone", name: "Телефон" },
        email: { path: "email", name: "Почта" },
        // bookmark: {
        //     path: "bookmark",
        //     sort: true,
        //     name: "Избранное",
        //     component: (user) => (
        //         <Bookmark
        //             onToggleBookmark={onToggleBookmark}
        //             bookmark={user.bookmark}
        //             id={user._id}
        //         />
        //     ),
        // },
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
