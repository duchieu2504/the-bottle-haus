import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "dataLocal/redux/store";

const rootElement = document.querySelector("#root");

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    rootElement
);
