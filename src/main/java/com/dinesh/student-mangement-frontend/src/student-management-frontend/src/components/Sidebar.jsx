import {
  FaBook,
  FaClipboardList,
  FaHouse,
  FaUserGraduate,
} from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

import { NavLink } from "react-router-dom";
import { hasRole } from "../utils/permissions";

const navItem = ({ isActive }) =>
  `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 font-medium ${
    isActive
      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-[1.03]"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <aside className="sticky top-0 h-auto  w-72 backdrop-blur-xl bg-white/10 border-r border-white/10 p-6">
      <div className="mb-10">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
          S
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">SMS Panel</h2>

        <p className="text-slate-300 text-sm">Admin Dashboard</p>
      </div>

      <nav className="space-y-3">
        <NavLink to="/dashboard" className={navItem}>
          <FaHouse />
          Dashboard
        </NavLink>

        {hasRole(role.toUpperCase()) && (
          <>
            <NavLink to="/students" className={navItem}>
              <FaUserGraduate />
              Students
            </NavLink>

            <NavLink to="/courses" className={navItem}>
              <FaBook />
              Courses
            </NavLink>

            <NavLink to="/enrollments" className={navItem}>
              <FaClipboardList />
              Enrollments
            </NavLink>
          </>
        )}
      </nav>

      <div className="absolute bottom-8 left-6 right-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 shadow-xl">
        <h3 className="text-white font-semibold">Student Management</h3>

        <p className="text-blue-100 text-sm mt-2">
          Java Spring Boot + React + JWT + PostgreSQL
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
