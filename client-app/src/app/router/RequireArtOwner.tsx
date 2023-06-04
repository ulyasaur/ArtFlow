import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireArtOwner() {
    const {userStore: {currentUser}} = useStore();
    const location = useLocation();

    if(currentUser?.role !== "ArtOwner") {
        return <Navigate to="/" state={{from: location}} />
    }

    return <Outlet />
}