import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../components/services/qualityService";

const qualitiesSlice = createSlice({
    name: "qualitie",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
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

export const loadQualitiesList = (id) => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.getAll();
            dispatch(qualitiesReceved(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

const { actions, reducer: qualitiesReduser } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } =
    actions;

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qId of qualitiesIds) {
            for (const q of state.qualities.entities) {
                if (q._id === qId) {
                    qualitiesArray.push(q);
                    break;
                }
            }
        }
        return qualitiesArray;
    } else {
        return [];
    }
};
export default qualitiesReduser;
