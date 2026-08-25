import { FaBell } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/");
    toast.success("Logout successfully")
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/10 border-b border-white/10">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Management</h1>

          <p className="text-sm text-slate-300 mt-1">
            Manage Students, Courses & Enrollments
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative rounded-full bg-white/10 p-3 hover:bg-white/20 transition">
            <FaBell className="text-white text-lg" />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="text-right">
            <p className="text-white font-semibold">
              {user?.username || "Administrator"}
            </p>

            <p className="text-slate-300 text-sm">System User</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-white font-medium hover:bg-red-600 transition shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
