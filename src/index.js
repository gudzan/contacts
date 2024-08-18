import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Router } from "react-router";
import App from "../src/app/App";
import logger from "./app/components/services/logService";
import { Provider } from "react-redux";
import createStore from "./app/store/createStore.js"
import history from "./app/utils/history.js"

// logger.init();
const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);
reportWebVitals();
