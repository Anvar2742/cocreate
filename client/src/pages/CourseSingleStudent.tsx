import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { CourseDoc } from "../interfaces/interfaces";
import AccessModal from "../components/AccessModal";
import Loader from "../components/Loader";
import LessonsStudent from "./LessonsStudent";

const CourseSingleStudent = () => {
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isCreateModal, setIsAccessModal] = useState<boolean>(false);
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSingleCourse = async () => {
        try {
            const resp = await axiosPrivate.post("/course/student", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setCourse(resp.data);
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err);
            if (err.response.status === 404) {
                setCourse(null);
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSingleCourse();
    }, [location?.pathname]);

    const toggleAccessModal = () => {
        setIsAccessModal((prev) => !prev);
    };

    return (
        <section className="pt-6 overflow-hidden">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto">
                {course ? (
                    <>
                        <div className="mb-4">
                            <h1 className="font-bold text-5xl mb-3">
                                {course?.title}
                            </h1>
                            <p className="mb-4">{course?.description}</p>
                        </div>
                        <LessonsStudent course={course} />
                    </>
                ) : (
                    "404"
                )}
            </div>
        </section>
    );
};

export default CourseSingleStudent;
