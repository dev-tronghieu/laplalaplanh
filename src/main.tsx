import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import DashboardPage from "@/pages/Dashboard.tsx";
import ManagePage from "@/pages/Manage.tsx";
import { onAuthStateChange } from "@/services/firebase/auth.ts";
import { authActions } from "@/valtio/auth.ts";

import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/manage",
                element: <ManagePage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </React.StrictMode>
);

onAuthStateChange((user) => {
    if (user) {
        authActions.persistentLogin(user);
    } else {
        authActions.logout();
    }
});
