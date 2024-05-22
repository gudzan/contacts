import React, { useState, useEffect } from "react";
import User from "./user.jsx";
import Pagination from "./pagination.jsx";
import * as utils from "../utils/utils.js";
import Filter from "./filter.jsx";
import api from "../api/index.js";

export default function Users(props) {
    const users = props.users;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data)=>setProfessions(data))
        console.log("useEffect");
        return () => {
            console.log("the end");
        };
    }, []);
    const handleCurrentPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
    };
    const usersCrop = utils.paginate(users, currentPage, pageSize);
    return (
        <>
            {professions &&(<Filter items={professions}/>)}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Тэги</th>
                        <th scope="col">Дата рождения</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Избранное</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {usersCrop.map((user) => (
                        <User
                            key={user._id}
                            onToggleBookmark={props.onToggleBookmark}
                            onDelete={props.onDelete}
                            user={user}
                        />
                    ))}
                </tbody>
            </table>
            {pageSize < users.length && (
                <Pagination
                    onSelectPage={handleCurrentPage}
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                    itemsCount={users.length}
                    pageSize={pageSize}
                />
            )}
        </>
    );
}
