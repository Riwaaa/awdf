import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";

// Practical 8: Lazy-loaded route components
const Project = lazy(() => import("./pages/Project"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="page-container">
        <Suspense
          fallback={
            <div
              style={{
                minHeight: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Main Task Manager route - lazy loaded */}
            <Route path="/task-manager" element={<Project />} />

            {/* Keep old Practical 2 URL working */}
            <Route
              path="/projects"
              element={<Navigate to="/task-manager" replace />}
            />

            {/* Contact route - lazy loaded */}
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Notfound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;