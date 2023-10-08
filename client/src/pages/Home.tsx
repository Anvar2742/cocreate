import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import heroImg from "./../img/hero-right.png";

const Home = () => {
    const { auth } = useAuth();
    return (
        <>
            <section className="py-32 sm:pt-16 sm:pb-0 bg-heroBg bg-cover">
                <div className="max-w-5xl mx-auto px-4 flex items-center justify-center text-primText">
                    <div className=" max-w-md">
                        <h1 className="text-xl sm:text-5xl font-bold leading-tight">
                            A personal assistant for{" "}
                            <span className="relative inline-block">
                                tutors
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 500 150"
                                    preserveAspectRatio="none"
                                    className="absolute left-1/2 top-1/2 w-[calc(100%+20px)] h-[calc(100%+20px)] -translate-x-1/2 -translate-y-1/2"
                                >
                                    <path
                                        d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"
                                        className=" fill-none stroke-primary stroke-3 animate-draw"
                                    ></path>
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg mt-6 mb-8 max-w-xs">
                            Engage with your students with ease, create and
                            manage your courses
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
                    <div className="hidden sm:block">
                        <img src={heroImg} alt="" className="w-100" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
