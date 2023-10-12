import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LessonDoc } from "../interfaces/interfaces";
import LessonEditor from "../components/LessonEditor";
import Loader from "../components/Loader";
import { IconEdit } from "@tabler/icons-react";
import compareObjects from "../utils/compareObjects";

const LessonSingle = ({ handleMsg }: { handleMsg: CallableFunction }) => {
    const { lessonSlug: slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lesson, setLesson] = useState<LessonDoc | null>(null);
    const [lessonData, setLessonData] = useState<LessonDoc | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const titleInputRef = useRef(null);
    const descrInputRef = useRef(null);

    const getSingleLesson = async () => {
        try {
            const resp = await axiosPrivate.post("/lesson", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setLesson(resp.data);
                setIsLoading(false);
            }
        } catch (err: any) {
            // console.log(err);
            if (err.response.status === 404) {
                setLesson(null);
            }
            setIsLoading(false);
        }
    };

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

    useEffect(() => {
        getSingleLesson();
    }, [location?.pathname]);

    useEffect(() => {
        if (lesson) {
            setLessonData(lesson);
            setIsLoading(false);
        }
    }, [lesson]);

    useEffect(() => {
        if (lessonData) {
            if (compareObjects(lesson, lessonData)) {
                setIsEdit(false);
            } else {
                setIsEdit(true);
            }
        }
    }, [lessonData]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setLessonData((prev) => {
            return {
                ...prev,
                [e.target?.name]: e.target?.value,
            };
        });
    };

    const focusInput = (ref: any) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const handleUpdate = async () => {
        if (compareObjects(lesson, lessonData)) {
            handleMsg("Nothing changed. Please edit a field to update.");
            return;
        }
        setIsLoading(true);
        try {
            const resp = await axiosPrivate.put("/lesson/update", {
                lessonData,
            });

            console.log(resp);
            if (resp.status === 204) {
                setLesson(resp.data);
                setIsEdit(false);
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="pt-32 pb-28">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto overflow-y-hidden">
                {lessonData ? (
                    <>
                        <div className="flex items-center justify-between overflow-hidden mb-10">
                            <div>
                                <div className="flex items-center">
                                    <textarea
                                        ref={titleInputRef}
                                        placeholder="Lesson title"
                                        name="title"
                                        onChange={handleChange}
                                        value={lessonData?.title}
                                        className={`mb-3 outline-none min-w-[300px] resize-y text-3xl font-bold`}
                                    ></textarea>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            focusInput(titleInputRef)
                                        }
                                    >
                                        <IconEdit
                                            size={30}
                                            className=" stroke-gray-500"
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <textarea
                                        ref={descrInputRef}
                                        placeholder="Lesson description"
                                        name="description"
                                        onChange={handleChange}
                                        value={lessonData?.description}
                                        className={`mb-3 outline-none min-w-[300px] resize-y`}
                                    ></textarea>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            focusInput(descrInputRef)
                                        }
                                    >
                                        <IconEdit
                                            size={30}
                                            className=" stroke-gray-500"
                                        />
                                    </button>
                                </div>
                            </div>
                            <button
                                className={`border-2 border-primary inline-block py-2 px-8 rounded-full font-semibold transition-all hover:shadow-lg ${
                                    !isEdit ? " translate-x-full" : ""
                                }`}
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
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
                                isTutor={true}
                                isUpdate={isUpdate}
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
