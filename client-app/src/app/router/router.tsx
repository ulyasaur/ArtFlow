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
import ArtpiecesList from "../../features/artpieces/ArtpiecesList";
import ArtpiecePage from "../../features/artpieces/ArtpiecePage";
import ArtpieceAddForm from "../../features/artpieces/ArtpieceAddForm";
import ArtpieceUpdateForm from "../../features/artpieces/ArtpieceUpdateForm";
import AvailableArtpieces from "../../features/artpieces/AvailableArtpieces";
import UserOrdersList from "../../features/orders/UserOrdersList";
import OrderPage from "../../features/orders/OrderPage";
import OrderForm from "../../features/orders/OrderForm";
import AvailableOrdersList from "../../features/orders/AvailableOrdersList";

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
                    { path: "exhibitions/:exhibitionId", element: <ExhibitionPage /> },
                    { path: "artpieces/:artpieceId", element: <ArtpiecePage /> },
                    { path: "orders", element: <UserOrdersList /> },
                    { path: "orders/:orderId", element: <OrderPage /> },
                    {
                        element: <RequireArtOwner />, children: [
                            { path: "artpieces", element: <ArtpiecesList /> },
                            { path: "artpieces/add", element: <ArtpieceAddForm /> },
                            { path: "artpieces/update/:artpieceId", element: <ArtpieceUpdateForm /> },
                        ]
                    },
                    {
                        element: <RequireDriver />, children: [
                            { path: "orders/available", element: <AvailableOrdersList /> },
                        ]
                    },
                    {
                        element: <RequireOrganiser />, children: [
                            { path: "exhibitions", element: <ExhibitionList /> },
                            { path: "exhibitions/add", element: <ExhibitionForm /> },
                            { path: "exhibitions/update/:exhibitionId", element: <ExhibitionForm /> },
                            { path: "artpieces/available", element: <AvailableArtpieces /> },
                            { path: ":artpieceId/order", element: <OrderForm /> },
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