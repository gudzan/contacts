import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities.js";
import professionsReduser from "./professions.js";
import usersReduser from "./users.js";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReduser,
    users: usersReduser,
});

function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production",
    });
}

export default createStore;
