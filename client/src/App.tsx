import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PersistLogin from "./components/PersistLogin";

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
