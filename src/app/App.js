import React, { useState } from "react";
import SearchStatus from "./components/searchStatus.jsx";
import api from "./api/index.js";
import Users from "./components/users.jsx"

export default function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        console.log("я тут");
        const newUsers = users.map((user) =>
            user._id === id ? { ...user, bookmark: !user.bookmark } : user
        );
        setUsers(newUsers);
    };

    const returnAllUsers = () => {
        setUsers(api.users.fetchAll());
    };

    return (
        <div className="m-5">
            <SearchStatus length={users.length} />
            {users.length === 0 && (
                <button onClick={returnAllUsers} className="btn btn-success">
                    Вернуть всех обратно
                </button>
            )}
            {users.length !== 0 && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                    users={users}
                />
            )}
        </div>
    );
}
