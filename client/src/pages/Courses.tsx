import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";
import { CourseDoc } from "../interfaces/interfaces";

const Courses = () => {
    const location = useLocation();
    const [coursesArr, setCoursesArr] = useState<CourseDoc[]>([]);
    const [coursesEls, setCoursesEls] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCourses = async () => {
        try {
            const resp = await axiosPrivate.get("/courses");
            if (resp.status === 200) {
                setCoursesArr(resp.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getCourses();
    }, [location?.pathname]);

    useEffect(() => {
        if (coursesArr.length) {
            setCoursesEls(() => {
                return coursesArr.map((course) => {
                    return (
                        <Link
                            to={`/courses/${course.slug}`}
                            state={{ course }}
                            key={course._id}
                            className="border-2 border-primary rounded-md bg-gray-100 py-2 px-4 block"
                        >
                            <h3 className="font-bold text-2xl">
                                {course.title}
                            </h3>
                            <p>{course.description}</p>
                        </Link>
                    );
                });
            });
        }
    }, [coursesArr]);

    return (
        <section className=" pt-24">
            <div className="max-w-5xl px-4 m-auto">
                <h1 className="font-bold text-5xl">Your courses</h1>
                <div className="mt-8 gap-2 flex flex-col">
                    {isLoading ? "Loading..." : coursesEls}
                </div>
            </div>
        </section>
    );
};

export default Courses;
