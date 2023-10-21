import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/courses/Courses";
import RequireAuth from "./components/RequireAuth";
import Auth from "./pages/auth/Auth";
import CourseSingle from "./pages/courses/CourseSingle";
import LessonSingle from "./pages/lessons/LessonSingle";
import Onboard from "./pages/auth/Onboard";
import RequireOnboard from "./components/RequireOnboard";
import useAuth from "./hooks/useAuth";
import CoursesStudents from "./pages/courses/CoursesStudent";
import CourseSingleStudent from "./pages/courses/CourseSingleStudent";
import LessonSingleStudent from "./pages/lessons/LessonSingleStudent";
import RequireActivate from "./components/RequireActivate";
import Activation from "./pages/auth/Activation";
import UserActivate from "./pages/auth/UserActivate";
import Studio from "./pages/Studio";
// import { useState } from "react";
// import Students from "./pages/Students";

function App() {
    const { auth } = useAuth();

    return (
        <>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Home />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/verify" element={<UserActivate />} />
                        <Route path="/onboarding" element={<Onboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/activation" element={<Activation />} />
                        <Route element={<RequireOnboard />}>
                            <Route element={<RequireActivate />}>
                                {/* <Route path="/students" element={<Students />} /> */}
                                <Route
                                    path="/studio"
                                    element={
                                        auth?.userType === "tutor" ? (
                                            <Studio />
                                        ) : (
                                            <CoursesStudents />
                                        )
                                    }
                                />
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
                                            <CourseSingle />
                                        ) : (
                                            <CourseSingleStudent />
                                        )
                                    }
                                />
                                <Route
                                    path="/courses/:courseSlug/:lessonSlug"
                                    element={
                                        auth?.userType === "tutor" ? (
                                            <LessonSingle />
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
