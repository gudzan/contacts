import { createSlice } from "@reduxjs/toolkit";
import userService from "../components/services/userService";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
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
    },
});

function isOutdated(date) {
    if (Date.now() - date > 20 * 60 * 1000) {
        return true;
    } else {
        return false;
    }
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
const { usersRequested, usersReceved, usersRequestFailed } =
    actions;

export const getUsers = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) =>
    state.users.isLoading;
export const getUserById = (usersId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((user) => user._id === usersId);
    } else {
        return {};
    }
};
export default usersReduser;
