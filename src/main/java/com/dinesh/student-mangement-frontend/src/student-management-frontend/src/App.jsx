import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProdectedRoute";
import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursePage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PublicCourseDetailsPage from "./pages/PublicCourseDetailsPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";

function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC
      ========================= */}

      <Route path="/" index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses/:id" element={<PublicCourseDetailsPage />} />

      {/* =========================
          ALL AUTHENTICATED USERS
          ========================= */}

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <StudentDashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* =========================
          ADMIN ONLY
      ========================= */}

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout>
              <StudentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout>
              <CoursesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/enrollments"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout>
              <EnrollmentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* =========================
          UNAUTHORIZED
      ========================= */}

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* =========================
          DEFAULT
      ========================= */}

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
