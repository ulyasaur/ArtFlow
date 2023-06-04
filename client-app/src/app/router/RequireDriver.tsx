import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireDriver() {
    const {userStore: {currentUser}} = useStore();
    const location = useLocation();

    if(currentUser?.role !== "Driver") {
        return <Navigate to="/" state={{from: location}} />
    }

    return <Outlet />
}