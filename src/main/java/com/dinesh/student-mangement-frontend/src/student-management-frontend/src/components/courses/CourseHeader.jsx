const CourseHeader = ({ fetchCourses }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Courses
        </h2>

        <p className="text-slate-500 mt-1">
          Manage all available courses.
        </p>
      </div>

      <button
        onClick={fetchCourses}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default CourseHeader;