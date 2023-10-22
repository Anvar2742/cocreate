import { useEffect } from "react";
import { axiosInstance } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Dashboard = () => {
    const { user, logout } = useKindeAuth();
    console.log(user);

    const handleLogout = async () => {
        logout();
    };

    return (
        <section className="pt-32 pb-28">
            <div className="max-w-5xl px-4 mx-auto">
                <h1 className="font-bold text-4xl">Your dashboard</h1>
                <h2>Hi, {user?.given_name}</h2>
                <button
                    className="mt-4 bg-secRed inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
        </section>
    );
};

export default Dashboard;
