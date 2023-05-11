import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import SettingsPage from "../../features/profiles/SettingsPage";
import ExhibitionList from "../../features/exhibitions/ExhibitionList";
import RequireArtOwner from "./RequireArtOwner";
import RequireDriver from "./RequireDriver";
import RequireOrganiser from "./RequireOrganiser";
import ExhibitionForm from "../../features/exhibitions/ExhibitionForm";
import ExhibitionPage from "../../features/exhibitions/ExhibitionPage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: "profile/:username", element: <ProfilePage /> },
                    { path: "home", element: <HomePage /> },
                    { path: "settings", element: <SettingsPage /> },
                    { path: "exhibition/:exhibitionId", element: <ExhibitionPage /> },
                    {
                        element: <RequireArtOwner />, children: [

                        ]
                    },
                    {
                        element: <RequireDriver />, children: [

                        ]
                    },
                    {
                        element: <RequireOrganiser />, children: [
                            { path: "exhibitions", element: <ExhibitionList /> },
                            { path: "exhibitions/add", element: <ExhibitionForm /> },
                            { path: "exhibitions/update/:exhibitionId", element: <ExhibitionForm /> },
                        ]
                    }
                ]
            },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
        ]
    }
];

export const router = createBrowserRouter(routes);