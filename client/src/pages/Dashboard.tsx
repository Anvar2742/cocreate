import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = async () => {
        try {
            const resp = await axios.get("/logout", { withCredentials: true });
            if (resp.status === 204) setAuth({});
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="py-10">
            <div className="max-w-5xl px-4">
                <h1 className="font-bold text-4xl">Your dashboard</h1>
                {auth?.accessToken ? (
                    <button
                        className="mt-4 bg-secRed inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default Dashboard;
