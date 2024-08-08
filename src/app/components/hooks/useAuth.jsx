import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    async function singUp({ email, password }) {
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        await httpAuth.post(url, { email, password, returnSecureToken: true });
    }
    return (
        <AuthContext.Provider value={{singUp}}>{children}</AuthContext.Provider>
    );
};
