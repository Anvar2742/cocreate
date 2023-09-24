import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";

const PersistLogin = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const toggleAuthModal = () => {
        setIsAuthModal((prev) => !prev);
    };

    /**
     * Check if user is loged in
     */
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        auth?.accessToken && auth?.accessToken === false
            ? setIsLoading(false)
            : verifyRefreshToken();
    }, [location.pathname]);

    if (isLoading) return <Loader />;

    return (
        <>
            <Navbar toggleAuthModal={toggleAuthModal} />
            <Outlet />

            {isAuthModal ? (
                <>
                    <AuthModal
                        toggleAuthModal={toggleAuthModal}
                        isAuthModal={isAuthModal}
                    />
                    <div className="w-screen h-screen bg-black backdrop-blur-sm bg-opacity-20 fixed top-0 left-0"></div>
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default PersistLogin;
