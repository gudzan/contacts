import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../components/services/userService";
import authService from "../components/services/authService";
import localStorageService from "../components/services/localStorageService";
import { randomInteger } from "../utils/utils";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false,
          lastFetch: null,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false,
          lastFetch: null,
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
    },
});

function isOutdated(date) {
    if (Date.now() - date > 20 * 60 * 1000) {
        return true;
    } else {
        return false;
    }
}

export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(
                data.idToken,
                data.refreshToken,
                data.expiresIn,
                data.localId
            );
            history.push(redirect);
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const signUp = (usersData) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(usersData);
        console.log(data);
        localStorageService.setTokens(
            data.idToken,
            data.refreshToken,
            data.expiresIn,
            data.localId
        );
        dispatch(authRequestSuccess({ userId: data.localId }));
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
            console.log(content);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}

export const loadUsersList = (id) => async (dispatch, getState) => {
    const { lastFetch } = getState().users;
    if (isOutdated(lastFetch)) {
        dispatch(usersRequested());
        try {
            const { content } = await userService.getAll();
            dispatch(usersReceved(content));
        } catch (error) {
            dispatch(usersRequestFailed(error.message));
        }
    }
};

const { actions, reducer: usersReduser } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
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
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export default usersReduser;
