import React, { useState, useEffect } from "react";
import UsersTable from "../usersTable.jsx";
import Pagination from "../pagination.jsx";
import SearchStatus from "../searchStatus.jsx";
import * as utils from "../../utils/utils.js";
import Filter from "../filter.jsx";
import api from "../../api/index.js";
import _ from "lodash";

export default function Users() {
    //const users = props.users;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectProf, setSelectProf] = useState();
    const [sortBy, setSortBy] = useState({ iterate: "name", order: "asc" });
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newUsers);
    };

    const returnAllUsers = () => {
        setUsers(api.users.fetchAll());
    };
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
        setSortBy({ iterate: "name", order: "asc" });
    };

    const handleSort = (item) => {
        setSortBy(item);
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
            <SearchStatus length={users.length} />
            {users.length === 0 && (
                <button onClick={returnAllUsers} className="btn btn-success">
                    Вернуть всех обратно
                </button>
            )}
            {professions && users.length !== 0 && (
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
                        Сбросить все
                    </button>
                </div>
            )}
            {users.length !== 0 && (
                <UsersTable
                    users={usersFinish}
                    selectSort={sortBy}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                    onSort={handleSort}
                />
            )}
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
