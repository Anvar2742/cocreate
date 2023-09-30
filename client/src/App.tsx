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

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route element={<RequireAuth />}>
                    <Route path="/onboarding" element={<Onboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route element={<RequireOnboard />}>
                        <Route path="/courses" element={<Courses />} />
                        <Route
                            path="/courses/:slug"
                            element={<CourseSingle />}
                        />
                        <Route
                            path="/courses/:slug/:lessonSlug"
                            element={<LessonSingle />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
