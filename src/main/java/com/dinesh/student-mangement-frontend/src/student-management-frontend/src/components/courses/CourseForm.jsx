const CourseForm = ({
  formData,
  handleChange,
  handleSubmit,
  editingCourseId,
  resetForm,
  submitLoading,
  successMessage,
  error,
}) => {
  return (
    <div className="rounded-3xl border border-white/30  backdrop-blur-xl shadow-xl p-8">

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-shadow-blue-200">
          {editingCourseId ? "Edit Course" : "Add New Course"}
        </h3>

        {editingCourseId && (
          <button
            type="button"
            onClick={resetForm}
            className="rounded-xl border border-slate-300 px-5 py-2  text-white hover:bg-slate-100  hover:text-black hover:cursor-pointer transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        {/* Course Code */}

        <div>
          <label className="block mb-2 font-medium text-white">
            Course Code
          </label>

          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="JAVA101"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Course Title */}

        <div>
          <label className="block mb-2 font-medium text-white">
            Course Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Java Full Stack"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Duration */}

        <div>
          <label className="block mb-2 font-medium text-white">
            Duration (Months)
          </label>

          <input
            type="number"
            name="durationInMonths"
            value={formData.durationInMonths}
            onChange={handleChange}
            min="1"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Fee */}

        <div>
          <label className="block mb-2 font-medium text-white">
            Fee
          </label>

          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Description */}

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-white">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Course description..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit */}

        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={submitLoading}
            className={`w-full rounded-xl py-3 text-white font-semibold transition ${
              editingCourseId
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitLoading
              ? editingCourseId
                ? "Updating..."
                : "Adding..."
              : editingCourseId
              ? "Update Course"
              : "Add Course"}
          </button>

        </div>

      </form>

      {successMessage && (
        <div className="mt-5 rounded-xl bg-green-100 border border-green-300 px-4 py-3 text-green-700">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl bg-red-100 border border-red-300 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

    </div>
  );
};

export default CourseForm;