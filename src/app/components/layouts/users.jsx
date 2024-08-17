import React, { useState, useEffect } from "react";
import UsersTable from "../ui/usersTable.jsx";
import Pagination from "../common/pagination.jsx";
import SearchStatus from "../ui/searchStatus";
import * as utils from "../../utils/utils.js";
import Filter from "../common/filter";
import _ from "lodash";
import { useUsers } from "../hooks/useUsers.jsx";
import { useProfessions } from "../hooks/useProfessions.jsx";

export default function Users() {
    const { users } = useUsers();
    const { professions } = useProfessions();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectProf, setSelectProf] = useState();
    const [sortBy, setSortBy] = useState({ iterate: "name", order: "asc" });
    const [searchData, setSearchData] = useState("");

    function handleSearch(e) {
        setSearchData(e.target.value);
        setSelectProf();
    }

    const handleDelete = (userId) => {};

    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
    };

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
            return users.filter((user) => user.profession === selectProf._id);
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
        <div className="m-4">
            <SearchStatus length={users.length} />
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
        </div>
    );
}
