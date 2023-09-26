import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";

const CourseSingle = () => {
    const { slug } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const getSingleCourse = async () => {
        try {
            const resp = await axiosPrivate.post("/course", { slug });
            console.log(resp);

            if (resp.status === 200) {
                // console.log(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleCourse();
    }, [location?.pathname]);

    return (
        <div>
            <h1>CourseSingle : {slug}</h1>
        </div>
    );
};

export default CourseSingle;
