import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { CourseDoc, LessonDoc } from "../interfaces/interfaces";
import TitleLoader from "../components/TitleLoader";
import { AxiosError } from "axios";

const LessonsStudent = ({ course }: { course: CourseDoc | null }) => {
    const [lessonsArr, setLessonsArr] = useState<LessonDoc[]>([]);
    const [lessonsEls, setLessonsEls] = useState<JSX.Element[] | JSX.Element>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const courseId: string | null = course?._id ? course?._id : null;
    const axiosPrivate = useAxiosPrivate();

    const getLessons = async () => {
        try {
            const resp = await axiosPrivate.post("/lessons/student", {
                courseId,
            });
            if (resp.status === 200) {
                setLessonsArr(resp.data);
                setIsLoading(false);
            }
        } catch (error: AxiosError | any) {
            console.log(error);

            if (error.response.status === 404) {
                setLessonsEls(
                    <div>
                        <h2 className="font-medium text-xl">
                            No lesson in this course
                        </h2>
                        <p className="text-md">
                            Your tutor is creating something great for you
                        </p>
                    </div>
                );
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) {
            getLessons();
        }
    }, [course]);

    useEffect(() => {
        if (lessonsArr.length) {
            setLessonsEls(() => {
                return lessonsArr.map((lesson) => {
                    return (
                        <Link
                            to={`/courses/${course?.slug}/${lesson.slug}`}
                            key={lesson._id}
                            className="border-2 border-primary rounded-md bg-gray-100 py-2 px-4 block"
                        >
                            <h3 className="font-bold text-2xl">
                                {lesson.title}
                            </h3>
                            <p>{lesson.description}</p>
                        </Link>
                    );
                });
            });
        }
    }, [lessonsArr]);

    return (
        <div className="flex flex-col gap-2 pt-36 pb-28">
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {isLoading ? <TitleLoader /> : lessonsEls}
            </div>
        </div>
    );
};

export default LessonsStudent;
