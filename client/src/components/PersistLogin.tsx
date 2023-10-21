import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import Footer from "./Footer";

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
    }, [location?.pathname]);

    if (isLoading) return <Loader />;

    return (
        <>
            {!(
                location?.pathname === "/auth" ||
                location?.pathname === "/studio"
            ) ? (
                <Navbar toggleAuthModal={toggleAuthModal} />
            ) : (
                ""
            )}
            <Outlet />

            {!(
                location?.pathname === "/auth" ||
                location?.pathname === "/studio"
            ) ? (
                <>
                    <AuthModal
                        toggleAuthModal={toggleAuthModal}
                        isAuthModal={isAuthModal}
                        isAuthPage={false}
                    />
                </>
            ) : (
                ""
            )}
            {!(
                location?.pathname === "/auth" ||
                location?.pathname === "/studio"
            ) ? (
                <Footer />
            ) : (
                ""
            )}
        </>
    );
};

export default PersistLogin;
