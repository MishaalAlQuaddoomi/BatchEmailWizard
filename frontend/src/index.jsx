import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "./App";

// Check local storage for dark mode preference and apply it
document.documentElement.classList.add(localStorage.getItem('theme') || 'light');

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
