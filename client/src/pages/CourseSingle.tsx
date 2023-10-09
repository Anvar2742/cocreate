import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from "react";
import { CourseDoc } from "../interfaces/interfaces";
import Lessons from "./Lessons";
import AccessModal from "../components/AccessModal";
import Loader from "../components/Loader";
import { IconEdit } from "@tabler/icons-react";

const CourseSingle = () => {
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [isCreateModal, setIsAccessModal] = useState<boolean>(false);
    const [course, setCourse] = useState<CourseDoc | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cssVariables, setCssVariables] = useState<any>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const getSingleCourse = async () => {
        try {
            const resp = await axiosPrivate.post("/course", { slug });
            console.log(resp);

            if (resp.status === 200) {
                setCourse(resp.data);
                setIsLoading(false);
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsEdit(true);
        setCourse((prev) => {
            return {
                ...prev,
                [e.target?.name]: e.target?.value,
            };
        });
    };

    return (
        <section className="pt-36 pb-28">
            {isLoading ? <Loader /> : ""}
            <div className="max-w-5xl px-4 m-auto">
                {course ? (
                    <>
                        <div className="mb-4">
                            <div className="flex items-center justify-between overflow-hidden">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        value={course?.title}
                                        style={
                                            cssVariables?.inputW as DetailedHTMLProps<
                                                InputHTMLAttributes<HTMLInputElement>,
                                                HTMLInputElement
                                            >
                                        }
                                        className={`font-bold text-5xl mb-3 outline-none w-[var(--inputW)]`}
                                    />
                                    <button className=" cursor-pointer">
                                        <IconEdit
                                            size={30}
                                            className=" stroke-gray-500"
                                        />
                                    </button>
                                </div>
                                <button
                                    className={`border-2 border-primary inline-block py-2 px-8 rounded-full font-semibold transition-all hover:shadow-lg ${
                                        !isEdit ? " translate-x-full" : ""
                                    }`}
                                >
                                    Update
                                </button>
                            </div>
                            <p className="mb-4">{course?.description}</p>

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
