const EnrollmentForm = ({
  students,
  courses,

  formData,

  handleChange,
  handleSubmit,

  editingEnrollmentId,
  resetForm,

  submitLoading,

  successMessage,
  error,
}) => {
  return (
    <div className="rounded-3xl border border-white/30  backdrop-blur-xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-6">

        <h3 className="text-2xl font-bold text-white">
          {editingEnrollmentId ? "Edit Enrollment" : "Enroll Student"}
        </h3>

        {editingEnrollmentId && (
          <button
            type="button"
            onClick={resetForm}
            className="rounded-xl border  px-5 py-2  transition"
          >
            Cancel Edit
          </button>
        )}

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        {/* Student */}

        <div>

          <label className="block mb-2 font-medium text-white">
            Student
          </label>

          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">Select Student</option>

            {students.map((student) => (

              <option
                key={student.id}
                value={student.id}
              >
                {student.fullName}
              </option>

            ))}

          </select>

        </div>

        {/* Course */}

        <div>

          <label className="block mb-2 font-medium text-white">
            Course
          </label>

          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">Select Course</option>

            {courses.map((course) => (

              <option
                key={course.id}
                value={course.id}
              >
                {course.courseCode} - {course.title}
              </option>

            ))}

          </select>

        </div>

        {/* Enrollment Date */}

        <div>

          <label className="block mb-2 font-medium text-white">
            Enrollment Date
          </label>

          <input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Status */}

        <div>

          <label className="block mb-2 font-medium text-white">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="ENROLLED">
              ENROLLED
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>

            <option value="CANCELLED">
              CANCELLED
            </option>

          </select>

        </div>

        {/* Submit */}

        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full rounded-xl py-3 text-white font-semibold transition ${
              editingEnrollmentId
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitLoading
              ? editingEnrollmentId
                ? "Updating..."
                : "Enrolling..."
              : editingEnrollmentId
              ? "Update Enrollment"
              : "Enroll Student"}
          </button>

        </div>

      </form>

      {successMessage && (

        <div className="mt-5 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-700">
          {successMessage}
        </div>

      )}

      {error && (

        <div className="mt-5 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>

      )}

    </div>
  );
};

export default EnrollmentForm;