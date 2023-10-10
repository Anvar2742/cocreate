import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import RequireAuth from "./components/RequireAuth";
import Auth from "./pages/Auth";
import CourseSingle from "./pages/CourseSingle";
import LessonSingle from "./pages/LessonSingle";
import Onboard from "./pages/Onboard";
import RequireOnboard from "./components/RequireOnboard";
import useAuth from "./hooks/useAuth";
import CoursesStudents from "./pages/CoursesStudent";
import CourseSingleStudent from "./pages/CourseSingleStudent";
import LessonSingleStudent from "./pages/LessonSingleStudent";
import RequireActivate from "./components/RequireActivate";
import Activation from "./pages/Activation";
import UserActivate from "./pages/UserActivate";
import { useState } from "react";
// import Students from "./pages/Students";

function App() {
    const { auth } = useAuth();
    const [msg, setMsg] = useState<string>("");

    const handleMsg = (msg: string) => {
        setMsg(msg);
        setTimeout(() => {
            setMsg("");
        }, 5000);
    };

    return (
        <>
            <p
                className={`fixed bottom-32 transition-all z-50 ${
                    msg ? "right-4" : "-right-full opacity-0"
                } bg-primary shadow-lg text-white text-xl py-1 px-4 min-h-[36px]`}
            >
                {msg}
            </p>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Home />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/activate" element={<UserActivate />} />
                        <Route path="/onboarding" element={<Onboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/activation" element={<Activation />} />
                        <Route element={<RequireOnboard />}>
                            <Route element={<RequireActivate />}>
                                {/* <Route path="/students" element={<Students />} /> */}
                                <Route
                                    path="/courses"
                                    element={
                                        auth?.userType === "tutor" ? (
                                            <Courses />
                                        ) : (
                                            <CoursesStudents />
                                        )
                                    }
                                />
                                <Route
                                    path="/courses/:slug"
                                    element={
                                        auth?.userType === "tutor" ? (
                                            <CourseSingle
                                                handleMsg={handleMsg}
                                            />
                                        ) : (
                                            <CourseSingleStudent />
                                        )
                                    }
                                />
                                <Route
                                    path="/courses/:courseSlug/:lessonSlug"
                                    element={
                                        auth?.userType === "tutor" ? (
                                            <LessonSingle
                                                handleMsg={handleMsg}
                                            />
                                        ) : (
                                            <LessonSingleStudent />
                                        )
                                    }
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
