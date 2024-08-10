import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import localStorageService from "../services/localStorageService";

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    async function singUp({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
        const {data} = await httpAuth.post(url, { email, password, returnSecureToken: true });
        localStorageService.setTokens(data.idToken, data.refreshToken , data.expiresIn)
    }
    return (
        <AuthContext.Provider value={{singUp}}>{children}</AuthContext.Provider>
    );
};
