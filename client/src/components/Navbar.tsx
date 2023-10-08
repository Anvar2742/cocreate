import { MouseEventHandler } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
    IconAddressBook,
    IconBooks,
    IconHome,
    IconUser,
} from "@tabler/icons-react";

const Navbar = ({
    toggleAuthModal,
}: {
    toggleAuthModal: MouseEventHandler<HTMLButtonElement>;
}) => {
    const { auth } = useAuth();

    return (
        <header className="py-4 bgs-primary text-black fixed top-0 left-0 w-full">
            <div className="max-w-5xl px-4 m-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="font-extrabold text-2xl sm:text-4xl text-black"
                >
                    Oxillia
                </Link>
                <div className="flex items-center gap-10">
                    <div
                        className={`sm:block z-20 right-0 fixed sm:static bg-primary sm:bg-transparent w-full sm:w-auto p-4 sm:p-0 flex flex-col items-center justify-between transition-all duration-300 rounded-t-2xl bottom-0`}
                    >
                        <nav>
                            <ul className="flex gap-4 items-center fixed sm:static left-0 right-0 justify-center bottom-3">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `flex items-center justify-center rounded-full sm:rounded-none w-12 sm:w-auto h-12 sm:h-auto text-primText ${
                                                isActive
                                                    ? "font-bold bg-secRed sm:bg-transparent"
                                                    : "bg-primary sm:bg-transparent"
                                            }`
                                        }
                                    >
                                        <IconHome className="sm:hidden" />
                                        <span className="hidden sm:block">
                                            Home
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/courses"
                                        className={({ isActive }) =>
                                            `flex items-center justify-center rounded-full w-12 sm:w-auto h-12 sm:h-auto text-primText ${
                                                isActive
                                                    ? "font-bold bg-secRed sm:bg-transparent"
                                                    : "bg-primary sm:bg-transparent"
                                            }`
                                        }
                                    >
                                        <IconBooks
                                            stroke={1}
                                            size={28}
                                            className="sm:hidden"
                                        />
                                        <span className="hidden sm:block">
                                            Courses
                                        </span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/students"
                                        className={({ isActive }) =>
                                            `pointer-events-none flex items-center justify-center rounded-full w-12 sm:w-auto h-12 sm:h-auto text-primText ${
                                                isActive
                                                    ? "font-bold bg-secRed sm:bg-transparent"
                                                    : "bg-primary sm:bg-transparent"
                                            }`
                                        }
                                    >
                                        <IconAddressBook
                                            stroke={1}
                                            size={30}
                                            className="sm:hidden opacity-40"
                                        />
                                        <span className="hidden sm:block opacity-40">
                                            Students
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex gap-2">
                        {auth?.accessToken ? (
                            <Link
                                to="/dashboard"
                                className="bg-primary text-white py-2 px-3 rounded-full font-semibold hover:shadow-white hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                            >
                                <IconUser />
                            </Link>
                        ) : (
                            <button
                                className="bg-primary text-white py-2 px-8 rounded-full font-semibold hover:shadow-white hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                                onClick={toggleAuthModal}
                            >
                                Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
