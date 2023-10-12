import {
    ChangeEvent,
    FormEvent,
    MutableRefObject,
    useEffect,
    useState,
} from "react";
import { IconX } from "@tabler/icons-react";
import compareObjects from "../utils/compareObjects";
import autoResizeTextArea from "../utils/autoResize";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CourseDoc, LessonDoc } from "../interfaces/interfaces";
import Loader from "./Loader";
import axios, { AxiosError } from "axios";

const SingleUpdateModal = ({
    singleType,
    single,
    isUpdateModal,
    toggleUpdateModal,
    titleInputRef,
    descrInputRef,
    updateCurrentSingle,
    slug,
}: {
    singleType: string;
    single: CourseDoc | LessonDoc | null;
    isUpdateModal: boolean;
    toggleUpdateModal: CallableFunction;
    titleInputRef: MutableRefObject<null>;
    descrInputRef: MutableRefObject<null>;
    updateCurrentSingle: CallableFunction;
    slug: string | undefined;
}) => {
    const initialFormData = {
        title: "",
        description: "",
    };
    const axiosPrivate = useAxiosPrivate();

    const [singleData, setCourseData] = useState<CourseDoc | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState(initialFormData);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [generalErr, setGeneralErr] = useState<string>("");
    const [textAreaRows, setTextAreaRows] = useState<{
        title: number;
        descr: number;
    }>({
        title: 1,
        descr: 1,
    });

    useEffect(() => {
        if (single) {
            setCourseData(() => {
                return {
                    title: single.title,
                    description: single.description,
                };
            });
        }
    }, [single]);

    useEffect(() => {
        if (singleData) {
            if (compareObjects(single, singleData, ["title", "description"])) {
                setIsEdit(false);
            } else {
                setIsEdit(true);
            }
        }
    }, [singleData]);

    useEffect(() => {
        setTextAreaRows((prev) => {
            if (titleInputRef.current && descrInputRef.current) {
                return {
                    title: autoResizeTextArea(titleInputRef.current),
                    descr: autoResizeTextArea(descrInputRef.current),
                };
            } else {
                return prev;
            }
        });
    }, [titleInputRef.current, descrInputRef.current]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormErrors(initialFormData);
        setGeneralErr("");
        setCourseData((prev) => {
            return {
                ...prev,
                [e.target?.name]: e.target?.value,
            };
        });

        setTextAreaRows((prev) => {
            if (titleInputRef.current && descrInputRef.current) {
                return {
                    title: autoResizeTextArea(titleInputRef.current),
                    descr: autoResizeTextArea(descrInputRef.current),
                };
            } else {
                return prev;
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (compareObjects(single, singleData, ["title", "description"])) {
            setGeneralErr("Nothing changed. Please edit a field to update.");
            return;
        }

        const errors = handleEmpty(singleData?.title, singleData?.description);
        if (errors.title) {
            setFormErrors(errors);
            return;
        }
        setIsSubmit(true);
        try {
            const resp = await axiosPrivate.put(`/${singleType}/update`, {
                singleData,
                slug,
            });

            if (resp.status === 200) {
                updateCurrentSingle(resp.data);
                setIsEdit(false);
            }
        } catch (err: Error | AxiosError | unknown) {
            if (axios.isAxiosError(err)) {
                // Access to config, request, and response
                // console.log(err);
                if (err.code === "ERR_NETWORK") {
                    setGeneralErr("Server error");
                } else {
                    setFormErrors(err.response?.data);
                }
            } else {
                setGeneralErr("Server error");
                // console.log(err);
            }
        } finally {
            setIsSubmit(false);
        }
    };

    const handleEmpty = (
        title: string | undefined,
        description: string | undefined
    ) => {
        let errors: {
            title: string;
            description: string;
        } = { title: "", description: "" };

        if (!title) {
            errors.title = "Please enter a title";
        }
        if (!description) {
            errors.description = "Please enter a description";
        }

        return errors;
    };

    return (
        <div>
            <div
                className={`w-screen h-screen backdrop-blur-sm bg-black top-0 bg-opacity-20 fixed left-0 transition-all duration-300 z-40 ${
                    isUpdateModal ? "block" : "hidden"
                }`}
            ></div>
            <div
                className={`text-blueGray fixed translate-y-1/2 left-0 right-0 mx-auto max-w-xs bg-white pt-8 pb-14 flex items-center flex-col bg-cover z-50 rounded-2xl transition-all duration-500 ${
                    isUpdateModal ? "bottom-1/2" : "-bottom-full"
                }  ${isSubmit ? "pointer-events-none overflow-hidden" : ""}`}
            >
                {isSubmit ? <Loader /> : ""}
                <form
                    className={`mt-4 w-full px-10 flex flex-col gap-3 relative`}
                    onSubmit={handleSubmit}
                >
                    <div className="">
                        <label htmlFor="title" className="block font-semibold">
                            Title
                        </label>
                        <textarea
                            ref={titleInputRef}
                            placeholder="Course title"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={singleData?.title}
                            className={`outline-none resize-y bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md min-h-[40px]`}
                            rows={textAreaRows.title}
                        ></textarea>
                        {formErrors.title ? (
                            <p className="text-red-400">{formErrors.title}</p>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="">
                        <label
                            htmlFor="description"
                            className="block font-semibold"
                        >
                            Description
                        </label>
                        <textarea
                            ref={descrInputRef}
                            placeholder="Course description"
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={singleData?.description}
                            className="outline-none resize-y bg-input text-blueGray py-2 px-4 rounded-lg mt-1 w-full shadow-md min-h-[40px]"
                            rows={textAreaRows.descr}
                        ></textarea>
                    </div>
                    {generalErr ? (
                        <p className="text-red-400 my-2">{generalErr}</p>
                    ) : (
                        ""
                    )}

                    <button
                        className={`border-2 border-primary inline-block py-2 px-8 rounded-full font-semibold transition-all hover:shadow-lg ${
                            !isEdit ? " pointer-events-none opacity-30" : ""
                        }`}
                    >
                        Update
                    </button>
                </form>
                <button
                    className="absolute -bottom-3 bg-secRed w-9 h-9 flex items-center justify-center rounded-full"
                    onClick={() => toggleUpdateModal()}
                >
                    <IconX color="white" />
                </button>
            </div>
        </div>
    );
};

export default SingleUpdateModal;
