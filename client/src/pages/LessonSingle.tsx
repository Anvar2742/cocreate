import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { LessonDoc } from "../interfaces/interfaces";
import LessonEditor from "../components/LessonEditor";

const LessonSingle = () => {
    const { lessonSlug: slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [lesson, setLesson] = useState<LessonDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getSingleLesson = async () => {
        try {
            const resp = await axiosPrivate.post("/lesson", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setLesson(resp.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSingleLesson();
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
                                {lesson?.title}
                            </h1>
                            <p>{lesson?.description}</p>
                        </div>
                    </>
                )}
                <LessonEditor />
            </div>
        </section>
    );
};

export default LessonSingle;
