import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const PersistLogin = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthModal, setIsAuthModal] = useState(false);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

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

    const LogedIn = () => {
        return (
            <div className={"flex max-h-screen"}>
                {auth?.accessToken ? <Sidebar /> : ""}
                <div className=" overflow-y-auto w-full">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        );
    };

    const NotLogedIn = () => {
        return (
            <div className={"flex max-h-screen"}>
                <Navbar toggleAuthModal={toggleAuthModal} />
                <AuthModal
                    toggleAuthModal={toggleAuthModal}
                    isAuthModal={isAuthModal}
                    isAuthPage={false}
                />

                <Outlet />
                <Footer />
            </div>
        );
    };

    if (isLoading) return <Loader />;

    return auth?.accessToken ? <LogedIn /> : <NotLogedIn />;
};

export default PersistLogin;
