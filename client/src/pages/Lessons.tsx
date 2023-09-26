import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { LessonDoc } from "../interfaces/interfaces";

const Lessons = ({ courseId }: { courseId: string }) => {
    const [lessonsArr, setLessonsArr] = useState<LessonDoc[]>([]);
    const [lessonsEls, setLessonsEls] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getLessons = async () => {
        try {
            const resp = await axiosPrivate.post("/lessons", { courseId });
            if (resp.status === 200) {
                setLessonsArr(resp.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        getLessons();
    }, []);

    useEffect(() => {
        if (lessonsArr.length) {
            setLessonsEls(() => {
                return lessonsArr.map((lesson) => {
                    return (
                        <Link
                            to={`/lessons/${lesson.slug}`}
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
        <div className="flex flex-col gap-2">
            {isLoading ? "Loading..." : lessonsEls}
        </div>
    );
};

export default Lessons;
