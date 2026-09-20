import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task-manager" element={<Project />} />

          {/* Keep the old Practical 2 URL working. */}
          <Route path="/projects" element={<Navigate to="/task-manager" replace />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
