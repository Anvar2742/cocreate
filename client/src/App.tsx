import { Navigate, Route, Routes } from "react-router-dom";
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
import NotFoundPage from "./pages/NotFoundPage";
// import { useState } from "react";
// import Students from "./pages/Students";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

function App() {
    // const { auth } = useAuth();

    return (
        <>
            <KindeProvider
                clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
                domain={import.meta.env.VITE_KINDE_DOMAIN}
                logoutUri={window.location.origin}
                redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
            >
                <Routes>
                    <Route element={<PersistLogin />}>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </KindeProvider>
        </>
    );
}

export default App;
