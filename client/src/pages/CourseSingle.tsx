import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { CourseDoc } from "../interfaces/interfaces";
import Lessons from "./Lessons";

const CourseSingle = () => {
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSingleCourse = async () => {
        try {
            const resp = await axiosPrivate.post("/course", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setCourse(resp.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSingleCourse();
    }, [location?.pathname]);

    return (
        <section className="pt-6">
            <div className="max-w-5xl px-4 m-auto">
                {isLoading ? (
                    "loading..."
                ) : (
                    <>
                        <div className="mb-4">
                            <h1 className="font-bold text-5xl mb-3">
                                {course?.title}
                            </h1>
                            <p className="mb-4">{course?.description}</p>

                            <button className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all">
                                Add a student
                            </button>
                        </div>
                        <Lessons course={course} />
                    </>
                )}
            </div>
        </section>
    );
};

export default CourseSingle;
