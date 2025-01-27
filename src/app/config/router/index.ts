import { DataBase, Main, SignIn } from "@/pages"
import { RouteObject } from "react-router-dom"

enum RouteNames {
    SIGN_IN = 'sign_in',

    MAIN = 'main',
    DATABASE = 'database'
}

export const RoutePaths: Record<RouteNames, string> = {
    [RouteNames.SIGN_IN]: '/sign_in',

    [RouteNames.MAIN]: '/',
    [RouteNames.DATABASE]: '/database'
}

export const RouteConfig: Record<RouteNames, RouteObject> = {
    [RouteNames.SIGN_IN]: {
        path: RoutePaths.sign_in,
        Component: SignIn
    },
    [RouteNames.MAIN]: {
        index: true,
        Component: Main
    },
    [RouteNames.DATABASE]: {
        path: RoutePaths.database,
        Component: DataBase
    }
}

export const PublicRoutes = Object.values(RouteConfig)
    .slice(0, 1)
    .map(({ Component, path }) => ({
        path,
        Component
    }))

export const ProtectedRoutes = Object.values(RouteConfig)
    .slice(1)
    .map(({ Component, path, index }) => {
        if (Component === Main) {
            return {
                Component,
                index
            };
        } else {
            return {
                Component,
                path
            };
        }
    });

