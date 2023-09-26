import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";

const Courses = () => {
    interface CourseDoc {
        title: string;
        description: string;
        _id: string;
        slug: string;
    }

    const location = useLocation();
    const [coursesArr, setCoursesArr] = useState<CourseDoc[]>([]);
    const [coursesEls, setCoursesEls] = useState<JSX.Element[]>([]);
    const getCourses = async () => {
        try {
            const resp = await axiosPrivate.get("/courses");
            if (resp.status === 200) {
                setCoursesArr(resp.data);
            }
        } catch (error) {
            console.log(error);
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
                        <Link to={`/${course.slug}`} key={course._id}>
                            <h3 className="">{course.title}</h3>
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
                <div className="mt-8">{coursesEls}</div>
            </div>
        </section>
    );
};

export default Courses;
