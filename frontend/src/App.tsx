import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Program from "./components/Program";
import AidProjects from "./components/AidProjects";
import Songs from "./components/Songs/Songs";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Program" element={<Program />}></Route>
          <Route path="/AidProjects" element={<AidProjects />}></Route>
          <Route path="/Songs" element={<Songs />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
