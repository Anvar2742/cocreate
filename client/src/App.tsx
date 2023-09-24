import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
