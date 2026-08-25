const StudentHeader = ({ fetchStudents }) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">
        Students
      </h2>

      <button
        onClick={fetchStudents}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default StudentHeader;