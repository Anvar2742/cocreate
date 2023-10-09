import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import { CourseDoc } from "../interfaces/interfaces";
import Lessons from "./Lessons";
import AccessModal from "../components/AccessModal";
import Loader from "../components/Loader";
import { IconEdit } from "@tabler/icons-react";
import areObjectsEqual from "../utils/compareObjects";

const CourseSingle = () => {
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isCreateModal, setIsAccessModal] = useState<boolean>(false);
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [courseData, setCourseData] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cssVariables, setCssVariables] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const titleInputRef = useRef(null);
    const titleDescrRef = useRef(null);

    const getSingleCourse = async () => {
        try {
            const resp = await axiosPrivate.post("/course", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setCourse(resp.data);
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

    useEffect(() => {
        if (course) {
            setCourseData(course);
            setIsLoading(false);
        }
    }, [course]);

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

    useEffect(() => {
        setCssVariables({
            inputW: {
                "--inputW": `${
                    course?.title?.length ? course?.title?.length - 1.5 : ""
                }ch`,
            },
        });
    }, [course]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
        if (!areObjectsEqual(course, courseData)) {
            return;
        }
        setIsLoading(true);
        try {
            const resp = await axiosPrivate.put("/courses/update", {
                courseData,
            });
            console.log(resp);
        } catch (err: any) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="pt-36 pb-28">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto">
                {courseData ? (
                    <>
                        <div className="mb-4">
                            <div className="flex items-center justify-between overflow-hidden">
                                <div>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            ref={titleInputRef}
                                            name="title"
                                            onChange={handleChange}
                                            value={courseData?.title}
                                            style={
                                                cssVariables?.inputW as DetailedHTMLProps<
                                                    InputHTMLAttributes<HTMLInputElement>,
                                                    HTMLInputElement
                                                >
                                            }
                                            className={`font-bold text-5xl mb-3 outline-none w-[var(--inputW)] min-w-[300px] max-w-xs`}
                                        />
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
                                            ref={titleDescrRef}
                                            placeholder="Course description"
                                            name="description"
                                            onChange={handleChange}
                                            value={courseData?.description}
                                            className={`mb-3 outline-none min-w-[300px] resize-y`}
                                        ></textarea>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() =>
                                                focusInput(titleDescrRef)
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
                    "404"
                )}
            </div>
        </section>
    );
};

export default CourseSingle;
