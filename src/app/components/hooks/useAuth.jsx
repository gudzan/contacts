import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import localStorageService from "../services/localStorageService";
import userService from "../services/userService";
import { randomInteger } from "../../utils/utils.js";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
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
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const history = useHistory()

    useEffect(() => {
        updateUserData()
    }, []);

    async function updateUserData() {
        if (localStorageService.getUserId()) {
            const newUser = await userService.get(localStorageService.getUserId());
            setUser(newUser);
        }
    }

    async function singUp(usersData) {
        try {
            const email = usersData.email;
            const password = usersData.password;
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true,
            });
            localStorageService.setTokens(
                data.idToken,
                data.refreshToken,
                data.expiresIn,
                data.localId
            );            
            await createUser({
                _id: data.localId,
                rate: randomInteger(0, 5),
                completedMeetings: randomInteger(0, 200),
                image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${randomInteger(1,1000)}`,
                ...usersData,
            });
            updateUserData()
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует",
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function singIn(usersData) {
        try {
            const email = usersData.email;
            const password = usersData.password;
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                { email, password, returnSecureToken: true }
            );
            localStorageService.setTokens(
                data.idToken,
                data.refreshToken,
                data.expiresIn,
                data.localId
            );
            updateUserData()
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                let errorObject = null;
                switch (message) {
                    case "INVALID_PASSWORD":
                        errorObject = { password: "Пароль неверный" };
                        break;
                    case "INVALID_LOGIN_CREDENTIALS":
                        errorObject = {
                            email: "Email или пароль введены некорректно",
                        };
                        break;
                    case "EMAIL_NOT_FOUND":
                        errorObject = {
                            email: "Такой пользователь не существует",
                        };
                        break;
                    case "USER_DISABLED":
                        errorObject = { email: "Пользователь заблокирован" };
                        break;
                    default:
                        errorObject = {
                            email: `Неизвестная ошибка ${message}`,
                        };
                }
                throw errorObject;
            }
        }
    }

    function logOut() {
        localStorageService.removeTokens();
        setUser(null);
        history.push("/");
    }

    async function createUser(data) {
        try {
            await userService.create(data);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        setError(error.response.data);
        console.log(error.response.data);
    }

    return (
        <AuthContext.Provider value={{ singUp, singIn, user, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
