import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import menus from "./../menus.json";

const Sidebar = () => {
    const { auth } = useAuth();

    return (
        <aside className="bg-input py-5 left-0 top-0 h-screen w-1/5">
            <h2 className="font-semibold text-xl px-4">{auth?.email}</h2>
            <h3 className="font-medium text-lg px-4">{auth?.userType}</h3>
            {menus?.sidebar ? (
                <nav>
                    <ul>
                        {menus?.sidebar.map((menuItem) => {
                            if (
                                menuItem.userType === auth?.userType ||
                                menuItem.userType === "all"
                            ) {
                                return (
                                    <li key={menuItem.id}>
                                        <NavLink
                                            to={menuItem.to}
                                            className={({ isActive }) =>
                                                `w-full block py-1 px-4 text-primText hover:bg-gray-300 ${
                                                    isActive
                                                        ? "font-bold bg-secRed sm:bg-transparent"
                                                        : "bg-primary sm:bg-transparent"
                                                }`
                                            }
                                        >
                                            {menuItem.title}
                                        </NavLink>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>
            ) : (
                ""
            )}
        </aside>
    );
};

export default Sidebar;
