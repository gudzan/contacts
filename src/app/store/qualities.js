import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../components/services/qualityService";

const qualitiesSlice = createSlice({
    name: "qualitie",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const loadQualitiesList = (id) => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.getAll();
        dispatch(qualitiesReceved(content));
    } catch (error) {
        dispatch(qualitiesRequestFailed(error.message))
    }
};

const { actions, reducer: qualitiesReduser } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } = actions;

export const getQualities = () => (state) => state.qualities.entities;

export default qualitiesReduser;
