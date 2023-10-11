import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CourseDoc } from "../interfaces/interfaces";
import Lessons from "./Lessons";
import AccessModal from "../components/AccessModal";
import Loader from "../components/Loader";
import { IconEdit } from "@tabler/icons-react";
import areObjectsEqual from "../utils/compareObjects";
import useGetSingle from "../hooks/api/useGetSingle";

const CourseSingle = ({ handleMsg }: { handleMsg: CallableFunction }) => {
    const initialFormData = {
        title: "",
        description: "",
    };
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const getSingle = useGetSingle();

    const [isCreateModal, setIsAccessModal] = useState<boolean>(false);
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [courseData, setCourseData] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState(initialFormData);
    const [generalErr, setGeneralErr] = useState<string>("");

    const titleInputRef = useRef(null);
    const descrInputRef = useRef(null);

    useEffect(() => {
        if (slug) {
            getSingle(slug, "course")
                .then((course) => {
                    setCourse(course);
                    setCourseData(course);
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
        if (courseData) {
            if (areObjectsEqual(course, courseData)) {
                setIsEdit(false);
            } else {
                setIsEdit(true);
            }
        }
    }, [courseData]);

    const toggleAccessModal = () => {
        setIsAccessModal((prev) => !prev);
    };

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
    };

    const focusInput = (ref: any) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const handleUpdate = async () => {
        if (areObjectsEqual(course, courseData)) {
            handleMsg("Nothing changed. Please edit a field to update.");
            return;
        }

        const errors = handleEmpty(courseData?.title, courseData?.description);
        if (errors.title) {
            setFormErrors(errors);
            return;
        }
        setIsLoading(true);
        try {
            const resp = await axiosPrivate.put("/course/update", {
                courseData,
            });

            if (resp.status === 204) {
                setCourse(resp.data);
                setIsEdit(false);
            }
        } catch (err: any) {
            setGeneralErr("Server Error");
        } finally {
            setIsLoading(false);
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
        <section className="pt-36 pb-28">
            <div className="max-w-5xl px-4 m-auto">
                {isLoading ? <Loader /> : ""}
                {generalErr ? <p className="text-red-400">{generalErr}</p> : ""}
                {courseData ? (
                    <>
                        <div className="mb-4">
                            <div className="flex items-center justify-between overflow-hidden">
                                <div>
                                    <div className="flex items-center">
                                        <textarea
                                            ref={titleInputRef}
                                            placeholder="Course title"
                                            name="title"
                                            onChange={handleChange}
                                            value={courseData?.title}
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
                                        {formErrors.title ? (
                                            <p className="text-red-400 mt-2">
                                                {formErrors.title}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <textarea
                                            ref={descrInputRef}
                                            placeholder="Course description"
                                            name="description"
                                            onChange={handleChange}
                                            value={courseData?.description}
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

                            <button
                                onClick={toggleAccessModal}
                                className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-black hover:[text-shadow:_0_2px_3px_rgb(0_0_0_/_40%)] transition-all"
                            >
                                Add a student
                            </button>
                        </div>
                        <Lessons course={course} />
                        <AccessModal
                            toggleAccessModal={toggleAccessModal}
                            isAccessModal={isCreateModal}
                            courseId={course?._id}
                        />
                    </>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default CourseSingle;
