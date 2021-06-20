import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TabContextProvider } from "./contexts/TabContext";

ReactDOM.render(
    <React.StrictMode>
        <TabContextProvider>
            <App />
        </TabContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
