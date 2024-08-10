import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_API_KEY,
    },
});

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    async function singUp(usersData) {
        try {
            const email = usersData.email
            const password = usersData.password
            const { data } = await httpAuth.post(`accounts:signUp`, {email, password, returnSecureToken: true});
            localStorageService.setTokens(data.idToken, data.refreshToken, data.expiresIn);
            await createUser({_id: data.localId, ...usersData})
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            console.log("createUser",content);            
        } catch (error) {
            
        }
    }

    return (
        <AuthContext.Provider value={{ singUp }}>
            {children}
        </AuthContext.Provider>
    );
};
