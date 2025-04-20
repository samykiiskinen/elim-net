import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Program from "./components/Program";
import AidProjects from "./components/AidProjects";
import Songs from "./components/Songs/Songs";
import Users from "./components/Users/Users";
import Login from "./components/Auth/Login";
import { AuthProvider } from "./components/Auth/AuthContext";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Program" element={<Program />}></Route>
            <Route path="/Users" element={<Users />}></Route>
            <Route
              path="/AidProjects"
              element={
                <PrivateRoute>
                  <AidProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="/Songs"
              element={
                <PrivateRoute>
                  <Songs />
                </PrivateRoute>
              }
            />
            <Route path="/Login" element={<Login />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
