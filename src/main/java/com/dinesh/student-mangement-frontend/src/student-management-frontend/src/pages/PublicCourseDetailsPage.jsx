import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

const PublicCourseDetailsPage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/public/courses/${id}`);

      setCourse(response.data);
    } catch (err) {
      console.error("Failed to load course:", err);

      if (err.response?.status === 404) {
        setError("Course not found.");
      } else {
        setError("Unable to load course details.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-32 rounded bg-white/10" />

          <div className="mt-8 h-14 w-2/3 rounded bg-white/10" />

          <div className="mt-6 h-5 w-full rounded bg-white/10" />

          <div className="mt-3 h-5 w-4/5 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold">Course Not Found</h1>

          <p className="mt-4 text-slate-400">
            {error || "The requested course does not exist."}
          </p>

          <Link
            to="/"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-sm text-blue-400 hover:text-blue-300">
            ← Back to Courses
          </Link>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-3xl">
              📚
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-400">
              {course.courseCode}
            </p>

            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              {course.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-slate-500">Students</p>

                <p className="mt-2 text-3xl font-bold text-blue-400">
                  {course.studentCount}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-slate-500">Duration</p>

                <p className="mt-2 text-xl font-semibold">
                  {course.durationInMonths} Months
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-slate-500">Course Fee</p>

                <p className="mt-2 text-xl font-semibold">₹{course.fee}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
              >
                Register to Enroll
              </Link>

              <Link
                to="/"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
              >
                Explore More Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicCourseDetailsPage;
