import { FaArrowRight, FaUserGraduate } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RecentStudents = ({ students = [] }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Students
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recently added students
          </p>
        </div>

        <Link
          to="/students"
          className="flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
        >
          View All
          <FaArrowRight />
        </Link>

      </div>

      {students.length === 0 ? (

        <div className="flex min-h-[250px] items-center justify-center">

          <p className="text-slate-400">
            No students found.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {students.map((student) => (

            <div
              key={student.id}
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
            >

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">

                  <FaUserGraduate className="text-lg text-blue-400" />

                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-white">
                    {student.name}
                  </p>

                  <p className="truncate text-sm text-slate-400">
                    {student.email}
                  </p>

                </div>

              </div>

              <span
                className={`ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  student.status === "ACTIVE"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {student.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentStudents;