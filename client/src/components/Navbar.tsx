import { MouseEventHandler, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IconMenu, IconUser, IconX } from "@tabler/icons-react";

const Navbar = ({
    toggleAuthModal,
}: {
    toggleAuthModal: MouseEventHandler<HTMLButtonElement>;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="py-4 bg-primary text-white">
            <div className="max-w-5xl px-4 m-auto flex justify-between items-center">
                <Link to="/" className="font-extrabold text-4xl text-white">
                    Oxillia
                </Link>
                <div className="flex items-center gap-10">
                    <div
                        className={`sm:block fixed sm:static bottom-0 bg-primary sm:bg-transparent w-1/2 sm:w-auto p-7 sm:p-0 h-4 sm:h-auto z-20 flex items-center justify-between transition-all duration-300 ${
                            isMenuOpen
                                ? "right-0"
                                : "-right-full opacity-0 sm:opacity-100"
                        }`}
                    >
                        <nav>
                            <ul className="flex gap-4">
                                <li>
                                    <NavLink
                                        to="/courses"
                                        className={({ isActive }) =>
                                            isActive ? "font-bold" : ""
                                        }
                                    >
                                        Courses
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/students"
                                        className={({ isActive }) =>
                                           `opacity-30 pointer-events-none ${isActive ? "font-bold" : ""}`
                                        }
                                    >
                                        Students
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                        <button
                            className="sm:hidden bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                            onClick={toggleMenu}
                        >
                            <IconX color="white" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        {auth?.accessToken ? (
                            <Link
                                to="/dashboard"
                                className="backdrop-blur-sm bg-white bg-opacity-40 text-white py-2 px-3 rounded-full font-semibold hover:shadow-white hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                            >
                                <IconUser />
                            </Link>
                        ) : (
                            <button
                                className="backdrop-blur-sm bg-white bg-opacity-40 text-white py-2 px-8 rounded-full font-semibold hover:shadow-white hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                                onClick={toggleAuthModal}
                            >
                                Sign Up
                            </button>
                        )}
                        <button
                            onClick={toggleMenu}
                            className="backdrop-blur-sm bg-white bg-opacity-40 text-white py-2 px-3 rounded-full font-semibold hover:shadow-white transition-all sm:hidden"
                        >
                            <IconMenu />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
