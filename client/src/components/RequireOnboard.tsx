import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireOnboard = () => {
    const { auth } = useAuth();
    const location = useLocation();

    if (auth?.isOnboard) {
        return <Outlet />;
    }
    return (
        <Navigate
            to="/onboarding"
            state={{ from: location.pathname }}
            replace
        />
    );
};

export default RequireOnboard;
