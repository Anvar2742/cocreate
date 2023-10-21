import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import { LessonDoc } from "../interfaces/interfaces";
import LessonEditor from "../components/LessonEditor";
import Loader from "../components/Loader";
import { IconEdit } from "@tabler/icons-react";
import useGetSingle from "../hooks/api/useGetSingle";
import SingleUpdateModal from "../components/SingleUpdate";

const LessonSingle = () => {
    const { lessonSlug: slug, courseSlug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const getSingle = useGetSingle();
    const location = useLocation();
    const navigate = useNavigate();

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lesson, setLesson] = useState<LessonDoc | null>(null);
    const [lessonData, setLessonData] = useState<LessonDoc | null>(null);
    const [generalErr, setGeneralErr] = useState<string>("");
    const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);

    const titleInputRef = useRef(null);
    const descrInputRef = useRef(null);

    useEffect(() => {
        if (slug) {
            getSingle(slug, "lesson")
                .then((lesson) => {
                    setLesson(lesson);
                })
                .catch((err) => {
                    setGeneralErr(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [location?.pathname]);

    useEffect(() => {
        if (lesson) {
            setLessonData(lesson);
            setIsLoading(false);
        }
    }, [lesson]);

    const updateLesson = async (content: string) => {
        try {
            const resp = await axiosPrivate.put("/lesson/content", {
                slug,
                content,
            });
            console.log(resp);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdate(false);
        }
    };

    const updateContent = (content: string) => {
        setIsUpdate(true);
        updateLesson(content);
    };

    const toggleUpdateModal = (ref: any | null = null) => {
        setIsUpdateModal((prev) => !prev);

        if (ref?.current) {
            const textArea = ref.current;
            textArea.setSelectionRange(
                textArea.value.length,
                textArea.value.length
            );
            ref.current.focus();
        }
    };

    const updateCurrentLesson = (lesson: LessonDoc) => {
        setLesson(lesson);
        setIsUpdateModal(false);

        navigate(`/courses/${courseSlug}/${lesson.slug}`, { replace: true });
    };

    return (
        <section className="pt-32 pb-28">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto overflow-y-hidden">
                {lessonData ? (
                    <>
                        <div className="flex items-center justify-between overflow-hidden mb-10">
                            <div>
                                <div className="flex items-center gap-4 mb-3">
                                    <h1 className="text-3xl font-bold">
                                        {lesson?.title}
                                    </h1>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleUpdateModal(titleInputRef)
                                        }
                                    >
                                        <IconEdit
                                            size={30}
                                            className=" stroke-gray-500"
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p>{lesson?.description}</p>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleUpdateModal(descrInputRef)
                                        }
                                    >
                                        <IconEdit
                                            size={20}
                                            className=" stroke-gray-500"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <LessonEditor
                            updateContent={updateContent}
                            initialContent={lesson?.content}
                            isTutor={true}
                            isUpdate={isUpdate}
                        />
                    </>
                ) : (
                    "404"
                )}

                {generalErr ? <p className="text-red-400">{generalErr}</p> : ""}

                <SingleUpdateModal
                    singleType="lesson"
                    toggleUpdateModal={toggleUpdateModal}
                    isUpdateModal={isUpdateModal}
                    single={lesson}
                    titleInputRef={titleInputRef}
                    descrInputRef={descrInputRef}
                    updateCurrentSingle={updateCurrentLesson}
                    slug={slug}
                />
            </div>
        </section>
    );
};

export default LessonSingle;
