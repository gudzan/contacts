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
    const [selectProf, setSelectProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        console.log("useEffect");
        return () => {
            console.log("the end");
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectProf]);

    const handleSelectProf = (profession) => {
        setSelectProf(profession);
    };

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

    const clearAllFilters = () => {
        setSelectProf();
    };

    const filteredUsers = selectProf
        ? users.filter((user) => user.profession === selectProf)
        : users;
    const usersCount = filteredUsers.length;
    const usersCrop = utils.paginate(filteredUsers, currentPage, pageSize);

    return (
        <>
            <div></div>
            {professions && (
                <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                        <Filter
                            items={professions}
                            onSelectItem={handleSelectProf}
                            selectedItem={selectProf}
                        />
                        <div className="text-black-50 ms-3">По фильтру&nbsp;   
                            {utils.renderPhrase(
                                usersCount,
                                "юзер",
                                "юзера",
                                "юзеров"
                            )}
                        </div>
                    </div>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={clearAllFilters}
                    >
                        Очистить
                    </button>
                </div>
            )}
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
            {pageSize < usersCount && (
                <Pagination
                    onSelectPage={handleCurrentPage}
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                    currentPage={currentPage}
                    itemsCount={usersCount}
                    pageSize={pageSize}
                />
            )}
        </>
    );
}
