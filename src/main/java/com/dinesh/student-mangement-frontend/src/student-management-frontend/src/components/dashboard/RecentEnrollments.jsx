import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarDays,
  FaUserGraduate,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const RecentEnrollments = ({ enrollments = [] }) => {

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Enrollments
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest student enrollments
          </p>
        </div>

        <Link
          to="/enrollments"
          className="flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
        >
          View All
          <FaArrowRight />
        </Link>

      </div>

      {/* Empty State */}

      {enrollments.length === 0 ? (

        <div className="flex min-h-[250px] items-center justify-center">

          <p className="text-slate-400">
            No enrollments found.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {enrollments.map((enrollment) => (

            <div
              key={enrollment.id}
              className="rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
            >

              <div className="flex items-center justify-between gap-4">

                {/* Student */}

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">

                    <FaUserGraduate className="text-purple-400" />

                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold text-white">
                      {enrollment.studentName}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <FaBookOpen className="text-xs text-slate-500" />

                      <p className="truncate text-sm text-slate-400">
                        {enrollment.courseName}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Date + Status */}

                <div className="flex shrink-0 flex-col items-end gap-2">

                  <div className="flex items-center gap-2 text-xs text-slate-400">

                    <FaCalendarDays />

                    <span>
                      {formatDate(enrollment.enrollmentDate)}
                    </span>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      enrollment.status === "ENROLLED"
                        ? "bg-green-500/20 text-green-400"
                        : enrollment.status === "COMPLETED"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {enrollment.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentEnrollments;