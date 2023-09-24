import AuthModal from "../components/AuthModal";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />
            <section className="py-32 bg-heroBg bg-cover">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold">Seak collaborators</h1>
                    <p className="text-lg mt-1 mb-3">
                        Create great projects together!
                    </p>
                    <Link
                        to="/discover"
                        className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                    >
                        Discover
                    </Link>
                </div>
            </section>
            <AuthModal />
            <div className="w-screen h-screen bg-black backdrop-blur-sm bg-opacity-20 fixed top-0 left-0"></div>
        </>
    );
};

export default Home;
