import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities.js";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
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
