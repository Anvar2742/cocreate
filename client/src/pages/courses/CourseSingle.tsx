import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CourseDoc } from "../../interfaces/interfaces";
import Lessons from "../lessons/Lessons";
import AccessModal from "../../components/AccessModal";
import Loader from "../../components/Loader";
import useGetSingle from "../../hooks/api/useGetSingle";
import { IconEdit } from "@tabler/icons-react";
import SingleUpdateModal from "../../components/SingleUpdate";

const CourseSingle = () => {
    const { slug } = useParams();
    const getSingle = useGetSingle();
    const location = useLocation();
    const navigate = useNavigate();

    const [isCreateModal, setIsAccessModal] = useState<boolean>(false);
    const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [generalErr, setGeneralErr] = useState<string>("");

    const titleInputRef = useRef(null);
    const descrInputRef = useRef(null);

    useEffect(() => {
        if (slug) {
            getSingle(slug, "course")
                .then((course) => {
                    setCourse(course);
                })
                .catch((err) => {
                    setGeneralErr(err.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [location?.pathname]);

    const toggleAccessModal = () => {
        setIsAccessModal((prev) => !prev);
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

    console.log(course);
    const updateCurrentCourse = (course: CourseDoc) => {
        setCourse(course);
        setIsUpdateModal(false);
        navigate("/courses/" + course.slug, { replace: true });
    };

    return (
        <section className="pt-36 pb-28">
            <div className="max-w-5xl px-4 m-auto">
                {isLoading ? <Loader /> : ""}
                {generalErr ? (
                    <p className="text-red-400">{generalErr}</p>
                ) : course ? (
                    <>
                        <div className="mb-4">
                            <div className="mb-5">
                                <div className="flex items-center gap-4 mb-3">
                                    <h1 className="text-3xl font-bold">
                                        {course.title}
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
                                    {course.description ? <p>{course.description}</p> : <p className="opacity-50">You can add a description here</p>}
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

                            <button
                                onClick={toggleAccessModal}
                                className="bg-primary inline-block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all"
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
                        <SingleUpdateModal
                            singleType="course"
                            toggleUpdateModal={toggleUpdateModal}
                            isUpdateModal={isUpdateModal}
                            single={course}
                            titleInputRef={titleInputRef}
                            descrInputRef={descrInputRef}
                            updateCurrentSingle={updateCurrentCourse}
                            slug={slug}
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
