import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities.js";
import professionsReduser from "./professions.js";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReduser,
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    });
}

export default createStore;
