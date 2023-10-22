import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { CourseDoc, LessonDoc } from "../../interfaces/interfaces";
import TitleCreateModal from "../../components/TitleCreateModal";
import TitleLoader from "../../components/TitleLoader";
import { AxiosError } from "axios";
import NotFound from "../../components/NotFound";

const Lessons = ({ course }: { course: CourseDoc | null }) => {
    const [isCreateModal, setIsCreateModal] = useState<boolean>(false);
    const [lessonsArr, setLessonsArr] = useState<LessonDoc[]>([]);
    const [lessonsEls, setLessonsEls] = useState<JSX.Element[] | JSX.Element>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const courseId: string | null = course?._id ? course?._id : null;
    const axiosPrivate = useAxiosPrivate();

    const getLessons = async () => {
        try {
            const resp = await axiosPrivate.post("/lessons", { courseId });
            if (resp.status === 200) {
                setLessonsArr(resp.data);
                setIsLoading(false);
            }
        } catch (error: AxiosError | any) {
            console.log(error);

            if (error.response.status === 404) {
                setLessonsEls(
                    <NotFound title="No lesson in this course" subTitle="Let's create one" img="" />
                );
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (courseId) {
            getLessons();
        }
    }, [course]);

    useEffect(() => {
        if (lessonsArr.length) {
            setLessonsEls(() => {
                return lessonsArr.map((lesson) => {
                    return (
                        <Link
                            to={`/courses/${course?.slug}/${lesson.slug}`}
                            key={lesson._id}
                            className="border-2 rounded-md py-4 px-6 block transition-all duration-300 shadow-lg hover:shadow-none"
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

    const toggleCreateModal = () => {
        setIsCreateModal((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {isLoading ? <TitleLoader /> : lessonsEls}
            </div>
            <button
                onClick={toggleCreateModal}
                className="bg-primary block text-white py-2 px-8 rounded-full font-semibold hover:shadow-lg transition-all mt-6 mx-auto"
            >
                New Lesson
            </button>
            <TitleCreateModal
                toggleCreateModal={toggleCreateModal}
                isCreateModal={isCreateModal}
                typeOfTitle="lesson"
                courseId={courseId}
            />
        </div>
    );
};

export default Lessons;
