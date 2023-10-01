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
// import Students from "./pages/Students";

function App() {
    const { auth } = useAuth();

    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route element={<RequireAuth />}>
                    <Route path="/onboarding" element={<Onboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route element={<RequireOnboard />}>
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
        </Routes>
    );
}

export default App;
