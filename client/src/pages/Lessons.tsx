import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";
import { LessonDoc } from "../interfaces/interfaces";

const Lessons = () => {
    const location = useLocation();
    const [lessonsArr, setLessonsArr] = useState<LessonDoc[]>([]);
    const [lessonsEls, setLessonsEls] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getLessons = async () => {
        try {
            const resp = await axiosPrivate.get("/lessons");
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
    }, [location?.pathname]);

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
        <section className=" pt-24">
            <div className="max-w-5xl px-4 m-auto">
                <h1 className="font-bold text-5xl">Your lessons</h1>
                <div className="mt-8 gap-2 flex flex-col">
                    {isLoading ? "Loading..." : lessonsEls}
                </div>
            </div>
        </section>
    );
};

export default Lessons;
