import { useLocation } from "react-router-dom";
import Lessons from "./Lessons";
import { CourseDoc } from "../interfaces/interfaces";

const CourseSingle = () => {
    const location = useLocation();
    const { course }: { course: CourseDoc } = location?.state;
    const courseId = course?._id;

    return (
        <section className="pt-6">
            <div className="max-w-5xl px-4 m-auto">
                <div className="mb-4">
                    <h1 className="font-bold text-5xl mb-3">{course?.title}</h1>
                    <p>{course?.description}</p>
                </div>
                <Lessons courseId={courseId} />
            </div>
        </section>
    );
};

export default CourseSingle;
