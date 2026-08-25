import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaCalendarDays,
} from "react-icons/fa6";
import { getMyEnrollments, getMyProfile } from "../api/studentService";

const StudentDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStudentDashboard();
  }, []);

  const loadStudentDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [profileData, enrollmentData] = await Promise.all([
        getMyProfile(),
        getMyEnrollments(),
      ]);
      console.log(profileData)
      console.log(getMyEnrollments)

      setProfile(profileData);
      setEnrollments(enrollmentData || []);
    } catch (err) {
      console.error("Student dashboard loading failed:", err);

      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.log("URL:", err.config?.url);

      setError(
        err.response?.data?.message ||
          `Request failed with status ${err.response?.status || "unknown"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />

          <p className="mt-4 text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
        <h2 className="text-xl font-bold text-red-400">Dashboard Error</h2>

        <p className="mt-2 text-red-300">{error}</p>

        <button
          type="button"
          onClick={loadStudentDashboard}
          className="mt-5 rounded-xl bg-red-500/20 px-5 py-3 font-medium text-red-300 transition hover:bg-red-500/30"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
            <FaUserGraduate className="text-3xl text-white" />
          </div>

          <div>
            <p className="text-sm font-medium text-blue-400">
              Student Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              Welcome, {profile?.fullName} 👋
            </h1>

            <p className="mt-2 text-slate-300">
              Manage your profile and track your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20">
            <FaUserGraduate className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">My Profile</h2>

            <p className="text-sm text-slate-400">Your personal information</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileItem
            icon={<FaUserGraduate />}
            label="Full Name"
            value={profile?.fullName}
          />

          <ProfileItem
            icon={<FaEnvelope />}
            label="Email"
            value={profile?.email}
          />

          <ProfileItem
            icon={<FaPhone />}
            label="Phone"
            value={profile?.phone || "Not provided"}
          />

          <ProfileItem
            icon={<FaCalendarDays />}
            label="Date of Birth"
            value={profile?.dateOfBirth || "Not provided"}
          />

          <ProfileItem
            icon={<FaLocationDot />}
            label="Address"
            value={profile?.address || "Not provided"}
          />

          <ProfileItem
            icon={<FaUserGraduate />}
            label="Status"
            value={profile?.status}
          />
        </div>
      </section>

      {/* Courses */}
      <section className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20">
              <FaBookOpen className="text-purple-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">My Courses</h2>

              <p className="text-sm text-slate-400">
                Courses you are currently enrolled in
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-purple-500/20 px-4 py-2">
            <span className="font-semibold text-purple-300">
              {enrollments.length}
            </span>

            <span className="ml-1 text-sm text-purple-300">
              {enrollments.length === 1 ? "Course" : "Courses"}
            </span>
          </div>
        </div>

        {enrollments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
            <FaBookOpen className="mx-auto text-4xl text-slate-500" />

            <h3 className="mt-4 text-lg font-semibold text-white">
              No courses yet
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              You haven't enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.enrollmentId}
                className="rounded-2xl border border-white/10 bg-black/10 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-400">
                      {enrollment.courseCode}
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      {enrollment.courseTitle}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      enrollment.status === "ENROLLED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {enrollment.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {enrollment.description || "No course description available."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">Duration</p>

                    <p className="mt-1 font-semibold text-white">
                      {enrollment.durationInMonths} months
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-slate-500">Fee</p>

                    <p className="mt-1 font-semibold text-white">
                      ₹{enrollment.fee}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                  <FaCalendarDays />

                  <span>Enrolled on {enrollment.enrollmentDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="rounded-2xl bg-black/10 p-4">
      <div className="flex items-center gap-3">
        <div className="text-blue-400">{icon}</div>

        <p className="text-sm text-slate-400">{label}</p>
      </div>

      <p className="mt-2 break-words font-semibold text-white">{value}</p>
    </div>
  );
};

export default StudentDashboardPage;
