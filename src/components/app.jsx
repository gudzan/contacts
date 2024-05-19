import React, { useState } from "react";
import SearchStatus from "./searchStatus";
import api from "../api";
import Users from "./users.jsx";

export default function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
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
                <Users onDelete={handleDelete} users={users} />
            )}
        </div>
    );
}
