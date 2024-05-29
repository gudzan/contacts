import React, { useState, useEffect } from "react";
import UsersTable from "./usersTable.jsx";
import Pagination from "./pagination.jsx";
import * as utils from "../utils/utils.js";
import Filter from "./filter.jsx";
import api from "../api/index.js";
import _ from "lodash";

export default function Users(props) {
    const users = props.users;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectProf, setSelectProf] = useState();
    const [sortBy, setSortBy] = useState({ iterate: "name", order: "asc" });

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

    const handleSort = (item) => {
        if (item === sortBy.iterate) {
            setSortBy((prevState) => ({
                ...prevState,
                order: prevState.order === "asc" ? "desc" : "asc",
            }));
        } else {
            setSortBy({ iterate: item, order: "asc" });
        }
        console.log(sortBy);
    };

    const filteredUsers = selectProf
        ? users.filter((user) => user.profession === selectProf)
        : users;
    const usersCount = filteredUsers.length;
    const sortedUsers = _.orderBy(
        filteredUsers,
        [sortBy.iterate],
        [sortBy.order]
    );
    const usersFinish = utils.paginate(sortedUsers, currentPage, pageSize);

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
                        {users.length !== usersCount && (
                            <div className="text-black-50 ms-3">
                                По фильтру&nbsp;
                                {utils.renderPhrase(
                                    usersCount,
                                    "юзер",
                                    "юзера",
                                    "юзеров"
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={clearAllFilters}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <UsersTable
                users={usersFinish}
                onDelete={props.onDelete}
                onToggleBookmark={props.onToggleBookmark}
                onSort={handleSort}
            />
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
