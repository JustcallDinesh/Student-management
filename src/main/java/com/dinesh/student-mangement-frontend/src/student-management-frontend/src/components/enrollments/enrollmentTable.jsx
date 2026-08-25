const EnrollmentTable = ({
  enrollments,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="rounded-3xl border border-white/30  backdrop-blur-xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-6">

        <h3 className="text-2xl font-bold text-white">
          Enrollment List
        </h3>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {enrollments.length} Enrollments
        </span>

      </div>

      {loading ? (

        <div className="py-10 text-center text-white">
          Loading enrollments...
        </div>

      ) : enrollments.length === 0 ? (

        <div className="py-10 text-center text-white">
          No enrollments found.
        </div>

      ) : (

        <div className="overflow-x-auto rounded-2xl">

          <table className="min-w-full">

            <thead className="bg-transparent">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Student
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Course Code
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Course Title
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {enrollments.map((enrollment) => (

                <tr
                  key={enrollment.id}
                  className="border-b border-slate-200 hover:bg-cyan-800 transition"
                >

                  <td className="px-5 py-4">
                    {enrollment.id}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {enrollment.studentName}
                  </td>

                  <td className="px-5 py-4 font-semibold  ">
                    {enrollment.courseCode}
                  </td>

                  <td className="px-5 py-4">
                    {enrollment.courseTitle}
                  </td>

                  <td className="px-5 py-4">
                    {enrollment.enrollmentDate}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          enrollment.status === "ENROLLED"
                            ? "bg-blue-100 text-blue-700"
                            : enrollment.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {enrollment.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => handleEdit(enrollment)}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(enrollment.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default EnrollmentTable;