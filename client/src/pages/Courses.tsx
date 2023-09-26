import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Courses = () => {
    // const location = useLocation();
    const [coursesArr, setCoursesArr] = useState([]);
    const getCourses = async () => {
        try {
            const resp = await axiosPrivate.get("/courses");
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getCourses();
    }, [location?.pathname]);

    return (
        <section className=" pt-24">
            <div className="max-w-5xl px-4 m-auto flex justify-between items-center">
                <h1 className="font-bold text-5xl">Your courses</h1>
                <div>courses here</div>
            </div>
        </section>
    );
};

export default Courses;
