import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Program from "./components/Program";
import AidProjects from "./components/AidProjects/AidProjects";
import Songs from "./components/Songs/Songs";
import Users from "./components/Users/Users";
import { AuthProvider } from "./components/Auth/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { useState } from "react";
import LoginDialog from "./components/Auth/LoginDialog";

function App() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleLoginPrompt = () => {
    setOpenLoginDialog(true);
  };

  const closeLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Program" element={<Program />} />
            <Route
              path="/Login"
              element={
                <LoginDialog
                  open={openLoginDialog}
                  onClose={closeLoginDialog}
                />
              }
            />

            <Route
              path="/AidProjects"
              element={
                <ProtectedRoute
                  roles={["Admin", "AidProjects"]}
                  onLoginPrompt={handleLoginPrompt}
                >
                  <AidProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Songs"
              element={
                <ProtectedRoute
                  roles={["Admin", "Music"]}
                  onLoginPrompt={handleLoginPrompt}
                >
                  <Songs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Users"
              element={
                <ProtectedRoute
                  roles={["Admin"]}
                  onLoginPrompt={handleLoginPrompt}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
