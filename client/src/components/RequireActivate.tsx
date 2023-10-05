import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireActivate = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // console.log(auth);

    if (auth?.isActive) {
        return <Outlet />;
    } else {
        return (
            <Navigate
                to="/activation"
                state={{ from: location.pathname }}
                replace
            />
        );
    }
};

export default RequireActivate;
