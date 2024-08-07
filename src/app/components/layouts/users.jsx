import React, { useState, useEffect } from "react";
import UsersTable from "../ui/usersTable.jsx";
import Pagination from "../common/pagination.jsx";
import SearchStatus from "../ui/searchStatus";
import * as utils from "../../utils/utils.js";
import Filter from "../common/filter";
import api from "../../api/index.js";
import _ from "lodash";
import { useUsers } from "../hooks/useUsers.jsx";

export default function Users() {
    const {users} = useUsers();
    console.log(users);
    
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectProf, setSelectProf] = useState();
    const [sortBy, setSortBy] = useState({ iterate: "name", order: "asc" });
    //const [users, setUsers] = useState(api.users.fetchAll());
    const [searchData, setSearchData] = useState("");

    function handleSearch(e) {
        setSearchData(e.target.value);
        setSelectProf();
    }

    const handleDelete = (userId) => {
        //setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        //setUsers(newUsers);
    };

    const returnAllUsers = () => {
        //setUsers(api.users.fetchAll());
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
    }, [selectProf, searchData]);

    const handleSelectProf = (profession) => {
        setSelectProf(profession);
        setSearchData("");
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
        setSearchData("");
        setSortBy({ iterate: "name", order: "asc" });
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    function filterOrSearchUsers() {
        if (selectProf) {
            return users.filter((user) => user.profession === selectProf);
        } else if (searchData) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(searchData.toLowerCase())
            );
        } else return users;
    }

    const newUsers = filterOrSearchUsers();
    const usersCount = newUsers.length;
    const sortedUsers = _.orderBy(newUsers, [sortBy.iterate], [sortBy.order]);
    const usersFinish = utils.paginate(sortedUsers, currentPage, pageSize);

    return (
        <>
            <SearchStatus length={users.length} />
            {/* {users.length === 0 && (
                <button onClick={returnAllUsers} className="btn btn-success">
                    Вернуть всех обратно
                </button>
            )} */}
            {professions && users.length !== 0 && (
                <div
                    className={
                        "d-flex justify-content-between parent align-items-center p-2" +
                        (users.length === usersCount ? " mb-3" : "")
                    }
                >
                    <div className="d-flex align-items-center">
                        <Filter
                            items={professions}
                            onSelectItem={handleSelectProf}
                            selectedItem={selectProf}
                        />
                    </div>

                    <input
                        className="child form-control"
                        placeholder="Search..."
                        type="text"
                        value={searchData}
                        onChange={handleSearch}
                    />

                    <button
                        className="btn btn-danger"
                        onClick={clearAllFilters}
                    >
                        Сбросить
                    </button>
                </div>
            )}
            {users.length !== usersCount && (
                <div className="text-black-50 p-2">
                    Нашел&nbsp;
                    {utils.renderPhrase(usersCount, "юзер", "юзера", "юзеров")}
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
