import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import heroImg from "./../img/hero-right.png";
import teacher from "./../img/teacher.png";
import studentTwo from "./../img/student-2.png";
import students from "./../img/students.png";
import { useState } from "react";
import Loader from "../components/Loader";

const Home = () => {
    const { auth } = useAuth();
    const [isLoad, setIsLoad] = useState<boolean>(true);

    if (auth?.accessToken) return <Navigate to={"/studio"} />;
    return (
        <>
            {isLoad ? <Loader /> : ""}
            <section className="pt-36 pb-28 sm:pt-16 sm:pb-0 bg-heroBg bg-cover sm:h-[80vh] max-h-[680px]">
                <div className="max-w-4xl mx-auto px-4 flex items-end justify-between h-full text-primText">
                    <div className=" max-w-md flex flex-col items-start justify-center h-full">
                        <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
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
                                        className=" fill-none stroke-primary stroke-5 animate-draw"
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
                                className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                Your Courses
                            </Link>
                        ) : (
                            <Link
                                to="/auth"
                                className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                Join for free
                            </Link>
                        )}
                    </div>
                    <div className="hidden sm:block">
                        <img
                            src={heroImg}
                            alt=""
                            className="w-110"
                            onLoad={() => setIsLoad(false)}
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 xs:py-32">
                <div className="max-w-5xl mx-auto px-4 text-primText text-center">
                    <h2 className=" text-4xl xs:text-5xl font-bold">
                        What is <span className="text-primary">Oxillia</span>?
                    </h2>
                    <p className=" text-lg xs:text-xl max-w-sm mt-4 mx-auto">
                        All in one sollution for tutors. An assistant to help
                        you manage your courses, lessons and engage with
                        students easily.
                    </p>
                    <div className="mt-10 flex flex-col xs:flex-row gap-5 sm:gap-7">
                        <div
                            style={{ backgroundImage: `url(${teacher})` }}
                            className="bg-cover bg-no-repeat bg-center flex items-center justify-center flex-col pt-14 xs:pt-20 pb-10 xs:pb-22 px-10 relative rounded-lg overflow-hidden xs:w-full before:bg-black before:bg-opacity-30 before:w-full before:h-full before:absolute before:top-0 before:left-0"
                        >
                            <h3 className=" text-3xl font-bold text-white z-10">
                                For tutors
                            </h3>
                            <Link
                                to={"/auth"}
                                className="text-white border-2 py-2 px-5 rounded-full mt-4 z-10 transition-all duration-300 hover:bg-primary"
                            >
                                Start a class today
                            </Link>
                        </div>
                        <div
                            style={{ backgroundImage: `url(${students})` }}
                            className="bg-cover bg-no-repeat bg-center flex items-center justify-center flex-col pt-14 xs:pt-20 pb-10 xs:pb-22 px-10 relative rounded-lg overflow-hidden xs:w-full before:bg-black before:bg-opacity-30 before:w-full before:h-full before:absolute before:top-0 before:left-0"
                        >
                            <h3 className=" text-3xl font-bold text-white z-10">
                                For learners
                            </h3>
                            <Link
                                to={"/auth"}
                                className="text-white border-2 py-2 px-5 rounded-full mt-4 z-10 transition-all duration-300 hover:bg-primary"
                            >
                                Join your tutor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-sec">
                <div
                    className={`max-w-5xl mx-auto px-4 text-primText md:flex md:items-center md:justify-between md:flex-row-reverse text-center sm:text-right`}
                >
                    <div>
                        <h2 className="text-3xl xs:text-4xl font-bold">
                            <span className="text-primary">Tools</span> for
                            teachers and learners
                        </h2>
                        <p
                            className={`text-lg xs:text-xl max-w-sm mt-4 mx-auto sm:mr-0 sm:ml-auto`}
                        >
                            Numerous usefull instruments to improve online
                            learning experience. Create courses, manage your
                            lessons as a tutor and learn faster as a student.
                        </p>
                    </div>
                    <div className="hidden sm:block sm:-mt-20 md:-mt-0">
                        <img
                            src={studentTwo}
                            alt=""
                            className="max-w-sm lg:max-w-md"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
