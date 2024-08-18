import { createSlice } from "@reduxjs/toolkit";
import professionService from "../components/services/professionService";

const professionsSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    } else {
        return false;
    }
}

export const loadProfessionsList = (id) => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.getAll();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

const { actions, reducer: professionsReduser } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFailed } =
    actions;

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionsId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((profession) => profession._id === professionsId);
    } else {
        return {};
    }
};
export default professionsReduser;
