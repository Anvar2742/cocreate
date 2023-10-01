import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Students = () => {
    interface studentCop {
        email: string;
    }
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const [studentsArr, setStudentsArr] = useState([]);
    const [studentsEls, setStudentEls] = useState<JSX.Element[]>([]);

    const getStudents = async () => {
        try {
            const resp = await axiosPrivate.get("/students");
            console.log(resp);
            if (resp.status === 200) {
                setStudentsArr(resp?.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getStudents();
    }, [location?.pathname]);

    useEffect(() => {
        if (studentsArr.length) {
            setStudentEls(
                studentsArr.map((student: studentCop) => {
                    return <div key={student?.email}>{student?.email}</div>;
                })
            );
        }
    }, [studentsArr]);

    return (
        <div>
            <h1>Your Students</h1>
            <div className="grid">{studentsEls ? studentsEls : ""}</div>
        </div>
    );
};

export default Students;
