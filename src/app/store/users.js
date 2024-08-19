import { createAction, createSlice } from "@reduxjs/toolkit";
import { randomInteger } from "../utils/utils";
import userService from "../components/services/userService";
import authService from "../components/services/authService";
import localStorageService from "../components/services/localStorageService";
import history from "../utils/history";
import generateAuthError from "../utils/generateAuthError"

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
      };

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
    },
});

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(loadUsersList());
            localStorageService.setTokens(
                data.idToken,
                data.refreshToken,
                data.expiresIn,
                data.localId
            );
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp = (usersData) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(usersData);
        localStorageService.setTokens(
            data.idToken,
            data.refreshToken,
            data.expiresIn,
            data.localId
        );
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(loadUsersList());
        dispatch(
            createUser({
                _id: data.localId,
                rate: randomInteger(0, 5),
                completedMeetings: randomInteger(0, 200),
                image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${randomInteger(
                    1,
                    1000
                )}`,
                ...usersData,
            })
        );
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.getAll();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeTokens();
    dispatch(userLoggedOut());
    history.push("/");
};

const { actions, reducer: usersReduser } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (usersId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === usersId);
    }
};
export const getCurrentUserData = () => (state) => {
    if (state.users.auth) {
        return state.users.entities
            ? state.users.entities.find(
                  (u) => u._id === state.users.auth.userId
              )
            : null;
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReduser;
