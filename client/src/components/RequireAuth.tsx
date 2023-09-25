import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    if (auth?.accessToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
