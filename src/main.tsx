import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import DashboardPage from "@/pages/Dashboard.tsx";
import ProfilePage from "@/pages/Profile.tsx";
import ManagePage from "@/pages/Manage.tsx";

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
                path: "/profile",
                element: <ProfilePage />,
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
