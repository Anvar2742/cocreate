import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    const allCookies = document.cookie;
    alert(allCookies);
    return (
        <>
            <section className="py-32 bg-heroBg bg-cover">
                <div className="max-w-5xl mx-auto px-4">
                    <h1 className="text-3xl font-bold">A helper for tutors</h1>
                    <p className="text-lg mt-1 mb-3">
                        Oxillia is designed to create and manage your courses.
                    </p>
                    {auth?.accessToken ? (
                        <Link
                            to="/courses"
                            className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                        >
                            Your Courses
                        </Link>
                    ) : (
                        <Link
                            to="/auth"
                            className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                        >
                            Sign Up
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
