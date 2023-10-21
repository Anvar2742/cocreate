import { axiosInstance } from "../api/axios";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = async () => {
        try {
            const resp = await axiosInstance.get("/logout", {
                withCredentials: true,
            });
            if (resp.status === 204) setAuth({});
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <section className="pt-32 pb-28">
            <div className="max-w-5xl px-4 mx-auto">
                <h1 className="font-bold text-4xl">Your dashboard</h1>
                {auth?.accessToken ? (
                    <>
                        <p>You are a {auth?.userType}</p>
                        <button
                            className="mt-4 bg-secRed inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default Dashboard;
