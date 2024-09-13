import App from "@/app/App";
import { NotFound } from "@/pages";
import { ProtectedRoutes, PublicRoutes, RoutePaths } from "@/shared/lib/config";
import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

const Public: React.FC = () => {
    return <Outlet />
}

const Private: React.FC = () => {
    const isAuthed = true

    return isAuthed
        ? <Outlet />
        : <Navigate to={RoutePaths.sign_in} replace />
}

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        errorElement: <NotFound />,
        children: [
            {
                Component: Public,
                children: PublicRoutes
            },
            {
                Component: Private,
                children: ProtectedRoutes
            }
        ]
    }
])