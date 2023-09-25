import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import RequireAuth from "./components/RequireAuth";
import Auth from "./pages/Auth";

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courses" element={<Courses />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
