import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { LessonDoc } from "../interfaces/interfaces";
import LessonEditor from "../components/LessonEditor";
import Loader from "../components/Loader";

const LessonSingle = () => {
    const [lesson, setLesson] = useState<LessonDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();
    const { lessonSlug: slug } = useParams();

    const getSingleLesson = async () => {
        try {
            const resp = await axiosPrivate.post("/lesson", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setLesson(resp.data);
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err);
            if (err.response.status === 404) {
                setLesson(null);
            }
            setIsLoading(false);
        }
    };

    const updateLesson = async (content: string) => {
        try {
            const resp = await axiosPrivate.put("/lesson", {
                slug,
                content,
            });
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const updateContent = (content: string) => {
        updateLesson(content);
    };

    useEffect(() => {
        getSingleLesson();
    }, [location?.pathname]);

    return (
        <section className="py-20">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto overflow-y-hidden">
                {lesson ? (
                    <>
                        <div className="mb-10">
                            <h1 className="font-bold text-5xl mb-3">
                                {lesson?.title}
                            </h1>
                            <p>{lesson?.description}</p>
                        </div>
                        <div
                            className={`transition-all duration-500 ${
                                isLoading
                                    ? "opacity-0 translate-y-full"
                                    : "opacity-100 translate-y-0"
                            }`}
                        >
                            <LessonEditor
                                updateContent={updateContent}
                                initialContent={lesson?.content}
                            />
                        </div>
                    </>
                ) : (
                    "404"
                )}
            </div>
        </section>
    );
};

export default LessonSingle;
