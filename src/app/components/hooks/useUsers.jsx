import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import userService from "../services/userService";

const UsersContext = React.createContext();

export const useUsers = () => {
    return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await userService.getAll();
                setUsers(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
    });

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, []);

    function errorCatcher(error) {
        setError(error.response.data);
        console.log(error.response.data);
    }

    function getUser(id) {
        return users.find((user) => user._id === id);
    }

    return (
        <UsersContext.Provider value={{ users, getUser, isLoading }}>
            {children}
        </UsersContext.Provider>
    );
};
