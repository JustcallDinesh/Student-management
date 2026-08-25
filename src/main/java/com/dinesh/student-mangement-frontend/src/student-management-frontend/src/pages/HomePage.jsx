import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaUsers,
  FaUserPlus,
  FaCheck,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import api from "../services/api";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeStudents: 0,
  });

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const [coursesResponse, statsResponse] = await Promise.all([
        api.get("/public/courses"),
        api.get("/public/stats"),
      ]);

      setCourses(coursesResponse.data || []);

      setStats(
        statsResponse.data || {
          totalStudents: 0,
          totalCourses: 0,
          totalEnrollments: 0,
          activeStudents: 0,
        },
      );
    } catch (err) {
      console.error("Failed to load public courses:", err);

      setError("Unable to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}

      <nav className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
              <FaGraduationCap className="text-xl" />
            </div>

            <div>
              <h1 className="font-bold text-lg">Student Management</h1>

              <p className="text-xs text-slate-400">Learn. Grow. Succeed.</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm text-white transition hover:text-blue-400"
            >
              Home
            </Link>

            <a
              href="#courses"
              className="text-sm text-slate-300 transition hover:text-blue-400"
            >
              Courses
            </a>

            <a
              href="#about"
              className="text-sm text-slate-300 transition hover:text-blue-400"
            >
              About
            </a>

            <Link
              to="/login"
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:py-32">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <FaBookOpen />
            Explore learning opportunities
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Build Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future With Us
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Discover professional courses, develop new skills, and take the next
            step toward your career goals.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#courses"
              className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
            >
              Explore Courses
              <FaArrowRight />
            </a>

            <Link
              to="/register"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold transition hover:bg-white/10"
            >
              <FaUserPlus />
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTICS */}

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 sm:grid-cols-3">
          <div className="text-center">
            <FaBookOpen className="mx-auto mb-3 text-2xl text-blue-400" />

            <h2 className="text-4xl font-bold">{stats.totalCourses}</h2>

            <p className="mt-2 text-slate-400">Courses Available</p>
          </div>

          <div className="text-center">
            <FaUsers className="mx-auto mb-3 text-2xl text-purple-400" />

            <h2 className="text-4xl font-bold">{stats.totalStudents}</h2>

            <p className="mt-2 text-slate-400">Students Learning</p>
          </div>

          <div className="text-center">
            <FaGraduationCap className="mx-auto mb-3 text-2xl text-green-400" />

            <h2 className="text-4xl font-bold">{stats.totalEnrollments}</h2>

            <p className="mt-2 text-slate-400">Successful Enrollments</p>
          </div>
        </div>
      </section>

      {/* COURSES */}

      <section id="courses" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Our Courses
            </p>

            <h2 className="mt-2 text-4xl font-bold">Available Courses</h2>

            <p className="mt-3 text-slate-400">
              Choose a course and begin your learning journey.
            </p>
          </div>

          {/* Loading */}

          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="h-8 w-3/4 rounded bg-white/10" />

                  <div className="mt-5 h-4 w-full rounded bg-white/10" />

                  <div className="mt-3 h-4 w-2/3 rounded bg-white/10" />

                  <div className="mt-8 h-10 w-full rounded bg-white/10" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
              <p className="font-semibold text-red-400">{error}</p>

              <button
                onClick={loadCourses}
                className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/30"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}

          {!loading && !error && courses.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <h3 className="text-xl font-semibold">No courses available</h3>

              <p className="mt-2 text-slate-400">Please check again later.</p>
            </div>
          )}

          {/* Courses */}

          {!loading && !error && courses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10"
                >
                  {/* Course Icon */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-2xl">
                    📚
                  </div>

                  {/* Course Title */}

                  <h3 className="mt-6 text-2xl font-bold">{course.title}</h3>

                  {/* Description */}

                  <p className="mt-3 min-h-[60px] text-slate-400">
                    {course.description}
                  </p>

                  {/* Student Count */}

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        Students enrolled
                      </p>

                      <p className="mt-1 text-xl font-bold text-blue-400">
                        {course.studentCount}
                      </p>
                    </div>

                    <Link
                      to={`/courses/${course.id}`}
                      className="rounded-xl bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section id="about" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
                Why Choose Us
              </p>

              <h2 className="text-4xl font-bold sm:text-5xl">
                Everything You Need
                <span className="block text-blue-400">To Keep Learning</span>
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                Our platform makes it simple to discover courses, manage your
                learning journey and stay connected with your education.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Professional Courses",
                "Easy Enrollment",
                "Track Your Progress",
                "Modern Learning Platform",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                    <FaCheck />
                  </div>

                  <h3 className="font-semibold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-10 text-center sm:p-16">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to Start Learning?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Create your account and explore the courses available on our
            platform.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
          >
            Get Started
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>© 2026 Student Management System</div>

          <div>Learn. Grow. Succeed.</div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
