import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";

import WardenDashboard from "./pages/WardenDashboard";

import SecurityDashboard from "./pages/SecurityDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <ProtectedRoute
              allowedRole="student"
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* WARDEN */}
        <Route
          path="/warden"
          element={
            <ProtectedRoute
              allowedRole="warden"
            >
              <WardenDashboard />
            </ProtectedRoute>
          }
        />

        {/* SECURITY */}
        <Route
          path="/security"
          element={
            <ProtectedRoute
              allowedRole="security"
            >
              <SecurityDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;